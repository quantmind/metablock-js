import Notebook from "../notebook";

class Clipboard extends HTMLElement {
  connectedCallback() {
    const notebook = Notebook.create();
    notebook.addStyle(`
    .notebook-clipboard-content {
      position: relative !important;
      overflow: auto !important;
    }
    .notebook-clipboard {
      position: absolute !important;
      right: 0 !important;
      top: 0 !important;
      animation: fade-out 200ms both;
    }
    .notebook-clipboard-button {
      position: relative;
      padding: 0 !important;
      margin: 8px !important;
      opacity: 0.4;
    }`);
    this.innerHTML = `<div class="notebook-clipboard-content">
      ${this.innerHTML}
      <div class="notebook-clipboard">
        <button class="notebook-clipboard-button">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
        <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
    </svg>
        </button>
      </div>
      </div>`;
    this.querySelector(".notebook-clipboard-button")?.addEventListener(
      "click",
      (event: Event) => {
        const el = event.currentTarget as HTMLElement;
        const content =
          el.parentElement?.previousElementSibling?.textContent || "";
        navigator.clipboard.writeText(content);
      }
    );
  }
}

if (customElements.get("with-clipboard") === undefined) {
  customElements.define("with-clipboard", Clipboard);
}
