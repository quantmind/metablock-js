import { Org, Space, SpaceExtension } from "@metablock/core";

export interface RouteComponent {
  label: string;
  url: string;
  Component: any;
  routePath?: string;
}

export interface ExtensionProps {
  baseUrl: string;
  extension: SpaceExtension;
}

export interface ExtensionInput {
  org: Org;
  baseUrl: string;
  space: Space;
}
