import { logger } from "./lib/utils";

const html = (html: string, ownerDocument?: any) => {
  const doc = ownerDocument || document;
  const el = doc.createElement("div");
  el.innerHTML = html;
  const children = el.children;
  if (children.length !== 1)
    logger.warn(
      `html function should return one root element only, got ${children.length}`
    );
  return children[0];
};

export default html;
