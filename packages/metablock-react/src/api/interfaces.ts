import { Org, Paginated, Space } from "@metablock/core";

export interface ExtensionData<T> {
  title: string;
  url: string;
  create?: any;
  Update?: any;
  options?: Record<string, any>;
  items?: (stores: Record<string, any>, query?: any) => Paginated<T>;
}

export interface ExtensionOutput<T> extends ExtensionData<T> {
  type?: string;
  component?: any;
}

export interface NavigationEntry {
  label: string;
  url: string;
}

export interface ExtensionInput {
  org: Org;
  baseUrl: string;
  navigation: NavigationEntry[];
  space: Space;
}
