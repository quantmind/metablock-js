export interface Config {
  content: boolean;
  paginate: boolean;
  slug: string[];
  // specify a javascript source to compile via rollup
  js_source?: string;
  outputDir: string;
  indexDir: string;
  sourceDir: string;
  path: string;
  // skip a group of files
  skip?: string[];
}

export interface Entry {
  title: string;
  slug: string;
  contentType: string;
  body: string;
  date: string;
  description?: string;
  author?: string;
  order?: number;
  image?: string;
  indexImage?: string;
  private?: boolean;
  paginate: boolean;
  index: boolean;
  config: Config;
  outPath?: string;
}
