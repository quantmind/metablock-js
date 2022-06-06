import {
  DataApi,
  Extension,
  Org,
  OrgMember,
  OrgRole,
  Paginated,
  paginatedResponse,
} from "../interfaces";
import HttpComponent from "./httpComponent";

class Orgs extends HttpComponent {
  get url(): string {
    return `${this.cli.apiUrl}/orgs`;
  }

  async get(org_id: string): Promise<Org> {
    const response = await this.cli.get(`${this.url}/${org_id}`);
    return response.data as Org;
  }

  async update(org_id: string, body: Record<string, any>): Promise<Org> {
    const response = await this.cli.patch(`${this.url}/${org_id}`, {
      body,
    });
    return response.data as Org;
  }

  async create(body: Record<string, any>): Promise<Org> {
    const response = await this.cli.post(this.url, {
      body,
    });
    return response.data as Org;
  }

  extensionLoader(org_id: string): DataApi<Extension> {
    return this.cli.loader(`${this.url}/${org_id}/extensions`);
  }

  membersLoader(org_id: string): DataApi<OrgMember> {
    return this.cli.loader(`${this.url}/${org_id}/members`);
  }

  rolesLoader(org_id: string): DataApi<OrgRole> {
    return this.cli.loader(`${this.url}/${org_id}/roles`);
  }

  async getMembers(org_id: string, query?: any): Promise<Paginated<OrgMember>> {
    const url = this.urlQuery(`${this.url}/${org_id}/members`, query);
    const response = await this.cli.get(url);
    return paginatedResponse<OrgMember>(response);
  }

  async getRoles(orgId: string, query?: any): Promise<Paginated<OrgRole>> {
    const url = this.urlQuery(`${this.url}/${orgId}/roles`, query);
    const response = await this.cli.get(url);
    return paginatedResponse<OrgRole>(response);
  }

  async createRole(orgId: string, body: any): Promise<OrgRole> {
    const response = await this.cli.post(`${this.url}/${orgId}/roles`, {
      body,
    });
    return response.data as OrgRole;
  }

  async updateRole(
    orgId: string,
    roleName: any,
    body: Record<string, any>
  ): Promise<OrgRole> {
    const response = await this.cli.patch(
      `${this.url}/${orgId}/roles/${roleName}`,
      {
        body,
      }
    );
    return response.data as OrgRole;
  }

  async deleteRole(orgId: string, roleName: any): Promise<void> {
    await this.cli.delete(`${this.url}/${orgId}/roles/${roleName}`);
  }
}

export default Orgs;
