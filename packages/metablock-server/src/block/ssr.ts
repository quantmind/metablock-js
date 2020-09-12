import AsyncLock from "async-lock";
import { Request } from "express";
import puppeteer from "puppeteer";
import { Services } from "../interfaces";

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

class BrowserManager {
  public services?: Services;
  public config: Record<string, any>;
  public plugins: any[];
  public interceptors: any[];
  private _browser?: puppeteer.Browser;
  private _browserWsEndpoint?: string;
  private _lock: AsyncLock;

  constructor(services?: Services, options?: any) {
    const { plugins = [], interceptors, ...config } = options || {};
    this.services = services;
    this.config = { waitUntil: "networkidle0", ...config };
    this.plugins = plugins;
    this.interceptors = interceptors || defaultBrowserInterceptors;
    this._lock = new AsyncLock();
  }

  async ssr(req: Request): Promise<Record<string, any>> {
    if (this.services) {
      return await this.services.fromCache(fullUrl(req).toString(), () =>
        this.render(req)
      );
    } else {
      return await this.render(req);
    }
  }

  async render(req: Request): Promise<Record<string, any>> {
    const page = await this.newPage();
    try {
      // Intercept network requests
      await page.setRequestInterception(true);
      page.on("request", (request: puppeteer.Request) => {
        for (let i = 0; i < this.interceptors.length; ++i) {
          if (this.interceptors[i](request)) return;
        }
        request.continue();
      });
      // fetch the page
      const renderUrl = fullUrl(req);
      renderUrl.searchParams.set("_ssr", "yes");
      await page.goto(renderUrl.toString(), {
        waitUntil: this.config.waitUntil,
      });
      let result: Record<string, any> = {};
      for (let i = 0; i < this.plugins.length; ++i) {
        const meta = await this.plugins[i](page);
        if (meta) result = { ...meta, ...result };
      }
      result.content = await page.content();
      return result;
    } finally {
      await page.close();
    }
  }

  async newPage(): Promise<puppeteer.Page> {
    const browserWSEndpoint = await this.getWsEndpoint();
    const browser = await puppeteer.connect({ browserWSEndpoint });
    return await browser.newPage();
  }

  async getBrowser(): Promise<puppeteer.Browser> {
    return this._lock.acquire("browser", async () => {
      if (!this._browser) {
        let cfg: Record<string, any> = {};
        if (this.config.mode === "development" && this.config.slowMo > 0)
          cfg = {
            headless: false,
            slowMo: this.config.slowMo,
          };
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

const fullUrl = (req: Request): URL => {
  return new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
};

export default BrowserManager;
