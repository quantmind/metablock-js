import { HttpClient, HttpResponse } from "@metablock/core";

export interface Html {
  lang: string;
  head: Array<string>;
  scripts: Array<string>;
  afterBody: Array<string>;
}

export interface Context {
  web: Record<string, any>;
  // object passed to the html page as base64 encoded JSON string
  html: Html;
  // server-size metadata for rendering the page
  middleware: any[];
  // list of server side middleware handlers
}

export interface Plugin {
  name: string;
  config: Record<string, string>;
}

export interface Services {
  cli: HttpClient;

  fromCache: (key: string, loader: any) => Promise<any>;

  getConfig: (req: any) => Promise<Context>;

  getPhoto: (key: string) => Promise<HttpResponse>;
}

export const createContext = (web?: Record<string, any>): Context => {
  return {
    web: web || {},
    html: {
      lang: "en",
      head: [],
      meta: [],
      afterBody: [],
      css: [],
      scripts: [],
    },
    middleware: [],
  } as Context;
};
