import { HttpClient } from "@metablock/core";
import { action, makeObservable } from "mobx";

export class CmsStore {
  cli: HttpClient;
  data: Record<string, any>;

  constructor() {
    makeObservable(this, {
      get: action,
    });
    this.data = {};
    this.cli = new HttpClient();
  }

  async get(path: string): Promise<any> {
    if (!this.data[path]) {
      const response = await this.cli.get(path);
      this.data[path] = response.data;
    }
    return this.data[path];
  }
}

export default new CmsStore();
