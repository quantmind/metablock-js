export interface DataGridApi<T> {
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

  // Callback function responsible for loading the next page of items.
  search: (searchText: string) => Promise<void>;
}

export class StaticData<T> implements DataGridApi<T> {
  data: T[];
  searchText = "";

  constructor(data: T[]) {
    this.data = data;
  }

  hasMoreData() {
    return false;
  }

  isDataLoading() {
    return false;
  }

  async loadData() {}
  async search(searchText: string) {
    this.searchText = searchText;
  }
}
