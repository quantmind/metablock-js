import { pathToRegexp } from "path-to-regexp";
import {
  blockMiddleware,
  BrowserManager,
  defaultBrowserInterceptors,
  DevServices,
  requestMiddleware,
  seoMiddleware,
  api,
  ApiError,
  createContext,
} from "../src";
import fetch from "jest-fetch-mock";
import express from "express";

const mockPage = (request: any) => {
  request.respond({ contentType: "text/html", body: "<div>test</div>" });
  return true;
};

export const mockApp = () => {
  const app = express();
  const services = new DevServices("http://testing.io", "/static");
  const ssrManager = new BrowserManager(services, {
    interceptors: [...defaultBrowserInterceptors, mockPage],
  });
  requestMiddleware(app);
  app.set("services", services);
  app.use("/.api", api(services));
  seoMiddleware(app, services);
  blockMiddleware(app, services, { ssrManager });
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
