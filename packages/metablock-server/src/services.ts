import { HttpClient, HttpResponse } from "@metablock/core";
import fetch from "cross-fetch";
import { Context } from "./interfaces";

global.fetch = fetch as any;
const METABLOCK_WEB_URL = process.env.METABLOCK_API_URL;

class Services {
  blockUrl: string;
  assetsUrl: string;
  cli: HttpClient;

  constructor(blockUrl: string, assetsUrl: string) {
    this.blockUrl = METABLOCK_WEB_URL || blockUrl;
    this.assetsUrl = assetsUrl;
    this.cli = new HttpClient();
    this.cli.defaultHeaders["user-agent"] = "metablock-dev-server";
  }

  async getConfig(req: any): Promise<Context> {
    const response = await this.cli.get(`${this.blockUrl}/.api/config`);
    let data = response.data as Context;
    const assetsUrl = data.web.assetsUrl;
    if (assetsUrl && this.assetsUrl)
      data = JSON.parse(
        JSON.stringify(data).split(assetsUrl).join(this.assetsUrl)
      ) as Context;
    return data;
  }

  async getPhoto(key: string): Promise<HttpResponse> {
    return await this.cli.get(`${this.blockUrl}/.api/photo/${key}`);
  }

  async login(body: any): Promise<HttpResponse> {
    return await this.cli.post(`${this.blockUrl}/.api/login`, { body });
  }
}

export default Services;
