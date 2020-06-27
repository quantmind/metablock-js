import getBlock from "./block";

const bundleUrl = (fileName: string) => {
  const block = getBlock();
  return `${block.assetsUrl}/${fileName}`;
};

export default bundleUrl;
