import Notebook from "../notebook";

const after = async (
  notebook: Notebook,
  root: any,
  options: any
): Promise<void> => {
  const elements = root.querySelectorAll("pre code[class]");
  if (elements.length > 0) {
    await Promise.all(
      Array.from(elements, async (element: Element) => {
        await notebook.renderCode(element);
      })
    );
  }
};

class RawCode extends HTMLElement {

  connectedCallback() {
    const inline = this.hasAttribute("inline");
    const text = (this.textContent || "").trim();
    const html = inline ? `<span>${text}</span>` : `<pre><code class="markdown">${text}</code></pre>`;
    this.innerHTML = html;
  }
}

customElements.define("raw-code", RawCode);

export default { after };
