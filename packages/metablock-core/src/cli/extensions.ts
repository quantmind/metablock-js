import { DataApi, Extension, Plugin } from "../interfaces";
import HttpComponent from "./httpComponent";

class Extensions extends HttpComponent {
  loader(): DataApi<Extension> {
    return this.cli.loader(`${this.cli.apiUrl}/extensions`);
  }

  async get(name_or_id: string): Promise<Extension> {
    const url = `${this.cli.apiUrl}/extensions/${name_or_id}`;
    const response = await this.cli.get(url);
    return response.data as Extension;
  }

  async update(name_or_id: string, body: any): Promise<Extension> {
    const url = `${this.cli.apiUrl}/extensions/${name_or_id}`;
    const response = await this.cli.patch(url, { body });
    return response.data as Extension;
  }

  async createPlugin(extension: Extension, body: any): Promise<Plugin> {
    const url = `${this.cli.apiUrl}/orgs/${extension.org_id}/plugins`;
    body.extension_id = extension.id;
    const response = await this.cli.post(url, { body });
    return response.data as Plugin;
  }
}

export default Extensions;
