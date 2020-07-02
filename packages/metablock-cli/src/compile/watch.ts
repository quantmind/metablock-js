import fs from "fs";
import mime from "mime-types";
import { info } from "../log";
import compileFile, { copyFile } from "./file";
import pagination from "./pagination";

export const contentCompilers: Record<string, any> = {
  "text/markdown": compileFile,
  "text/html": copyFile,
  "text/plain": copyFile,
  "application/javascript": copyFile,
};

export const getCompiler = (fileName: string) => {
  const type = mime.lookup(fileName);
  return type ? contentCompilers[type] : null;
};

const watch = async (targets: Record<string, any>) => {
  const srcFiles = Object.keys(targets);
  if (srcFiles.length) {
    info(`:eyes: watching ${srcFiles.length} files for changes...`);
    srcFiles.forEach((srcPath) => {
      fs.watch(srcPath, async () => {
        info(`:keyboard:  changes on ${srcPath}`);
        const { config, slug, index } = targets[srcPath];
        const compiler = getCompiler(srcPath);
        const json = await compiler(srcPath, config, slug, index);
        if (json.paginate) pagination(targets, config);
      });
    });
    let keepSleep = 1000;
    while (keepSleep > 0) {
      keepSleep = Math.ceil(1000 * Math.random() + 1000);
      await sleep(keepSleep);
    }
  }
};

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default watch;
