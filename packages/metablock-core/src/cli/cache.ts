import HttpComponent from "./httpComponent";

class Cache extends HttpComponent {
  async get(key: string): Promise<any> {
    try {
      const response = await this.cli.get(`/.api/cache/${key}`);
      return response.data;
    } catch (exc) {
      return;
    }
  }

  async set(key: string, value: any, timeout?: number): Promise<any> {
    const body: Record<string, any> = { value };
    if (timeout) body.timeout = timeout;
    const response = await this.cli.put(`/.api/cache/${key}`, { body });
    return response.data;
  }

  async getSet(key: string, loader: any, timeout?: number): Promise<any> {
    try {
      const response = await this.cli.get(`/.api/cache/${key}`);
      return response.data;
    } catch (exc) {
      // set the new value
    }
    const value: any = await loader();
    const body: Record<string, any> = { value };
    if (timeout) body.timeout = timeout;
    const response2 = await this.cli.put(`/.api/cache/${key}`, { body });
    return response2.data;
  }
}

export default Cache;
