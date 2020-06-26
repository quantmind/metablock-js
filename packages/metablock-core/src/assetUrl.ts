import getBlock from "./block";

const assetUrl = (fileName: string) => {
  const block = getBlock();
  return `https://assets.metablock.io/blocks/${block.id}/assets/${fileName}`;
};

export default assetUrl;
