import HttpClient from "../http";
import MbAuth from "./auth";
import Blocks from "./blocks";
import Orgs from "./orgs";
import Photos from "./photos";
import Spaces, { Space } from "./spaces";
import MbUser from "./user";

export class Metablock extends HttpClient {
  baseUrl: string;
  jwt: string;
  token: string;
  auth: MbAuth;
  user: MbUser;
  orgs: Orgs;
  blocks: Blocks;
  spaces: Spaces;
  photos: Photos;

  constructor(baseUrl: string, name = "", jwt = "", token = "") {
    super(name || "metablock");
    this.baseUrl = baseUrl;
    this.jwt = jwt;
    this.token = token;
    this.auth = new MbAuth(this);
    this.user = new MbUser(this);
    this.orgs = new Orgs(this);
    this.blocks = new Blocks(this);
    this.spaces = new Spaces(this);
    this.photos = new Photos(this);
  }

  get apiUrl(): string {
    return `${this.baseUrl}/v1`;
  }

  withToken(headers?: Record<string, string>): Record<string, string> {
    if (!headers) headers = {};
    if (this.jwt) headers["authorization"] = `Bearer ${this.jwt}`;
    else if (this.token) headers["x-metablock-api-key"] = this.token;
    return headers;
  }

  async genesis(): Promise<Space> {
    const response = await this.get(`${this.apiUrl}/space`);
    return response.data as Space;
  }
}

export default Metablock;
