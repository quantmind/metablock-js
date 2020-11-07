import { Org, Space } from "./cli";

export interface ExtensionData {
  title: string;
  url: string;
  create?: string;
  options?: Record<string, any>;
  items?: (query: any) => any[];
}

export interface ExtensionOutput extends ExtensionData {
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
  space?: Space;
}
