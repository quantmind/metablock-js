import HttpResponse from "../response";
import HttpComponent from "./httpComponent";
import { Plugin } from "./interfaces";

class Plugins extends HttpComponent {
  async getList(query: any): Promise<HttpResponse> {
    const url = this.urlQuery(`${this.cli.apiUrl}/plugins`, query);
    return await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
  }

  async get(name_or_id: string): Promise<Plugin> {
    const url = `${this.cli.apiUrl}/plugins/${name_or_id}`;
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return response.data as Plugin;
  }
}

export default Plugins;
