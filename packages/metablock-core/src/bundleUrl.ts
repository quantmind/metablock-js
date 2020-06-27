import getBlock from "./block";

const bundleUrl = (fileName: string) => {
  const block = getBlock();
  const base = block.assetsUrl;
  return fileName ? `${base}/${fileName}` : base;
};

export default bundleUrl;
