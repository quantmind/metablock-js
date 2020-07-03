import { require as requireDefault, requireFrom, resolver } from "d3-require";
import code from "./code";
import { asArray } from "./lib/utils";
import Markdown, { defaultMarkdownExtensions } from "./markdown";
import math from "./math";
import jsmod from "./module";
import style from "./style";

defaultMarkdownExtensions.push(math);
defaultMarkdownExtensions.push(code);
defaultMarkdownExtensions.push(jsmod);

class Notebook {
  require: any;
  cache: Record<string, any>;
  models: Record<string, any>;
  actions: Record<string, any>;
  md: any;

  constructor(resolve?: resolver) {
    this.require = requireFrom(resolve || requireDefault.resolve);
    this.cache = {};
    this.models = {};
    this.actions = {};
    this.md = new Markdown(this);
  }

  get resolve(): resolver {
    return this.require.resolve;
  }

  // Execute Javascript code bycreating a new script element
  exec(code: string, element?: Element) {
    const script = document.createElement("script");
    const wrappedCode = `(function() {\n${code}\n}());`;
    const body = document.createTextNode(wrappedCode);
    script.appendChild(body);
    const target = element || document.body;
    target.appendChild(script);
  }

  async render(text: string, element: any, options?: any): Promise<any> {
    const opts = options || {};
    if (opts.stylesheet) {
      await Promise.all(
        asArray(opts.stylesheet).map(async (stylesheet: string) => {
          if (!this.cache[stylesheet]) {
            await style(stylesheet);
            this.cache[stylesheet] = true;
          }
        })
      );
    }
    return await this.md.render(text, element, opts);
  }
}

export default Notebook;
