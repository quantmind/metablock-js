import config, { Library } from "./config";

const resolve = (name: string): string | void => {
  if (name.substring(0, config.CODEMIRROR.length) == config.CODEMIRROR)
    return name;
  else if (name === "../../lib/codemirror")
    return `${config.CODEMIRROR}/lib/codemirror.min.js`;
  else if (name.substring(0, 3) === "../")
    return `${config.CODEMIRROR}/mode/${name.substring(3)}.js`;
};

class Editor {
  lib: Library;
  defaults: Record<string, any>;

  constructor(lib: Library, defaults?: any) {
    this.lib = lib;
    this.lib.resolvers.push(resolve);
    this.defaults = { theme: "neo", mode: "javascript", ...defaults };
  }

  async render(text: string, element: any, options?: any): Promise<any> {
    const opts = { ...this.defaults, ...options };
    const {
      mode,
      theme,
      tabSize,
      lineNumbers,
      matchBrackets = true,
      styleActiveLine = true,
      events,
      ...extra
    } = opts;
    extra.value = text || "";
    const modeUrl = `${config.CODEMIRROR}/mode/${mode}/${mode}.js`;
    await this.lib.loadStyle(`${config.CODEMIRROR}/lib/codemirror.css`);
    await this.lib.loadStyle(`${config.CODEMIRROR}/theme/${theme}.css`);
    this.lib
      .require(`${config.CODEMIRROR}/lib/codemirror.min.js`)
      .then((Codemirror: any) => {
        this.lib.require(modeUrl).then(() => {
          const instance = Codemirror(element, {
            lineNumbers: this.lineNumbers(mode, lineNumbers),
            tabSize: this.tabSize(mode, tabSize),
            styleActiveLine,
            matchBrackets,
            mode,
            theme,
            ...extra,
          });
          if (events)
            Object.keys(events).forEach((event) => {
              instance.on(event, events[event]);
            });
        });
      });
  }

  lineNumbers(mode: string, lineNumbers: any) {
    return lineNumbers || mode !== "markdown";
  }

  tabSize(mode: string, tabSize: any) {
    return tabSize || mode === "python" ? 4 : 2;
  }
}

export default Editor;
