import { Metablock } from "@metablock/core";
import Unsplash, { toJson } from "unsplash-js";
import settings from "./settings";

class Services {
  mb: Metablock;
  unsplash: Unsplash;

  constructor() {
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

  async getConfig(req: any) {
    return {};
  }

  async getPhoto(key: string): Promise<Record<string, any>> {
    const response = await this.unsplash.photos.getPhoto(key);
    return await toJson(response);
  }
}

export default Services;
