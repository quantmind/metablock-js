import { blockMiddleware, DevServices, api } from "../src";
import express from "express";

const testApp = () => {
  const app = express();
  const services = new DevServices("/test", "/static");
  app.set("services", services);
  app.use("/.api", api(services));
  blockMiddleware(app, services);
  return app;
};

describe("Test html tools", () => {
  const app = testApp();

  test("app", () => {
    expect(app.get("services")).toBeTruthy();
  });
});
