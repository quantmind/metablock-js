import { HttpClient, HttpResponse } from "@metablock/core";

export interface Html {
  meta: Array<string>;
  css: Array<string>;
  scripts: Array<string>;
  afterBody: Array<string>;
}

export interface Context {
  web: Record<string, any>;
  html: Html;
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

  login: (body: any) => Promise<HttpResponse>;
}
