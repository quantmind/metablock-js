import HttpComponent from "./http";

export interface Org {
  id: string;
  short_name: string;
  full_name: string;
  email: string;
  country: string;
  website?: string;
}

class Orgs extends HttpComponent {
  async get(org_id: string): Promise<Org> {
    const response = await this.cli.get(`${this.cli.apiUrl}/orgs/${org_id}`, {
      headers: this.cli.withToken(),
    });
    return response.data as Org;
  }

  async update(org_id: string, body: Record<string, any>): Promise<Org> {
    const response = await this.cli.patch(`${this.cli.apiUrl}/orgs/${org_id}`, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Org;
  }

  async create(body: Record<string, any>): Promise<Org> {
    const response = await this.cli.post(`${this.cli.apiUrl}/orgs`, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Org;
  }
}

export default Orgs;
