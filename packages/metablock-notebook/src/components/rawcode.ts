class RawCode extends HTMLElement {
  connectedCallback() {
    const inline = this.hasAttribute("inline");
    const text = (this.textContent || "").trim();
    const html = inline
      ? `<span>${text}</span>`
      : `<pre><code class="markdown">${text}</code></pre>`;
    this.innerHTML = html;
  }
}

export default RawCode;
