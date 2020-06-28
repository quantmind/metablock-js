import fs from "fs";
import { readJson } from "fs-extra";
import mime from "mime-types";
import { basename, resolve } from "path";
import compileFile from "./file";
import pagination from "./pagination";

const configName = "collection.json";
const contents = new Set(["text/markdown"]);

const compile = async (
  source: string | undefined,
  options: Record<string, any>
) => {
  source = resolve(source || ".");
  if (fs.existsSync(source)) {
    const stats = fs.lstatSync(source);
    if (!stats.isDirectory())
      throw new Error(`${source} is not a directory cannot compile`);
  } else {
    throw new Error(`${source} directory does not exist!`);
  }
  const targets = await compilePath(source, options, {});
  if (options.watch) {
    const files = Object.keys(targets);
    if (files.length) {
      console.log(`Watch ${files.length} files for changes...`);
      files.forEach((filePath) => {
        fs.watch(filePath, async () => {
          console.log(`changes on ${filePath}`);
          const config = targets[filePath].config;
          await compileFile(filePath, config);
          pagination(targets, config);
        });
      });
      let keepSleep = 1000;
      while (keepSleep > 0) {
        keepSleep = Math.ceil(1000 * Math.random() + 1000);
        await sleep(keepSleep);
      }
    }
  }
};

const compilePath = async (
  source: string,
  options: Record<string, any>,
  prevConfig: Record<string, any>
): Promise<Record<string, any>> => {
  const configPath = resolve(source, configName);
  const config: Record<string, any> = fs.existsSync(configPath)
    ? await readJson(configPath)
    : {};
  let targets: Record<string, any> = {};
  if (!prevConfig.output) config.output = resolve(config.output || "dist");
  else config.output = resolve(prevConfig.output, basename(source));
  config.source = source;

  const files = fs.readdirSync(source);
  for (let i = 0; i < files.length; ++i) {
    const name = files[i];
    if (config.skip && config.skip.indexOf(name) > -1) continue;
    const fullPath = resolve(source, name);
    if (options.verbose) console.debug(fullPath);
    if (config.content) {
      const data = await compileContent(fullPath, config);
      if (data) targets[fullPath] = { ...data, config };
    } else if (fs.lstatSync(fullPath).isDirectory()) {
      const extra = await compilePath(fullPath, options, config);
      targets = { ...targets, ...extra };
    }
  }
  await pagination(targets, config);
  return targets;
};

const compileContent = async (
  fullPath: string,
  config: Record<string, any>
): Promise<Record<string, any> | undefined> => {
  if (fs.lstatSync(fullPath).isDirectory()) {
    const index = resolve(fullPath, "index.md");
    if (fs.existsSync(index)) {
      fs.mkdirSync(config.output, { recursive: true });
      const data = await compileFile(index, config, basename(fullPath));
      return data;
    }
  } else {
    const type = mime.lookup(fullPath);
    if (type && contents.has(type)) {
      fs.mkdirSync(config.output, { recursive: true });
      return await compileFile(fullPath, config);
    }
  }
};

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default compile;
