import {
  Block,
  BlockPlugin,
  Deployment,
  Paginated,
  paginatedResponse,
} from "../interfaces";
import HttpResponse from "../response";
import HttpComponent from "./httpComponent";

class Blocks extends HttpComponent {
  async getList(query: any): Promise<HttpResponse> {
    const url = this.urlQuery(`${this.cli.apiUrl}/services`, query);
    return await this.cli.get(url);
  }

  async get(block_id: string): Promise<Block> {
    const url = `${this.cli.apiUrl}/services/${block_id}`;
    const response = await this.cli.get(url);
    return response.data as Block;
  }

  async create(record: Record<string, any>): Promise<Block> {
    const { space_id, ...body } = record;
    const url = `${this.cli.apiUrl}/spaces/${space_id}/services`;
    const response = await this.cli.post(url, {
      body,
    });
    return response.data as Block;
  }

  async update(block_id: string, body: Record<string, any>): Promise<Block> {
    const url = `${this.cli.apiUrl}/services/${block_id}`;
    const response = await this.cli.patch(url, {
      body,
    });
    return response.data as Block;
  }

  async delete(block_id: string): Promise<void> {
    const url = `${this.cli.apiUrl}/services/${block_id}`;
    await this.cli.delete(url);
  }

  async config(block_id: string): Promise<any> {
    const url = `${this.cli.apiUrl}/services/${block_id}/config`;
    const response = await this.cli.get(url);
    return response.data as any;
  }

  async getPlugins(
    block_id: string,
    query?: any
  ): Promise<Paginated<BlockPlugin>> {
    const url = this.urlQuery(
      `${this.cli.apiUrl}/services/${block_id}/plugins`,
      query
    );
    const response = await this.cli.get(url);
    return paginatedResponse<BlockPlugin>(response);
  }

  async updatePlugin(block_id: string, body: any): Promise<BlockPlugin> {
    const url = `${this.cli.apiUrl}/services/${block_id}/plugins`;
    const response = await this.cli.post(url, {
      body,
    });
    return response.data as BlockPlugin;
  }

  async deployments(
    block_id: string,
    query?: any
  ): Promise<Paginated<Deployment>> {
    const url = this.urlQuery(
      `${this.cli.apiUrl}/services/${block_id}/deployments`,
      query
    );
    const response = await this.cli.get(url);
    return paginatedResponse<Deployment>(response);
  }

  async ship(
    block_id: string,
    body: FormData
  ): Promise<Record<string, string>> {
    const url = `${this.cli.apiUrl}/services/${block_id}/deployments`;
    const response = await this.cli.post(url, {
      body,
    });
    return response.data;
  }
}

export default Blocks;
