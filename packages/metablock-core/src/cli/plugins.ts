import HttpComponent from "./httpComponent";
import { Paginated, paginatedResponse, Plugin } from "./interfaces";

class Plugins extends HttpComponent {
  async getList(query: any): Promise<Paginated<Plugin>> {
    const url = this.urlQuery(`${this.cli.apiUrl}/plugins`, query);
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return paginatedResponse<Plugin>(response);
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
