import getLogger from "./logger";
import HttpResponse from "./response";

export interface Options {
  method: string;
  headers: Record<string, string>;
  body?: any;
}

export interface HttpClientInterface {
  get: (url: string, options?: any) => Promise<HttpResponse>;
  delete: (url: string, options?: any) => Promise<HttpResponse>;
  post: (url: string, options?: any) => Promise<HttpResponse>;
  patch: (url: string, options?: any) => Promise<HttpResponse>;
}

class HttpClient implements HttpClientInterface {
  name: string;
  logger: any;
  defaultHeaders: Record<string, string>;

  constructor(name?: string) {
    this.name = name || "http";
    this.logger = getLogger(name || "http");
    this.defaultHeaders = {};
  }

  async delete(url: string, options?: any): Promise<HttpResponse> {
    return await this.request(url, { ...options, method: "DELETE" });
  }

  async get(url: string, options?: any): Promise<HttpResponse> {
    return await this.request(url, { ...options, method: "GET" });
  }

  async patch(url: string, options?: any): Promise<HttpResponse> {
    return await this.request(url, { ...options, method: "PATCH" });
  }

  async post(url: string, options?: any): Promise<HttpResponse> {
    return await this.request(url, { ...options, method: "POST" });
  }

  async request(url: string, options: Options): Promise<HttpResponse> {
    const opts = this.getOptions(options);
    let response;
    try {
      response = await fetch(url, opts);
    } catch (err) {
      response = err;
      this.logger.error(`Error fetching resource ${url}: ${err}`);
      if (!response.status) response = null;
    }
    const data = await this.jsonBody(response);

    const respData = new HttpResponse(data, response);

    if (respData.status >= 400) throw respData;

    return respData;
  }

  getOptions(options: any): Options {
    const { body, method, headers, ...extra } = options;
    const opts: Options = {
      method: method || "GET",
      headers: { ...this.defaultHeaders, ...headers },
      ...extra,
    };
    if (body) {
      if (body.constructor === Object) {
        opts.body = JSON.stringify(body);
        opts.headers["content-type"] = "application/json";
      } else opts.body = body;
    }
    return opts;
  }

  async jsonBody(response: any) {
    if (!response || response.status === 204) return {};
    try {
      return await response.json();
    } catch (err) {
      this.logger.error("The server did not send a JSON response", err);
      return {};
    }
  }
}

export default HttpClient;
