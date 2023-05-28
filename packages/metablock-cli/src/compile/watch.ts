import fs from "fs";
import { resolve } from "path";
import { info } from "../log";
import getCompiler from "./compiler";
import pagination from "./pagination";
import compileBundle from "./svelte";

const watch = async (targets: Record<string, any>) => {
  const sourcePaths = Object.keys(targets);
  if (sourcePaths.length) {
    info(`:eyes: watching ${sourcePaths.length} paths for changes...`);
    sourcePaths.forEach((sourcePath) => {
      fs.watch(sourcePath, async (file) => {
        const sourceFile = fs.lstatSync(sourcePath).isDirectory()
          ? resolve(sourcePath, file)
          : sourcePath;
        info(`:keyboard:  ${sourceFile}`);
        const { config, srcPath, index, outputDir } = targets[sourcePath];
        const isIndex = sourceFile === srcPath ? index : false;
        const compiler = getCompiler(sourceFile);
        const output = await compiler(sourceFile, config, isIndex);
        targets[sourcePath] = { ...output, config };
        if (output.paginate) pagination(targets, outputDir);
        if (config.js_source) await compileBundle(config, sourceFile);
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
