import HttpResponse from "../response";
import HttpComponent from "./http";
import { Block } from "./interfaces";

class Blocks extends HttpComponent {
  async getList(query: any): Promise<HttpResponse> {
    const url = this.urlQuery(`${this.cli.apiUrl}/services`, query);
    return await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
  }

  async get(block_id: string): Promise<Block> {
    const url = `${this.cli.apiUrl}/services/${block_id}`;
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return response.data as Block;
  }

  async create(record: Record<string, any>): Promise<Block> {
    const { space_id, ...body } = record;
    const url = `${this.cli.apiUrl}/spaces/${space_id}/services`;
    const response = await this.cli.post(url, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Block;
  }

  async update(block_id: string, body: Record<string, any>): Promise<Block> {
    const url = `${this.cli.apiUrl}/services/${block_id}`;
    const response = await this.cli.patch(url, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as Block;
  }

  async delete(block_id: string): Promise<void> {
    const url = `${this.cli.apiUrl}/services/${block_id}`;
    await this.cli.delete(url, {
      headers: this.cli.withToken(),
    });
  }

  async plugins(block_id: string): Promise<any[]> {
    const url = `${this.cli.apiUrl}/services/${block_id}/plugins`;
    const response = await this.cli.get(url, {
      headers: this.cli.withToken(),
    });
    return response.data as any[];
  }

  async ship(
    block_id: string,
    body: FormData
  ): Promise<Record<string, string>> {
    const url = `${this.cli.apiUrl}/services/${block_id}/deployments`;
    const response = await this.cli.post(url, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data;
  }
}

export default Blocks;
