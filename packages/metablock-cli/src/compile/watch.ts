import fs from "fs";
import { info } from "../log";
import getCompiler from "./compiler";
import pagination from "./pagination";
import compileBundle from "./svelte";

const watch = async (targets: Record<string, any>) => {
  const srcFiles = Object.keys(targets);
  if (srcFiles.length) {
    info(`:eyes: watching ${srcFiles.length} files for changes...`);
    srcFiles.forEach((srcPath) => {
      fs.watch(srcPath, async () => {
        info(`:keyboard:  changes on ${srcPath}`);
        const { config, slug, index } = targets[srcPath];
        const compiler = getCompiler(srcPath);
        const output = await compiler(srcPath, config, slug, index);
        if (config.sources && !output.index) await compileBundle(config);
        if (output.paginate) pagination(targets, config);
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
