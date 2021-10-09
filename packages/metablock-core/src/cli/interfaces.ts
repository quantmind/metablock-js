import HttpResponse from "../response";
import { parseLinkHeader } from "./headers";

export class Paginated<T> {
  data: T[];
  count: number;
  offset: number;
  limit: number;
  links: Record<string, string>;

  constructor(data: T[], count = 0, links = {}, offset = 0, limit = 25) {
    this.data = data;
    this.count = count;
    this.offset = offset;
    this.limit = limit;
    this.links = links;
  }
}

export function paginatedResponse<T>(response: HttpResponse): Paginated<T> {
  const data = response.data as T[];
  const count = response.headers.get("x-total-count");
  const links = parseLinkHeader(response.headers.get("link"));
  return new Paginated<T>(data, count ? +count : data.length, links);
}

export interface Org {
  id: string;
  short_name: string;
  email: string;
  full_name?: string;
  country?: string;
  website?: string;
}

export interface OrgMember {
  user_id: string;
  roles: string[];
  org_name: string;
  org_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface OrgRole {
  user_id: string;
  roles: string[];
  org_name: string;
  org_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Block {
  id: string;
  name: string; // name of the metablock site
  title: string; // default title
  description: string; // default description
  apiUrl: string; // metablock api url
  assetsUrl: string; // base url of the javascript bundle
  date_format: string;
  login_url: string;
  signin_url: string;
  signup_url: string;
  forgot_password_url: string;
  space: Space;
  plugins?: Paginated<BlockPlugin>;
  [x: string]: any;
}

export interface Space {
  id: string;
  name: string;
  domain: string;
  hosted: boolean;
  org_id: string;
  org_name: string;
  blocks?: Paginated<Block>;
  extensions: Paginated<SpaceExtension>;
  cdn?: string;
}

export interface Extension {
  id: string;
  name: string;
  description: string;
  script?: string;
  schema: Record<string, any>;
}

export interface SpaceExtension {
  id: string;
  name: string;
  script?: string;
  config: Record<string, any>;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  schema: Record<string, any>;
  extension_id?: string;
}

export interface BlockPlugin {
  id: string;
  name: string;
  description?: string;
  author?: string;
  config: Record<string, any>;
}

export interface ApiToken {
  id: string;
  created: string;
}

export interface Deployment {
  id: string;
  name: string;
  service_id: string;
  env: string;
  created: string;
}
