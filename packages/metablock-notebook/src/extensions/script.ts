import Html from "../lib/html";
import Notebook from "../notebook";

const after = async (
  notebook: Notebook,
  root: any,
  options: any
): Promise<void> => {
  const elements = root.querySelectorAll("script");
  if (elements.length > 0) {
    await Promise.all(
      Array.from(elements, (element: HTMLElement) => {
        const html = new Html(element);
        const attrs = html.getAttrs();
        const src = attrs.src;
        element.remove();
        if (src) {
          delete attrs.src;
          return notebook.loadJs(src, attrs);
        }
      }).filter((p: any) => p)
    );
  }
};

export default { after };
