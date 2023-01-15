import { require as requireDefault, requireFrom, resolver } from "d3-require";
import { Library } from "./config";
import code from "./extensions/code";
import Editor from "./extensions/editor";
import math from "./extensions/math";
import jsmod from "./extensions/module";
import { asArray } from "./lib/utils";
import loadJs from "./loadJs";
import Markdown, { defaultMarkdownExtensions } from "./markdown";
import style from "./style";

defaultMarkdownExtensions.push(math);
defaultMarkdownExtensions.push(code);
defaultMarkdownExtensions.push(jsmod);

const libResolver = (lib: Library, resolve?: resolver) => {
  const defaultResolve = resolve || requireDefault.resolve;
  return async (name: string): Promise<string> => {
    for (let i = 0; i < lib.resolvers.length; ++i) {
      const resolved = lib.resolvers[i](name);
      if (resolved) return resolved;
    }
    return await defaultResolve(name);
  };
};

class Notebook implements Library {
  require: any;
  cache: Record<string, any>;
  models: Record<string, any>;
  actions: Record<string, any>;
  defaultResolve: any;
  resolvers: any[];
  md: Markdown;
  editor: Editor;

  constructor(resolve?: resolver) {
    this.require = requireFrom(libResolver(this, resolve));
    this.cache = {};
    this.models = {};
    this.actions = {};
    this.resolvers = [];
    this.md = new Markdown(this);
    this.editor = new Editor(this);
  }

  get resolve(): resolver {
    return this.require.resolve;
  }

  async loadStyle(stylesheet: string): Promise<void> {
    if (!this.cache[stylesheet]) {
      await style(stylesheet);
      this.cache[stylesheet] = true;
    }
  }

  // Execute Javascript code by creating a new script element
  exec(code: string, element?: Element) {
    const script = document.createElement("script");
    const wrappedCode = `(function() {\n${code}\n}());`;
    const body = document.createTextNode(wrappedCode);
    script.appendChild(body);
    const target = element || document.body;
    target.appendChild(script);
  }

  // Render a markdown text into an element
  async render(text: string, element: any, options?: any): Promise<any> {
    const opts = options || {};
    const promises: Promise<any>[] = [];
    if (opts.stylesheet)
      asArray(opts.stylesheet).forEach((stylesheet: string) => {
        promises.push(this.loadStyle(stylesheet));
      });
    if (opts.js)
      asArray(opts.js).forEach((js: string) => {
        promises.push(loadJs(js));
      });
    if (promises.length) await Promise.all(promises);
    return await this.md.render(text, element, opts);
  }

  async edit(text: string, element: any, options?: any): Promise<any> {
    return await this.editor.render(text, element, options);
  }
}

export default Notebook;
