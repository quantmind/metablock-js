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

  async fromCache(key: string, loader: any): Promise<any> {
    return await loader();
  }

  // Get config and adjust urls for local bundle
  async getConfig(req: any): Promise<Context> {
    const response = await this.cli.get(`${this.blockUrl}/.api/config`);
    const data = response.data as Context;
    if (this.bundleUrl) {
      const deployUrl = data.web.deployUrl || "";
      data.web.deployUrl = this.bundleUrl;
      data.web.liveUrl = this.bundleUrl;
      data.html.scripts = data.html.scripts.map((s: string) =>
        replaceUrl(s, deployUrl, this.bundleUrl)
      );
      data.html.afterBody = data.html.afterBody.map((s: string) =>
        replaceUrl(s, deployUrl, this.bundleUrl)
      );
    }
    return data;
  }

  async getPhoto(key: string): Promise<HttpResponse> {
    return await this.cli.get(`${this.blockUrl}/.api/photo/${key}`);
  }
}

const replaceUrl = (
  url: string,
  deployUrl: string,
  bundleUrl: string
): string => {
  return deployUrl ? url.replace(deployUrl, bundleUrl) : `${bundleUrl}/${url}`;
};

export default DevServices;
