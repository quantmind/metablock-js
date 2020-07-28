import HttpComponent from "./httpComponent";
import HttpResponse from "../response";

export interface CurrentUser {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface UserOrg {
  org_id: string;
  org_name: string;
  roles: Array<string>;
}

class MbUser extends HttpComponent {
  async getUser(): Promise<CurrentUser> {
    const response = await this.cli.get(`${this.cli.apiUrl}/user`, {
      headers: this.cli.withToken(),
    });
    return response.data as CurrentUser;
  }

  async update(body: any): Promise<CurrentUser> {
    const response = await this.cli.patch(`${this.cli.apiUrl}/user`, {
      body,
      headers: this.cli.withToken(),
    });
    return response.data as CurrentUser;
  }

  async getOrgs(): Promise<UserOrg[]> {
    const response = await this.cli.get(`${this.cli.apiUrl}/user/orgs`, {
      headers: this.cli.withToken(),
    });
    return response.data as UserOrg[];
  }

  async getTokens(): Promise<HttpResponse> {
    return await this.cli.get(`${this.cli.apiUrl}/user/tokens`, {
      headers: this.cli.withToken(),
    });
  }

  async createToken(): Promise<Record<string, string>> {
    const response = await this.cli.post(`${this.cli.apiUrl}/user/tokens`, {
      headers: this.cli.withToken(),
    });
    return response.data as Record<string, string>;
  }

  async deleteToken(tokenId: string): Promise<void> {
    await this.cli.delete(`${this.cli.apiUrl}/user/tokens/${tokenId}`, {
      headers: this.cli.withToken(),
    });
  }

  async logout(): Promise<void> {
    await this.cli.delete(`${this.cli.apiUrl}/user/jwt`, {
      headers: this.cli.withToken(),
    });
  }
}

export default MbUser;
