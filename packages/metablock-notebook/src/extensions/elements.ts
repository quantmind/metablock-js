import Clipboard from "./clipboard";
import { RawCode } from "./code";
import { EditorComponent } from "./editor";
import GithubModule from "./github";
import Module from "./module";

const installElements = () => {
  customElements.define("github-repo", GithubModule);
  customElements.define("module-component", Module);
  customElements.define("editor-component", EditorComponent);
  customElements.define("raw-code", RawCode);
  customElements.define("with-clipboard", Clipboard);
};

export default installElements;
