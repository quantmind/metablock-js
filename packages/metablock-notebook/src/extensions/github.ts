/// A Notebook plugin to render code from github
///
/// Usage: <github owner="quantmind" repo="metablock-js" path="packages/notebook/github.ts" lang="ts"></github>
///
import config from "../config";
import Notebook from "../notebook";

class GithubModule extends HTMLElement {
  async connectedCallback() {
    const notebook = Notebook.create();
    const module = await notebook.importModule(config.OKTOKIT);
    // @ts-ignore
    const octokit = new module.Octokit();
    const path = this.getAttribute("path");
    if (!path) {
      this.innerHTML = "<strong>No path</strong>";
      return;
    }
    const result = await octokit.rest.repos.getContent({
      owner: this.getAttribute("owner"),
      repo: this.getAttribute("repo"),
      path,
    });
    const data = result.data;
    if (result.status == 200 && data.type === "file") {
      this.innerHTML = "<pre><code></code></pre>";
      const code = this.querySelector("code");
      const language = this.getAttribute("lang") || path.split(".").pop();
      await notebook.renderCode(code, atob(data.content), language);
    }
  }
}


export default GithubModule;
