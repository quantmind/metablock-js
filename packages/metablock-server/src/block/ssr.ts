import { getLogger } from "@metablock/core";
import AsyncLock from "async-lock";
import { Request, Response } from "express";
import { performance } from "perf_hooks";
import puppeteer, { Browser, HTTPRequest, Page } from "puppeteer";
import { Services } from "../interfaces";
import { reqUrl } from "../request";

const logger = getLogger({ name: "ssr" });
const whitelistResources = new Set(["document", "script", "xhr", "fetch"]);
const blacklist = [
  "www.google-analytics.com",
  "/gtag/js",
  "ga.js",
  "analytics.js",
];

const whiteList = (resources: Set<string>) => {
  return (request: any) => {
    if (!resources.has(request.resourceType())) {
      request.abort();
      return true;
    }
  };
};

const blackList = (resources: string[]) => {
  return (request: any) => {
    if (resources.find((regex) => request.url().match(regex))) {
      request.abort();
      return true;
    }
  };
};

export const defaultBrowserInterceptors: any[] = [
  whiteList(whitelistResources),
  blackList(blacklist),
];

type FinishCallbackType = (
  props: Record<string, any>,
  req: Request,
  res: Response
) => void;

const noop = () => {};

class BrowserManager {
  public services?: Services;
  public config: Record<string, any>;
  public pageConfig: Record<string, any>;
  public plugins: any[];
  public interceptors: any[];
  public onFinish: FinishCallbackType;
  private _browser?: Browser;
  private _browserWsEndpoint?: string;
  private _lock: AsyncLock;

  constructor(services?: Services, options?: any) {
    const {
      plugins = [],
      interceptors,
      waitUntil = "networkidle2",
      timeout = 10000,
      onFinish = noop,
      ...config
    } = options || {};
    this.services = services;
    this.config = config;
    this.pageConfig = { waitUntil, timeout };
    this.plugins = plugins;
    this.interceptors = interceptors || defaultBrowserInterceptors;
    this.onFinish = onFinish;
    this._lock = new AsyncLock();
  }

  async ssr(req: Request, res: Response): Promise<Record<string, any>> {
    return await this.render(req, res);
  }

  async render(req: Request, res: Response): Promise<Record<string, any>> {
    const t0 = performance.now();
    let requestCount = 0;
    const page = await this.newPage();
    try {
      // Intercept network requests
      await page.setRequestInterception(true);
      page.on("request", (request: HTTPRequest) => {
        logger.debug(request);
        for (let i = 0; i < this.interceptors.length; ++i) {
          if (this.interceptors[i](request)) return;
        }
        requestCount += 1;
        request.continue();
      });
      // fetch the page
      const renderUrl = fullUrl(req);
      renderUrl.searchParams.set("_ssr", "yes");
      await page.goto(renderUrl.toString(), this.pageConfig);
      let result: Record<string, any> = {};
      for (let i = 0; i < this.plugins.length; ++i) {
        const meta = await this.plugins[i](page);
        if (meta) result = { ...meta, ...result };
      }
      result.content = await page.content();
      result.time = Math.round(performance.now() - t0);
      result.requestCount = requestCount;
      res
        .set(
          "Server-Timing",
          `Prerender;dur=${result.time};desc="Headless render time (ms)"`
        )
        .status(result.statusCode || 200);
      this.onFinish(result, req, res);
      return result;
    } finally {
      await page.close();
    }
  }

  async newPage(): Promise<Page> {
    const browserWSEndpoint = await this.getWsEndpoint();
    const browser = await puppeteer.connect({ browserWSEndpoint });
    return await browser.newPage();
  }

  async getBrowser(): Promise<Browser> {
    return this._lock.acquire("browser", async () => {
      if (!this._browser) {
        let cfg: Record<string, any> = { headless: true };
        if (this.config.mode === "development" && this.config.slowMo > 0)
          cfg = { headless: false, slowMo: this.config.slowMo };
        if (this.config.docker) {
          cfg.args = [
            // Required for Docker version of Puppeteer
            "--no-sandbox",
            "--disable-setuid-sandbox",
            // This will write shared memory files into /tmp instead of /dev/shm,
            // because Docker’s default for /dev/shm is 64MB
            "--disable-dev-shm-usage",
          ];
        }
        this._browser = await puppeteer.launch(cfg);
      }
      return this._browser;
    });
  }

  async getWsEndpoint(): Promise<string> {
    return this._lock.acquire("browserWsEndpoint", async () => {
      if (!this._browserWsEndpoint) {
        const browser = await this.getBrowser();
        this._browserWsEndpoint = await browser.wsEndpoint();
      }
      return this._browserWsEndpoint;
    });
  }

  async close(): Promise<void> {
    return this._lock.acquire("browser", async () => {
      if (this._browser) {
        await this._browser.close();
        this._browser = undefined;
      }
    });
  }
}

const fullUrl = (req: Request): URL => new URL(reqUrl(req));

export default BrowserManager;
