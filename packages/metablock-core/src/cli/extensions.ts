import { DataApi, Extension, Plugin } from "../interfaces";
import HttpComponent from "./httpComponent";

class Extensions extends HttpComponent {
  loader(): DataApi<Extension> {
    return this.cli.loader(`${this.cli.apiUrl}/extensions`);
  }

  deliveryLoader(name_or_id: string): DataApi<any> {
    return this.cli.loader(
      `${this.cli.apiUrl}/extensions/${name_or_id}/deliveries`
    );
  }

  async testDelivery(name_or_id: string, body: any): Promise<any> {
    const url = `${this.cli.apiUrl}/extensions/${name_or_id}/deliveries/test`;
    const response = await this.cli.post(url, { body });
    return response.data;
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

  async getDelivery(name_or_id: string, deliveryId: string): Promise<any> {
    const url = this.urlQuery(
      `${this.cli.apiUrl}/extensions/${name_or_id}/deliveries`,
      { id: deliveryId }
    );
    const result = await this.cli.get(url);
    return result.data.length ? result.data[0] : null;
  }
}

export default Extensions;
