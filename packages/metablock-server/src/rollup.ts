import { getLogger } from "@metablock/core";
import express from "express";
import api from "./api";
import { htmlMiddleware } from "./html";
import requestMiddleware from "./request";
import seoMiddleware from "./seo";
import DevServices from "./services";
import staticMiddleware from "./static";

let server: any;

const logger = getLogger("devserver");

const rollupServer = (blockUrl: string, options: any) => {
  global.fetch = require("cross-fetch");
  if (server) server.close();
  else closeServerOnTermination();
  const app = express();
  const { path, ssrPlugins, port = 8090, host = "0.0.0.0", ...opts } = options;
  const services = new DevServices(blockUrl, path);
  requestMiddleware(app);
  app.use("/.api", api(services));
  if (path) {
    staticMiddleware(app, path);
  }
  seoMiddleware(app, services);
  htmlMiddleware(app, services, { ...opts, plugins: ssrPlugins });
  server = app.listen({ port, host }, () => {
    logger.warning(`started devserver server on port ${port}`);
  });

  return {
    name: "serve",
    generateBundle() {},
  };
};

function closeServerOnTermination() {
  const terminationSignals = ["SIGINT", "SIGTERM", "SIGQUIT", "SIGHUP"];
  terminationSignals.forEach((signal) => {
    process.on(signal, () => {
      if (server) {
        server.close();
        process.exit();
      }
    });
  });
}

export default rollupServer;
