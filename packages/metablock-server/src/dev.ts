import { Express } from "express";
import api from "./api";
import { htmlMiddleware } from "./html";
import requestMiddleware from "./request";
import seoMiddleware from "./seo";
import DevServices from "./services";

const devServer = (blockUrl: string, options: any) => {
  const { ssr = false, docker, slowMo, ssrPlugins = [], ...dev } = options;
  return {
    before: before(blockUrl, { ssr, slowMo, docker, plugins: ssrPlugins }),
    ...dev,
  };
};

const before = (blockUrl: string, options: any) => {
  global.fetch = require("cross-fetch");
  return (app: Express, server: any) => {
    const { mode } = server.compiler.options;
    const { publicPath } = server.options;
    const services = new DevServices(blockUrl, publicPath);
    requestMiddleware(app);
    seoMiddleware(app, services);
    app.use("/.api", api(services));
    htmlMiddleware(app, services, { mode, publicPath, ...options });
  };
};

export default devServer;
