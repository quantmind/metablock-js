import Markdown from "./markdown";
import compileOptions from "./options";

const renderer = {
  code(code: string, info: string, escaped: boolean) {
    if (info === "module") {
      const options = compileOptions(code);
      const paddingTop = options.aspectRatio || "50%";
      delete options.aspectRatio;
      const data = Object.keys(options).reduce((d: string, key: string) => {
        return `${d} data-${key}="${options[key]}"`;
      }, "");
      return `<div class="module-outer" style="width: 100%; position: relative; padding-top:${paddingTop}">
        <div class="module" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0"${data}></div>
      </div>`;
    }
    return false;
  },
};

// Executed once the root element is mounted in the DOM
const after = async (mkd: Markdown, root: any) => {
  const modules = root.querySelectorAll("div.module");
  return Promise.all(
    Array.from(modules, async (element: any) => {
      const script = element.dataset.script;
      if (script) {
        const module = await import(/* webpackIgnore: true */ script);
        module.default(element, element.dataset);
      }
    })
  );
};

export default { renderer, after };
