import getBlock from "./block";

const assetUrl = (fileName: string) => {
  const block = getBlock();
  const base = `https://assets.metablock.io/blocks/${block.id}/assets`;
  return fileName ? `${base}/${fileName}` : base;
};

export default assetUrl;
