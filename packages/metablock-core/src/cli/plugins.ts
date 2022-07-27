import { DataApi, Plugin } from "../interfaces";
import HttpComponent from "./httpComponent";

class Plugins extends HttpComponent {
  loader(): DataApi<Plugin> {
    return this.cli.loader(`${this.cli.apiUrl}/plugins`);
  }

  async get(name_or_id: string): Promise<Plugin> {
    const url = `${this.cli.apiUrl}/plugins/${name_or_id}`;
    const response = await this.cli.get(url);
    return response.data as Plugin;
  }

  async update(name_or_id: string, body: any): Promise<Plugin> {
    const url = `${this.cli.apiUrl}/plugins/${name_or_id}`;
    const response = await this.cli.patch(url, { body });
    return response.data as Plugin;
  }
}

export default Plugins;
