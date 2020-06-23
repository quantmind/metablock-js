import { HttpClient, Metablock } from "@metablock/core";
import Unsplash, { toJson } from "unsplash-js";
import settings from "./settings";
import { Context } from "./interfaces";

class Services {
  cli: HttpClient;
  mb: Metablock;
  unsplash: Unsplash;

  constructor() {
    this.cli = new HttpClient();
    this.mb = new Metablock(
      settings.METABLOCK_API_URL,
      "",
      settings.METABLOCK_API_KEY
    );
    this.unsplash = new Unsplash({
      accessKey: settings.UNSPLASH_ACCESS_KEY,
      secret: settings.UNSPLASH_SECRET_KEY,
    });
  }

  async getConfig(req: any): Promise<Context> {
    const response = await this.cli.get(
      `${settings.METABLOCK_WEB_URL}/.api/config`
    );
    return response.data as Context;
  }

  async getPhoto(key: string): Promise<Record<string, any>> {
    const response = await this.unsplash.photos.getPhoto(key);
    return await toJson(response);
  }
}

export default Services;
