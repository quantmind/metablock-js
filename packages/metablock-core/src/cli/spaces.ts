import HttpResponse from "../response";
import HttpComponent from "./httpComponent";
import {
  Block,
  Paginated,
  paginatedResponse,
  Space,
  SpaceExtension,
} from "./interfaces";

class Spaces extends HttpComponent {
  async getList(query: any): Promise<HttpResponse> {
    const url = this.urlQuery(`${this.cli.apiUrl}/spaces`, query);
    return await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
  }

  async orgSpaces(org_id: string, query: any): Promise<HttpResponse> {
    const url = this.urlQuery(
      `${this.cli.apiUrl}/orgs/${org_id}/spaces`,
      query
    );
    return await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
  }

  async get(space_id: string): Promise<Space> {
    const url = `${this.cli.apiUrl}/spaces/${space_id}`;
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return response.data as Space;
  }

  async create(org_id: string, body: Record<string, any>): Promise<Space> {
    const url = `${this.cli.apiUrl}/orgs/${org_id}/spaces`;
    const response = await this.cli.post(url, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Space;
  }

  async update(space_id: string, body: Record<string, any>): Promise<Space> {
    const url = `${this.cli.apiUrl}/spaces/${space_id}`;
    const response = await this.cli.patch(url, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Space;
  }

  async delete(space_id: string): Promise<void> {
    const url = `${this.cli.apiUrl}/spaces/${space_id}`;
    await this.cli.delete(url, {
      headers: this.cli.withToken(),
    });
  }

  async getBlocks(space_id: string, query?: any): Promise<Paginated<Block>> {
    const url = this.urlQuery(
      `${this.cli.apiUrl}/spaces/${space_id}/services`,
      query
    );
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return paginatedResponse<Block>(response);
  }

  async getExtensions(
    space_id: string,
    query?: any
  ): Promise<Paginated<SpaceExtension>> {
    const url = this.urlQuery(
      `${this.cli.apiUrl}/spaces/${space_id}/extensions`,
      query
    );
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return paginatedResponse<SpaceExtension>(response);
  }

  async updateExtension(space_id: string, body: any): Promise<SpaceExtension> {
    const url = `${this.cli.apiUrl}/spaces/${space_id}/extensions`;
    const response = await this.cli.post(url, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as SpaceExtension;
  }
}

export default Spaces;
