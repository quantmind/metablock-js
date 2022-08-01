import fs from "fs";
import fse from "fs-extra";
import { basename, resolve } from "path";
import { warning } from "../log";
import getCompiler from "./compiler";
import { Config, Entry } from "./interfaces";
import pagination from "./pagination";
import compileBundle from "./svelte";
import watch from "./watch";

const configName = "collection.json";
const indexFile = "index.md";

//
// Main entrypoint for compiling a repository with content
const compile = async (
  source: string | undefined,
  options: Record<string, any>
) => {
  const sourceDir = resolve(source || ".");
  if (fs.existsSync(sourceDir)) {
    const stats = fs.lstatSync(sourceDir);
    if (!stats.isDirectory())
      throw new Error(`${source} is not a directory cannot compile`);
  } else {
    throw new Error(`${source} directory does not exist!`);
  }
  const targets = {};
  await compileDirectory(sourceDir, options, {}, targets);
  if (options.watch) await watch(targets);
};

//
// Compile a directory and return a config object if the directory marked as content
// To mark a directory as content add a collection.json with "content": true.
//
//  - sourceDir: absolute path to the directory containing the source files
//  - outputDir: absolute path to the directory containing the output files
//  - indexDir: absolute path to the directory containing the index.json file (usually same as outputDir)
//  - content: this should be true (only when this is true a directory is processed)
const compileDirectory = async (
  sourceDir: string,
  options: Record<string, any>,
  prevConfig: Record<string, any>,
  targets: Record<string, Entry>
) => {
  const configPath = resolve(sourceDir, configName);
  const config: Config = fs.existsSync(configPath)
    ? await fse.readJson(configPath)
    : {};
  let path = config.path || "";
  if (!prevConfig.outputDir)
    config.outputDir = resolve(config.outputDir || "dist");
  else {
    path = config.path || basename(sourceDir);
    config.outputDir = resolve(prevConfig.outputDir, path);
  }
  config.indexDir = config.outputDir;
  config.sourceDir = sourceDir;
  config.path = path;
  config.slug = config.slug || ["slug"];

  const files = fs.readdirSync(sourceDir);
  for (let i = 0; i < files.length; ++i) {
    const name = files[i];
    if (config.skip && config.skip.indexOf(name) > -1) continue;
    const sourcePath = resolve(sourceDir, name);
    if (options.verbose) console.debug(sourcePath);
    if (config.content) {
      await compileContent(sourcePath, config, targets);
    } else if (fs.lstatSync(sourcePath).isDirectory()) {
      // recursive call
      await compileDirectory(sourcePath, options, config, targets);
    }
  }
  if (config.content && config.paginate)
    await pagination(targets, config.outputDir);
};

const compileContent = async (
  sourcePath: string,
  config: Config,
  targets: Record<string, Entry>
) => {
  // the fullPath can either be a file or a directory
  if (fs.lstatSync(sourcePath).isDirectory())
    await compileContentDir(sourcePath, config, targets);
  else {
    const compiler = getCompiler(sourcePath);
    if (compiler) {
      const output = await compiler(sourcePath, config);
      if (output) targets[sourcePath] = { ...output, config };
    } else warning(`Unsupported file type ${sourcePath}`);
  }
};

// Compile a content directory
const compileContentDir = async (
  dirPath: string,
  prevConfig: Config,
  targets: Record<string, Entry>
) => {
  const index = resolve(dirPath, indexFile);
  const compiler = getCompiler(index);
  if (!(fs.existsSync(index) && compiler)) {
    warning(
      `path ${dirPath} is a content directory without a ${indexFile} file, skipping.`
    );
    return;
  }
  const config: Config = {
    ...prevConfig,
    sourceDir: dirPath,
    outputDir: resolve(prevConfig.outputDir, basename(dirPath)),
  };
  const output = await compiler(index, config, true);
  if (!output) return;
  targets[dirPath] = { ...output, config };
  if (config.js_source) {
    await compileBundle(config, resolve(config.sourceDir, config.js_source));
  }

  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; ++i) {
    const name = files[i];
    if (name === indexFile) continue;
    const sourcePath = resolve(config.sourceDir, name);
    if (fs.lstatSync(sourcePath).isDirectory()) {
      warning(
        `path ${sourcePath} is a nested content directory and it is not supported, skipping.`
      );
      continue;
    }
    const compiler = getCompiler(sourcePath);
    if (compiler) await compiler(sourcePath, config);
    else warning(`Unsupported file type ${sourcePath}`);
  }
};

export default compile;
