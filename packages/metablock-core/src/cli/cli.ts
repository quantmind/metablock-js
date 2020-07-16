import HttpClient from "../http";
import MbAuth from "./auth";
import Blocks from "./blocks";
import Extensions from "./extensions";
import { Space } from "./interfaces";
import Orgs from "./orgs";
import Photos from "./photos";
import Plugins from "./plugins";
import Spaces from "./spaces";
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
  extensions: Extensions;
  plugins: Plugins;
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
    this.plugins = new Plugins(this);
    this.extensions = new Extensions(this);
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
