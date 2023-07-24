import { DataApi, HttpClientInterface, Paginated } from "./interfaces";
import urlQuery from "./url";

export class StaticData<T> implements DataApi<T> {
  data: T[];
  query: Record<string, any>;

  constructor(data: T[], query?: Record<string, any>) {
    this.data = data;
    this.query = query || {};
  }

  hasMoreData() {
    return false;
  }

  isDataLoading() {
    return false;
  }

  get searchText(): string {
    return this.query.search || "";
  }

  async loadData() {}

  reset(query: Record<string, any>) {
    this.query = query;
  }

  setSearch(searchText: string) {
    this.reset({ ...this.query, search: searchText });
  }

  async filter(key: string, value: any): Promise<void> {
    if (value) this.query[key] = value;
    else delete this.query[key];
  }

  async search(searchText: string) {
    this.setSearch(searchText);
  }
}

export class DataLoader<DataType> implements DataApi<DataType> {
  cli: HttpClientInterface;
  data: DataType[];
  query: Record<string, any>;
  url: string;
  links: Record<string, string> | void;
  options: Record<string, any>;
  loading = false;

  constructor(
    cli: HttpClientInterface,
    url: string,
    query?: Record<string, any>,
    options?: Record<string, any>
  ) {
    this.cli = cli;
    this.url = url;
    this.query = query || {};
    this.options = options || {};
    this.data = [];
    this.links = undefined;
  }

  reset(query: Record<string, any>) {
    this.links = undefined;
    this.query = query;
  }

  setSearch(searchText: string) {
    this.reset({ ...this.query, search: searchText });
  }

  hasMoreData(): boolean {
    return !this.links || this.links.next ? true : false;
  }

  isDataLoading(): boolean {
    return this.loading;
  }

  get searchText(): string {
    return this.query.search || "";
  }

  async loadData(): Promise<void> {
    const data = await this.load();
    this.data = this.data.concat(data);
  }

  async filter(key: string, value: any): Promise<void> {
    const query = { ...this.query };
    if (value) query[key] = value;
    else delete query[key];
    this.reset(query);
    this.data = await this.load();
  }

  async search(searchText: string): Promise<void> {
    this.setSearch(searchText);
    this.data = await this.load();
  }

  async load(): Promise<DataType[]> {
    let paginated: Paginated<DataType>;
    this.loading = true;
    try {
      const url = this.links ? this.links.next : urlQuery(this.url, this.query);
      paginated = await this.cli.getList(url, this.options);
    } finally {
      this.loading = false;
    }
    this.links = paginated.links;
    return paginated.data;
  }
}
