import { parseLinkHeader } from "./headers";
import HttpResponse from "./response";

export interface DataApi<T> {
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasMoreData: () => boolean;

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isDataLoading: () => boolean;

  // Array of items loaded so far.
  data: T[];

  searchText?: string;

  // Callback function responsible for loading the next page of items.
  loadData: () => Promise<void>;

  // Callback function responsible for full text search
  search: (searchText: string) => Promise<void>;

  // Callback function responsible for filtering a column
  filter: (key: string, value: any) => Promise<void>;

  // query
  query: Record<string, string>;
}

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

export interface HttpClientInterface {
  delete: (url: string, options?: any) => Promise<HttpResponse>;
  get: (url: string, options?: any) => Promise<HttpResponse>;
  head: (url: string, options?: any) => Promise<HttpResponse>;
  patch: (url: string, options?: any) => Promise<HttpResponse>;
  post: (url: string, options?: any) => Promise<HttpResponse>;
  put: (url: string, options?: any) => Promise<HttpResponse>;
  getList: <T>(url: string, options?: any) => Promise<Paginated<T>>;
  loader: <T>(url: string, query?: Record<string, any>) => DataApi<T>;
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
