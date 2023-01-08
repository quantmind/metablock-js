import { logger } from "./utils";

class Html {
  dom: HTMLElement;

  constructor(dom: HTMLElement) {
    this.dom = dom;
  }

  static fromString(html: string, ownerDocument?: any): Html | null {
    const doc = ownerDocument || document;
    const el = doc.createElement("div");
    el.innerHTML = html;
    const children = el.children;
    if (children.length !== 1)
      logger.warn(
        `html function should return one root element only, got ${children.length}`
      );
    const dom = children[0];
    return dom ? new Html(dom) : null;
  }

  get tagName(): string {
    return this.dom.tagName;
  }

  getAttrs(): Record<string, any> {
    const dom = this.dom;
    return dom
      ? dom
          .getAttributeNames()
          .reduce((o: Record<string, any>, name: string) => {
            o[name] = dom.getAttribute(name);
            return o;
          }, {})
      : {};
  }
}

export default Html;
