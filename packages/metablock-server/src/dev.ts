import { Express } from "express";
import api from "./api";
import htmlMiddleware from "./html";
import Services from "./services";

const devServer = (blockUrl: string, options: any) => {
  return { before: before(blockUrl), ...options };
};

const before = (blockUrl: string) => {
  return (app: Express, server: any) => {
    const services = new Services(blockUrl, server.options.publicPath);
    app.use("/.api", api(services));
    htmlMiddleware(app, services);
  };
};

export default devServer;