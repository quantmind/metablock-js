import fs from "fs";
import { readJson } from "fs-extra";
import { basename, resolve } from "path";
import { warning } from "../log";
import pagination from "./pagination";
import watch, { getCompiler } from "./watch";

const configName = "collection.json";
const indexFile = "index.md";

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
  if (options.watch) await watch(targets);
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
      await compileContent(fullPath, config, targets);
    } else if (fs.lstatSync(fullPath).isDirectory()) {
      // recursive call
      const extra = await compilePath(fullPath, options, config);
      targets = { ...targets, ...extra };
    }
  }
  await pagination(targets, config);
  return targets;
};

const compileContent = async (
  fullPath: string,
  config: Record<string, any>,
  targets: Record<string, any>
) => {
  // the fullPath can either be a file or a directory
  if (fs.lstatSync(fullPath).isDirectory()) {
    const index = resolve(fullPath, indexFile);
    const compiler = getCompiler(index);
    if (fs.existsSync(index) && compiler) {
      const json = await compiler(index, config, basename(fullPath), true);
      add(targets, config, json);
      const newConfig = {
        ...config,
        paginate: false,
        output: resolve(config.output, json.slug),
      };
      await compileContentDir(fullPath, newConfig, targets);
    } else {
      warning(
        `path ${fullPath} is a content directory without a ${indexFile} file, skipping.`
      );
    }
  } else {
    const compiler = getCompiler(fullPath);
    if (compiler) add(targets, config, await compiler(fullPath, config));
  }
};

const compileContentDir = async (
  dirPath: string,
  config: Record<string, any>,
  targets: Record<string, any>
) => {
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; ++i) {
    const name = files[i];
    if (name === indexFile) continue;
    const fullPath = resolve(dirPath, name);
    if (fs.lstatSync(fullPath).isDirectory()) {
      warning(
        `path ${fullPath} is a nested content directory and it is not supported, skipping.`
      );
      continue;
    }
    const compiler = getCompiler(fullPath);
    if (compiler) add(targets, config, await compiler(fullPath, config));
  }
};

const add = (targets: Record<string, any>, config: any, json: any) => {
  if (json) targets[json.srcPath] = { ...json, config };
};

export default compile;
