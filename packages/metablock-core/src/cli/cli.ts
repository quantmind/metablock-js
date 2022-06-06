import HttpClient from "../http";
import { Space } from "../interfaces";
import MbAuth from "./auth";
import Blocks from "./blocks";
import Cache from "./cache";
import Extensions from "./extensions";
import Orgs from "./orgs";
import Photos from "./photos";
import Plugins from "./plugins";
import Spaces from "./spaces";
import MbUser from "./user";

export interface MetablockOptions {
  baseUrl?: string;
  name?: string;
  jwt?: string;
  token?: string;
}

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
  cache: Cache;
  private _spec?: any;

  constructor(options?: MetablockOptions) {
    super(options?.name || "metablock");
    this.baseUrl = options?.baseUrl || "https://api.metablock.io";
    this.jwt = options?.jwt || "";
    this.token = options?.token || "";
    this.auth = new MbAuth(this);
    this.user = new MbUser(this);
    this.orgs = new Orgs(this);
    this.blocks = new Blocks(this);
    this.spaces = new Spaces(this);
    this.plugins = new Plugins(this);
    this.extensions = new Extensions(this);
    this.photos = new Photos(this);
    this.cache = new Cache(this);
  }

  get apiUrl(): string {
    return `${this.baseUrl}/v1`;
  }

  getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = { ...this.defaultHeaders };
    if (this.jwt) headers["authorization"] = `Bearer ${this.jwt}`;
    else if (this.token) headers["x-metablock-api-key"] = this.token;
    return headers;
  }

  async genesis(): Promise<Space> {
    const response = await this.get(`${this.apiUrl}/space`);
    return response.data as Space;
  }

  schemaLoader(name: string) {
    return async () => {
      if (!this._spec) {
        const response = await this.get(`${this.apiUrl}/spec`);
        this._spec = response.data;
      }
      return this._spec.components.schemas[name];
    };
  }
}

export default Metablock;
