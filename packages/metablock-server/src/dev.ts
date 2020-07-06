import { Express } from "express";
import api from "./api";
import htmlMiddleware from "./html";
import requestMiddleware from "./request";
import seoMiddleware from "./seo";
import Services from "./services";

const devServer = (blockUrl: string, options: any) => {
  return { before: before(blockUrl), ...options };
};

const before = (blockUrl: string) => {
  global.fetch = require("cross-fetch");
  return (app: Express, server: any) => {
    const services = new Services(blockUrl, server.options.publicPath);
    requestMiddleware(app);
    seoMiddleware(app, services);
    app.use("/.api", api(services));
    htmlMiddleware(app, services);
  };
};

export default devServer;
