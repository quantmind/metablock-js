import { require as requireDefault, requireFrom, resolver } from "d3-require";
import config from "./config";
import code from "./extensions/code";
import Editor from "./extensions/editor";
import math from "./extensions/math";
import script from "./extensions/script";
import { asArray } from "./lib/utils";
import loadJs from "./loadJs";
import Markdown, { defaultMarkdownExtensions } from "./markdown";
import style from "./style";

defaultMarkdownExtensions.push(math);
defaultMarkdownExtensions.push(code);
defaultMarkdownExtensions.push(script);

const notebookResolver = (notebook: Notebook, resolve?: resolver) => {
  const defaultResolve = resolve || requireDefault.resolve;
  return async (name: string): Promise<string> => {
    for (let i = 0; i < notebook.resolvers.length; ++i) {
      const resolved = notebook.resolvers[i](name);
      if (resolved) return resolved;
    }
    return await defaultResolve(name);
  };
};

class Notebook {
  require: any;
  cache: Record<string, any>;
  models: Record<string, any>;
  actions: Record<string, any>;
  options: Record<string, any>;
  defaultResolve: any;
  resolvers: any[];
  md: Markdown;
  editor: Editor;

  static create(): Notebook {
    // @ts-ignore
    if (!window.__notebook__) window.__notebook__ = new Notebook();
    // @ts-ignore
    return window.__notebook__;
  }

  constructor(resolve?: resolver) {
    this.require = requireFrom(notebookResolver(this, resolve));
    this.cache = {};
    this.models = {};
    this.actions = {};
    this.resolvers = [];
    this.options = {};
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

  async loadJs(src: string, attrs?: Record<string, any>): Promise<void> {
    await loadJs(src, attrs);
  }

  async importModule(src: string): Promise<any> {
    return await import(/* webpackIgnore: true */ src);
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

  async renderCode(
    element: any,
    code?: string,
    lang?: string
  ): Promise<Record<string, any>> {
    const hls = this.options.highlightStyle || config.defaultHighlightStyle;
    await this.loadStyle(`${config.HL_CSS}/${hls}.min.css`);
    await loadJs(`${config.HL_ROOT}/highlight.min.js`);
    const text = code || element.innerText;
    // @ts-ignore
    const hl = window.hljs;
    const classes = new Set(element.classList.values());
    const language = lang || element.className || "plaintext";
    let languageObject = hl.getLanguage(language);
    if (!languageObject) {
      languageObject = await this.require(
        `${config.HL_ROOT}/languages/${language}.min.js`
      );
      hl.registerLanguage(language, languageObject);
    }
    element.innerHTML = hl.highlight(text, { language }).value;
    const langu =
      languageObject && languageObject.aliases ? languageObject.aliases[0] : "";
    return { lang: langu, code: text, element, classes };
  }
}

export default Notebook;
