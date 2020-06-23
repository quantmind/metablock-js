import { Express } from "express";
import api from "./api";
import Services from "./services";

const devServer = (extra: any) => {
  return { setup, ...extra };
};

const setup = (app: Express) => {
  const services = new Services();
  app.use("/.api", api(services));
};

export default devServer;
