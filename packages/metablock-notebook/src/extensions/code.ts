import Notebook from "../notebook";

const after = async (
  notebook: Notebook,
  root: any,
  options: any
): Promise<void> => {
  const elements = root.querySelectorAll("pre code[class]");
  if (elements.length > 0) {
    await Promise.all(
      Array.from(elements, (element: Element) => notebook.renderCode(element))
    );
  }
};

class RawCode extends HTMLElement {

  connectedCallback() {
    const code = this.textContent || "";
    const root = this.shadowRoot || this;
    root.innerHTML = `<pre><code class="markdown">${code}</code></pre>`;
  }
}

customElements.define("raw-code", RawCode);

export default { after };
