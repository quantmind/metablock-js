import html from "./html";
import getAttrs from "./lib/attrs";
import Markdown from "./markdown";

const renderer = {
  html(raw: string) {
    const dom = html(raw);
    if (dom.tagName === "SCRIPT") {
      const attrs = getAttrs(dom);
      if (attrs.src) {
        const ar = attrs.aspectratio;
        const data = Object.keys(attrs).reduce((d: string, key: string) => {
          return `${d} data-${key}="${attrs[key]}"`;
        }, "");
        if (ar)
          return `<div class="module-outer" style="width: 100%; position: relative; padding-top:${ar}">
            <div class="module" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0"${data}></div>
          </div>`;
        else return `<div class="module"${data}></div>`;
      }
    }
    return false;
  },
};

// Executed once the root element is mounted in the DOM
const after = async (mkd: Markdown, root: any) => {
  const modules = root.querySelectorAll("div.module");
  return Promise.all(
    Array.from(modules, async (element: any) => {
      const src = element.dataset.src;
      if (src) {
        const module = await import(/* webpackIgnore: true */ src);
        module.default(element, element.dataset);
      }
    })
  );
};

export default { renderer, after };
