import {
  Asset,
  Block,
  BlockPlugin,
  DataApi,
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

  async certificate(block_id: string): Promise<any> {
    const url = `${this.cli.apiUrl}/services/${block_id}/certificate`;
    const response = await this.cli.get(url);
    return response.data as any;
  }

  pluginsLoader(block_id: string): DataApi<BlockPlugin> {
    return this.cli.loader(`${this.cli.apiUrl}/services/${block_id}/plugins`);
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

  deploymentsLoader(block_id: string): DataApi<Deployment> {
    return this.cli.loader(
      `${this.cli.apiUrl}/services/${block_id}/deployments`
    );
  }

  async assets(block_id: string): Promise<Asset[]> {
    const response = await this.cli.get(
      `${this.cli.apiUrl}/services/${block_id}/assets`
    );
    return response.data as Asset[];
  }

  async uploadAssets(block_id: string, assetFiles: any[]): Promise<void> {
    for (let i = 0; i < assetFiles.length; ++i) {
      const asset = assetFiles[i];
      const response = await this.cli.get(
        this.urlQuery(
          `${this.cli.apiUrl}/services/${block_id}/assets-upload-url`,
          { path: asset.path, type: asset.type }
        )
      );
      const d = response.data;
      const body = new FormData();
      Object.keys(d.fields).forEach((key: string) => {
        body.append(key, d.fields[key]);
      });
      body.append("file", asset);
      await fetch(d.url, { body, method: "POST" });
    }
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
