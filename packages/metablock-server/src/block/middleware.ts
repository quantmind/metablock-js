import { Express, Request, Response } from "express";
import { performance } from "perf_hooks";
import { Services, Context } from "../interfaces";
import rawHtml from "./html";

export interface MetablockRequest extends Request {
  context: Context;
}

export default (app: Express, services: Services, options?: any) => {
  const { ssrManager, publicPath } = options;
  app.set("browserManager", ssrManager);

  const serve = async (req: Request, res: Response, next: any) => {
    try {
      const mReq: MetablockRequest = req as MetablockRequest;
      mReq.context = await services.getConfig(req);
      if (ssrManager && req.query._ssr === "yes") serve_raw(mReq, res);
      else {
        const middleware = [
          ...mReq.context.middleware,
          ssrManager ? serve_html : serve_raw,
        ];
        for (let i = 0; i < middleware.length; ++i) {
          if (await serve_middleware(middleware[i], mReq, res, next)) break;
        }
      }
    } catch (err) {
      next(err);
    }
  };

  const serve_middleware = async (
    middleware: any,
    req: MetablockRequest,
    res: Response,
    next: any
  ) => {
    const callback: Record<string, any> = {};
    await middleware(req, res, (err?: any) => {
      callback.called = true;
      callback.err = err;
    });
    if (callback.err) next(callback.err);
    return !callback.called;
  };

  const serve_raw = async (req: MetablockRequest, res: Response) => {
    res.send(rawHtml(req.context, req));
  };

  const serve_html = async (req: MetablockRequest, res: Response) => {
    const t0 = performance.now();
    const result = await ssrManager.ssr(req);
    const total = Math.round(performance.now() - t0);
    res
      .set(
        "Server-Timing",
        `Prerender;dur=${total};desc="Headless render time (ms)"`
      )
      .status(result.statusCode || 200)
      .send(result.content);
  };

  const dev = async (req: Request, res: any, next: any) => {
    if (req.path.substring(0, publicPath.length) === publicPath) next();
    else await serve(req, res, next);
  };

  app.get("*", publicPath ? dev : serve);
};
