import api from "./api";
import { blockMiddleware, BrowserManager } from "./block";
import requestMiddleware from "./request";
import seoMiddleware from "./seo";
import DevServices from "./services";

const devServer = (blockUrl: string, options: any) => {
  const { ssr = false, docker, slowMo, ssrPlugins = [], ...dev } = options;
  return {
    onBeforeSetupMiddleware: before(blockUrl, {
      ssr,
      slowMo,
      docker,
      plugins: ssrPlugins,
    }),
    ...dev,
  };
};

export const before = (blockUrl: string, metaOptions: any) => {
  global.fetch = require("cross-fetch");
  return (devServer: any) => {
    const { ssr, ...ssrOptions } = metaOptions;
    const { app, compiler, options } = devServer;
    const { mode } = compiler.options;
    const { publicPath } = options.static;
    const services = new DevServices(blockUrl, removeSlash(publicPath));
    requestMiddleware(app);
    seoMiddleware(app, services);
    app.use("/.api", api(services));
    const ssrManager = ssr
      ? new BrowserManager(services, { mode, ...ssrOptions })
      : null;
    blockMiddleware(app, services, { publicPath, ssrManager });
  };
};

const removeSlash = (url?: string): string => {
  if (url && url.substring(url.length - 1) == "/")
    return url.substring(0, url.length - 1);
  return url || "";
};

export default devServer;
