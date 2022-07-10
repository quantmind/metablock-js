import fs from "fs";
import mime from "mime-types";
import { basename, resolve } from "path";
import { info } from "../log";

export const copyFile = async (
  srcPath: string,
  config: Record<string, any>
) => {
  const fileName = basename(srcPath);
  const outputDir = config.outputDir;
  const outPath = resolve(outputDir, fileName);
  fs.mkdirSync(config.outputDir, { recursive: true });
  fs.copyFileSync(srcPath, outPath);
  const contentType = mime.lookup(srcPath);
  info(`:arrow_right: copied ${contentType} file to ${outPath}`);
  return {
    contentType,
    paginate: false,
    outputDir,
    outPath,
    srcPath,
  };
};

export default copyFile;
