import fs from "fs";
import { readJson } from "fs-extra";
import { basename, resolve } from "path";
import { warning } from "../log";
import getCompiler from "./compiler";
import pagination from "./pagination";
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
  const targets = await compileDirectory(sourceDir, options, {});
  if (options.watch) await watch(targets);
};

//
// Compile a directory and return a config object if the directory marked as content
// To marke a directory as content add a collection.json with "content": true.
//
//  - sourceDir: absolute path to the directory containing the source files
//  - outputDir: absolute path to the directory containing the output files
//  - indexDir: absolute path to the directory containing the index.json file (usually same as outputDir)
//  - content: this should be true (only when this is true a directory is processed)
//  - package: when true the content is a package directory
const compileDirectory = async (
  sourceDir: string,
  options: Record<string, any>,
  prevConfig: Record<string, any>
): Promise<Record<string, any>> => {
  const configPath = resolve(sourceDir, configName);
  const config: Record<string, any> = fs.existsSync(configPath)
    ? await readJson(configPath)
    : {};
  let targets: Record<string, any> = {};
  if (!prevConfig.output)
    config.outputDir = resolve(config.outputDir || "dist");
  else config.outputDir = resolve(prevConfig.output, basename(sourceDir));
  config.indexDir = config.outputDir;
  config.sourceDir = sourceDir;

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
      const extra = await compileDirectory(sourcePath, options, config);
      targets = { ...targets, ...extra };
    }
  }
  if (config.content) await pagination(targets, config.outputDir);
  return targets;
};

const compileContent = async (
  sourcePath: string,
  config: Record<string, any>,
  targets: Record<string, any>
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

const compileContentDir = async (
  dirPath: string,
  prevConfig: Record<string, any>,
  targets: Record<string, any>
) => {
  const index = resolve(dirPath, indexFile);
  const compiler = getCompiler(index);
  if (!(fs.existsSync(index) && compiler)) {
    warning(
      `path ${dirPath} is a content directory without a ${indexFile} file, skipping.`
    );
    return;
  }
  const config: any = {
    ...prevConfig,
    sourceDir: dirPath,
    outputDir: resolve(prevConfig.outputDir, basename(dirPath)),
    package: true,
  };
  const output = await compiler(index, config, true);
  if (!output) return;
  targets[dirPath] = { ...output, config };

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
