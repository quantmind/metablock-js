import { getLogger } from "@metablock/core";
import { Express, Request, Response } from "express";
import { Context, Services } from "../interfaces";
import { reqUrl } from "../request";
import rawHtml from "./html";

const logger = getLogger({ name: "ssr" });

export interface MetablockRequest extends Request {
  context: Context;
}

export default (app: Express, services: Services, options?: any) => {
  const { ssrManager, publicPath } = options || {};
  app.set("browserManager", ssrManager);

  const serve = async (req: Request, res: Response, next: any) => {
    try {
      const mReq: MetablockRequest = req as MetablockRequest;
      const context = await services.getConfig(req);
      mReq.context = context;
      // if this is a ssr request, render the raw html
      if (ssrManager && req.query._ssr === "yes") serve_raw(mReq, res);
      else {
        const serve_handle =
          ssrManager && context.web.id && context.web.plugins.ssr
            ? serve_html
            : serve_raw;
        const middleware = [...mReq.context.middleware, serve_handle];
        const serveMiddleware = (err?: any) => {
          const handler = middleware.shift();
          if (err) next(err);
          else if (!handler) next();
          else {
            if (handler.constructor === String) serveMiddleware();
            else handler(mReq, res, serveMiddleware);
          }
        };
        serveMiddleware();
      }
    } catch (err) {
      next(err);
    }
  };

  const serve_raw = async (req: MetablockRequest, res: Response) => {
    res.send(rawHtml(req.context, req));
  };

  const serve_html = async (
    req: MetablockRequest,
    res: Response,
    ignored?: any
  ) => {
    let content;
    try {
      const result = await ssrManager.ssr(req, res);
      logger.info(
        `SSR rendered ${req.url} with ${result.requestCount} requests in ${result.time} milliseconds - content-length ${result.content.length}`
      );
      content = result.content;
    } catch (err: any) {
      if (err.constructor && err.constructor.name === "TimeoutError")
        logger.warn({ url: reqUrl(req), message: err.toString() });
      else logger.error(err);
      content = await rawHtml(req.context, req);
    }
    res.send(content);
  };

  const dev = async (req: Request, res: any, next: any) => {
    if (req.path.substring(0, publicPath.length) === publicPath) next();
    else await serve(req, res, next);
  };

  app.get("*", publicPath ? dev : serve);
};
