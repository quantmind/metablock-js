import { HttpClient } from "@metablock/core";

export class CmsStore {
  cli: HttpClient;
  data: Record<string, any>;

  constructor() {
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
