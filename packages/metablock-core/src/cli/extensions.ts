import HttpComponent from "./httpComponent";
import { Extension, Paginated, paginatedResponse } from "./interfaces";

class Extensions extends HttpComponent {
  async getList(query: any): Promise<Paginated<Extension>> {
    const url = this.urlQuery(`${this.cli.apiUrl}/extensions`, query);
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return paginatedResponse<Extension>(response);
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
