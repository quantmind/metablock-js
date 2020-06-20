import HttpComponent from "./http";

class MbAuth extends HttpComponent {
  async login(body: any): Promise<string> {
    const response = await this.cli.post("/.api/login", { body });
    return response.data.jwt;
  }
}

export default MbAuth;
