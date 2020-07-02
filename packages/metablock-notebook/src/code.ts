import config from "./config";
import Markdown from "./markdown";
import style from "./style";

const loadStyle = (mkd: Markdown, url: string) => {
  if (url !== mkd.cache.currentStyleUrl) {
    style(url);
    mkd.cache.currentStyleUrl = url;
  }
};

const after = async (mkd: Markdown, root: any, options: any): Promise<void> => {
  const elements = root.querySelectorAll("pre code[class]");
  if (elements.length > 0) {
    const hls = options.highlightStyle || config.defaultHighlightStyle;
    loadStyle(mkd, `${config.HL_CSS}/${hls}.css`);
    const [hl, purify] = await Promise.all([
      mkd.require(`${config.HL_ROOT}/highlight.min.js`),
      mkd.require(config.PURIFY),
    ]);
    const blocks = await Promise.all(
      Array.from(elements, (element: Element) => getCode(element, hl, purify))
    );
    blocks.forEach((block: any) => {
      if (block.lang === "js" && block.classes.has("javascript"))
        mkd.lib.exec(block.code);
    });
  }
};

const getCode = async (
  element: any,
  hl: any,
  purify: any
): Promise<Record<string, any>> => {
  const code = purify.sanitize(element.innerText);
  const classes = new Set(element.classList.values());
  let language = hl.getLanguage(element.className);
  if (!language) {
    const index = await require(`${config.HL_ROOT}/async-languages/index.js`);
    if (index.has(element.className)) {
      language = await require(`${config.HL_ROOT}/async-languages/${index.get(
        element.className
      )}`);
      hl.registerLanguage(element.className, language);
    }
  }
  hl.highlightBlock(element);
  const lang = language && language.aliases ? language.aliases[0] : "";
  return { lang, code, element, classes };
};

export default { after };
