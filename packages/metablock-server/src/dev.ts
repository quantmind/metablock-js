import { Express } from "express";
import api from "./api";
import htmlMiddleware from "./html";
import Services from "./services";

const devServer = (extra: any) => {
  return { before, ...extra };
};

const before = (app: Express) => {
  const services = new Services();
  app.use("/.api", api(services));
  htmlMiddleware(app, services);
};

export default devServer;
