export {};

/* eslint-disable @typescript-eslint/no-unused-vars */
declare global {
  interface Window {
    __metablock__: WebBlock;
  }
}

export interface WebBlock {
  id: string;
  name: string; // name of the metablock site
  title: string; // default title
  description: string; // default description
  apiUrl: string; // metablock api url
  deployUrl: string; // base url of the javascript bundle
  assetsUrl: string; // base url of static assets
  liveUrl: string; // base url of the production javascript bundle
  deployed: string;
  date_format: string;
  plugins: Record<string, any>;
}

const getBlock = (): WebBlock => {
  if (window.__metablock__) return window.__metablock__;
  const encoded = document.querySelector("meta[name='mb:state']") as any;
  let decoded = {};

  if (encoded) decoded = JSON.parse(atob(encoded.getAttribute("content")));

  const block = {
    name: "metablock",
    title: "metablock",
    description: "metablock",
    apiUrl: "",
    date_format: "%B %d, %Y",
    ...decoded,
  } as WebBlock;

  window.__metablock__ = block;

  return block;
};

export default getBlock;
