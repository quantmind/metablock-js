import { pathToRegexp } from "path-to-regexp";
import {
  blockMiddleware,
  DevServices,
  api,
  ApiError,
  createContext,
} from "../src";
import fetch from "jest-fetch-mock";
import express from "express";

export const mockApp = () => {
  const app = express();
  const services = new DevServices("http://testing.io", "/static");
  app.set("services", services);
  app.use("/.api", api(services));
  blockMiddleware(app, services);
  return app;
};

export const mockApi = () => {
  const apiHandlers: Record<string, any>[] = [
    //
    // mock user login
    {
      regex: pathToRegexp("/.api/login"),
      post: () => {
        return { body: JSON.stringify({}), status: 201 };
      },
    },
    //
    // mock service config call
    {
      regex: pathToRegexp("/.api/config"),
      get: () => {
        return JSON.stringify(createContext());
      },
    },
    //
  ];

  fetch.mockResponse(async (req) => {
    const { url, method, body } = req;
    const u = new URL(url);
    //
    for (let i = 0; i < apiHandlers.length; ++i) {
      const handler = apiHandlers[i];
      const match = handler.regex.exec(u.pathname);
      if (match) {
        const handlerMethod = handler[method.toLowerCase()];
        if (handlerMethod)
          return handlerMethod({ match, query: u.searchParams, body });
        else throw new ApiError(405, { message: "Method not mocked" });
      }
    }
    throw new ApiError(404, { message: `Path ${u.pathname} not mocked` });
  });
};
