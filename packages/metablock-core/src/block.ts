import { Block } from "./cli";
export {};

declare global {
  interface Window {
    __metablock__: Block;
  }
}

const getBlock = (): Block => {
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
    login_url: "/login",
    signin_url: "/signin",
    signup_url: "/signup",
    forgot_password_url: "/forgot-password",
    ...decoded,
  } as Block;

  window.__metablock__ = block;

  return block;
};

export default getBlock;
