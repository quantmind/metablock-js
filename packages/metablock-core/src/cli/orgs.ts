import HttpResponse from "../response";
import HttpComponent from "./httpComponent";
import { Org } from "./interfaces";

class Orgs extends HttpComponent {
  get url(): string {
    return `${this.cli.apiUrl}/orgs`;
  }

  async get(org_id: string): Promise<Org> {
    const response = await this.cli.get(`${this.url}/${org_id}`, {
      headers: this.cli.withToken(),
    });
    return response.data as Org;
  }

  async update(org_id: string, body: Record<string, any>): Promise<Org> {
    const response = await this.cli.patch(`${this.url}/${org_id}`, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Org;
  }

  async create(body: Record<string, any>): Promise<Org> {
    const response = await this.cli.post(this.url, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Org;
  }

  async extensions(org_id: string): Promise<HttpResponse> {
    return await this.cli.get(`${this.url}/${org_id}/extensions`, {
      headers: this.cli.withToken(),
    });
  }
}

export default Orgs;
