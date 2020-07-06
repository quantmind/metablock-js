import { Express, Request, Response } from "express";
import { performance } from "perf_hooks";
import { Services } from "../interfaces";
import rawHtml from "./html";
import BrowserManager from "./ssr";

export default (app: Express, services: Services, options?: any) => {
  const { ssr, publicPath, ...config } = options;
  const manager = new BrowserManager(services, config);
  app.set("browserManager", manager);

  const serve_raw = async (req: Request, res: any) => {
    const context = await services.getConfig(req);
    res.send(rawHtml(context, req));
  };

  const serve_html = async (req: Request, res: Response, next: any) => {
    try {
      if (req.query._ssr === "yes") await serve_raw(req, res);
      else {
        const t0 = performance.now();
        const result = await manager.ssr(req);
        const total = Math.round(performance.now() - t0);
        res
          .set(
            "Server-Timing",
            `Prerender;dur=${total};desc="Headless render time (ms)"`
          )
          .status(result.statusCode || 200)
          .send(result.content);
      }
    } catch (err) {
      next(err);
    }
  };

  const dev = async (req: Request, res: any, next: any) => {
    if (req.path.substring(0, publicPath.length) === publicPath) next();
    else await serve(req, res, next);
  };

  const serve = ssr ? serve_html : serve_raw;

  app.get("*", publicPath ? dev : serve);
};
