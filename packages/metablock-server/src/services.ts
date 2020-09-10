import { HttpClient, HttpResponse } from "@metablock/core";
import { Context, Services } from "./interfaces";

const METABLOCK_WEB_URL = process.env.METABLOCK_API_URL;

class DevServices implements Services {
  blockUrl: string;
  bundleUrl: string;
  cli: HttpClient;

  constructor(blockUrl: string, bundleUrl: string) {
    this.blockUrl = METABLOCK_WEB_URL || blockUrl;
    this.bundleUrl = bundleUrl;
    this.cli = new HttpClient();
    this.cli.defaultHeaders["user-agent"] = "metablock-dev-server";
  }

  // Get config and adjust urls for local bundle
  async getConfig(req: any): Promise<Context> {
    const response = await this.cli.get(`${this.blockUrl}/.api/config`);
    let data = response.data as Context;
    const deployUrl = data.web.deployUrl;
    if (deployUrl && this.bundleUrl) {
      let cfg = JSON.stringify(data).split(deployUrl).join(this.bundleUrl);
      cfg = cfg.split(data.web.liveUrl).join(this.bundleUrl);
      data = JSON.parse(cfg);
    }
    return data;
  }

  async getPhoto(key: string): Promise<HttpResponse> {
    return await this.cli.get(`${this.blockUrl}/.api/photo/${key}`);
  }
}

export default DevServices;
