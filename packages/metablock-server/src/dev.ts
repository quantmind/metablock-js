import { log } from "console";
import api from "./api";
import { blockMiddleware, BrowserManager } from "./block";
import requestMiddleware from "./request";
import seoMiddleware from "./seo";
import DevServices from "./services";

const devServer = (blockUrl: string, options: any) => {
  const { ssr = false, docker, slowMo, ssrPlugins = [], ...dev } = options;
  return {
    setupMiddlewares: devBlockMiddleware(blockUrl, {
      ssr,
      slowMo,
      docker,
      plugins: ssrPlugins,
    }),
    ...dev,
  };
};

export const devBlockMiddleware = (blockUrl: string, metaOptions: any) => {
  global.fetch = require("cross-fetch");
  return (middlewares: any[], devServer: any) => {
    const { ssr, ...ssrOptions } = metaOptions;
    const { app, compiler, options } = devServer;
    const { mode } = compiler.options;
    const publicPath = options.static[0].publicPath[0];
    const services = new DevServices(blockUrl, removeSlash(publicPath));
    log("");
    log(
      "== metablock dev server == serving bundle from local path",
      `"${services.bundleUrl}"`
    );
    requestMiddleware(app);
    seoMiddleware(app, services);
    app.use("/.api", api(services));
    const ssrManager = ssr
      ? new BrowserManager(services, { mode, ...ssrOptions })
      : null;
    blockMiddleware(app, services, { publicPath, ssrManager });
    return middlewares;
  };
};

const removeSlash = (url?: string): string => {
  if (url && url.substring(url.length - 1) == "/")
    return url.substring(0, url.length - 1);
  return url || "";
};

export default devServer;
