import getBlock from "./block";

export const assetUrl = (fileName?: string) => {
  const block = getBlock();
  const base = block.assetsUrl;
  return fileName ? `${base}/${fileName}` : base;
};

export const deployUrl = (fileName?: string) => {
  const block = getBlock();
  const base = block.deployUrl;
  return fileName ? `${base}/${fileName}` : base;
};

export const liveUrl = (fileName?: string) => {
  const block = getBlock();
  const base = block.liveUrl;
  return fileName ? `${base}/${fileName}` : base;
};

export const bundleUrl = deployUrl;
