import config from "../config";
import Html from "../lib/html";
import Notebook from "../notebook";


class Editor {
  notebook: Notebook;
  defaults: Record<string, any>;
  modules = [
    "view",
    "state",
    "history",
    "gutter",
    "fold",
    "language",
    "commands",
    "search",
    "autocomplete",
    "highlight",
  ];

  constructor(notebook: Notebook, defaults?: any) {
    this.notebook = notebook;
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

  async render(text: string, parent: HTMLElement, options?: any): Promise<any> {
    const opts = { ...this.defaults, ...options };
    const { tabSize = 2, events = {} } = opts;
    const extensions: any[] = [];
    const cm = await this.notebook.importModule(config.CODEMIRROR);

    const { EditorView } = cm;

    if (tabSize) {
      //const ts = new Compartment();
      // extensions.push(keymap.of([indentWithTab]));
      //extensions.push(ts.of(EditorState.tabSize.of(+tabSize)));
    }
    // if (lineNumbers === "") extensions.push(cm.gutter.lineNumbers());

    extensions.push(
      EditorView.updateListener.of((update: any) => {
        const { docChanged } = update;
        if (docChanged && events.change)
          events.change(update.state.doc.toString());
      })
    );

    new EditorView({
      doc: text,
      extensions,
      parent,
    });
  }

  lineNumbers(mode: string, lineNumbers: any) {
    return lineNumbers || mode !== "markdown";
  }

  tabSize(mode: string, tabSize: any) {
    return tabSize || mode === "python" ? 4 : 2;
  }
}

export class EditorComponent extends HTMLElement {
  async connectedCallback() {
    const html = new Html(this);
    const editor = Notebook.create().editor;
    const text = this.textContent || "";
    const options = html.getAttrs();
    await editor.render(text, this, options);
  }
}

export default Editor;
