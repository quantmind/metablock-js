class Module extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const src = this.getAttribute("src");
    const root = this.shadowRoot || this;
    if (!src) {
      root.innerHTML = `<div style="color: red">No src attribute</div>`;
      return;
    }
    const ar = this.getAttribute("aspectratio");
    root.innerHTML = ar
      ? `<div class="module-outer" style="width: 100%; position: relative; padding-top:${ar}">
        <div class="module" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0"></div>
      </div>`
      : `<div class="module"></div>`;
    const module = await import(/* webpackIgnore: true */ src);
    const element = root.querySelector(".module");
    if (element)
      module.default(element);
  }
}

customElements.define("module-component", Module);
