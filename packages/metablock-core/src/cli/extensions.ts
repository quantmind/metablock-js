import HttpResponse from "../response";
import HttpComponent from "./httpComponent";
import { Extension } from "./interfaces";

class Extensions extends HttpComponent {
  async getList(query: any): Promise<HttpResponse> {
    const url = this.urlQuery(`${this.cli.apiUrl}/extensions`, query);
    return await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
  }

  async get(name_or_id: string): Promise<Extension> {
    const url = `${this.cli.apiUrl}/extensions/${name_or_id}`;
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return response.data as Extension;
  }
}

export default Extensions;
