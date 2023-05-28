import config from "../config";
import Html from "../lib/html";
import Notebook from "../notebook";

const resolve = (name: string): string | void => {
  if (name.substring(0, config.CODEMIRROR.length) == config.CODEMIRROR)
    return name;
  else if (name === "../../lib/codemirror")
    return `${config.CODEMIRROR}/lib/codemirror.min.js`;
  else if (name.substring(0, 3) === "../")
    return `${config.CODEMIRROR}/mode/${name.substring(3)}.js`;
};

class Editor {
  notebook: Notebook;
  defaults: Record<string, any>;
  modules = [
    "view",
    "state",
    "history",
    "fold",
    "language",
    "commands",
    "search",
    "autocomplete",
    "highlight",
  ];

  constructor(notebook: Notebook, defaults?: any) {
    this.notebook = notebook;
    this.notebook.resolvers.push(resolve);
    this.defaults = { theme: "neo", mode: "javascript", ...defaults };
  }

  async load(): Promise<any> {
    const repo = Object.create(null);
    const loadToRepo = async (key: string) => {
      const module = await this.loadModule(key);
      repo[key] = module;
    };
    await Promise.all(this.modules.map(loadToRepo));
    return repo;
  }

  async loadModule(module: string): Promise<any> {
    return await this.notebook.importModule(`${config.CODEMIRROR}/${module}`);
  }

  async render(text: string, element: any, options?: any): Promise<any> {
    const opts = { ...this.defaults, ...options };
    const { tabSize = 2, lineNumbers, events } = opts;
    const extensions: any[] = [];
    const cm = await this.load();
    const { EditorState, Compartment } = cm.state;
    const { EditorView, keymap } = cm.view;
    const { indentWithTab } = cm.commands;

    if (tabSize) {
      const ts = new Compartment();
      extensions.push(keymap.of([indentWithTab]));
      extensions.push(ts.of(EditorState.tabSize.of(+tabSize)));
    }
    if (lineNumbers === "") extensions.push(cm.view.lineNumbers());
    const state = EditorState.create({
      doc: text,
      extensions,
    });

    const instance = new EditorView({
      state,
      parent: element,
    });
    if (events)
      Object.keys(events).forEach((event) => {
        instance.on(event, events[event]);
      });
  }

  lineNumbers(mode: string, lineNumbers: any) {
    return lineNumbers || mode !== "markdown";
  }

  tabSize(mode: string, tabSize: any) {
    return tabSize || mode === "python" ? 4 : 2;
  }
}

class EditorComponent extends HTMLElement {
  async connectedCallback() {
    const html = new Html(this);
    const editor = Notebook.create().editor;
    const text = this.textContent || "";
    const options = html.getAttrs();
    await editor.render(text, this, options);
  }
}

if (customElements.get("editor-component") === undefined) {
  customElements.define("editor-component", EditorComponent);
}

export default Editor;
