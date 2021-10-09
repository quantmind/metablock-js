export interface DataGridApi<T> {
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasMoreData: () => boolean;

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isDataLoading: () => boolean;

  // Array of items loaded so far.
  data: T[];

  searchText?:
   string;

  // Callback function responsible for loading the next page of items.
  loadData: () => Promise<void>;

  // Callback function responsible for loading the next page of items.
  search: (searchText: string) => Promise<void>;
}

export interface DataGridApiFactory<T> {
  loader: (query: any) => DataGridApi<T>;
}
