import config from "../config";
import loadJs from "../loadJs";
import Markdown from "../markdown";
import style from "../style";

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
    loadStyle(mkd, `${config.HL_CSS}/${hls}.min.css`);
    const blocks = await Promise.all(
      Array.from(elements, (element: Element) => getCode(mkd, element))
    );
    blocks.forEach((block: any) => {
      if (block.lang === "js" && block.classes.has("javascript"))
        mkd.lib.exec(block.code);
    });
  }
};

const getCode = async (
  mkd: Markdown,
  element: any
): Promise<Record<string, any>> => {
  const purify = await mkd.require(config.PURIFY);
  const code = purify.sanitize(element.innerText);
  return await renderCode(mkd, element, code);
};

export const renderCode = async (
  mkd: Markdown,
  element: any,
  code: string,
  lang?: string
): Promise<Record<string, any>> => {
  await loadJs(`${config.HL_ROOT}/highlight.min.js`);
  const purify = await mkd.require(config.PURIFY);
  code = purify.sanitize(element.innerText);
  // @ts-ignore
  const hl = window.hljs;
  const classes = new Set(element.classList.values());
  const lang_ = lang || element.className;
  let language = hl.getLanguage(lang_);
  if (!language) {
    language = await mkd.require(`${config.HL_ROOT}/languages/${lang_}.min.js`);
    hl.registerLanguage(lang_, lang);
  }
  hl.highlightBlock(element);
  const langu = language && language.aliases ? language.aliases[0] : "";
  return { lang: langu, code, element, classes };
};

export default { after };
