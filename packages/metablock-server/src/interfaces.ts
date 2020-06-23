export interface Html {
  meta: Array<string>;
  css: Array<string>;
  scripts: Array<string>;
  afterBody: Array<string>;
}

export interface Context {
  web: Record<string, any>;
  html: Html;
}

export interface Plugin {
  name: string;
  config: Record<string, string>;
}
