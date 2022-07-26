import mb from "@metablock/core";
import { timeFormat } from "d3-time-format";
import fs from "fs";
import fse from "fs-extra";
import mime from "mime-types";
import { basename, dirname, resolve } from "path";
import slugify from "slugify";
import { error, info } from "../log";
import { production } from "./settings";

// compile markdown files
const formatDate = timeFormat("%B %d, %Y");

const compileMarkdown = async (
  srcPath: string,
  config: Record<string, any>,
  index = false
): Promise<Record<string, any> | undefined> => {
  const text = fs.readFileSync(srcPath, { encoding: "utf-8" });
  const bits = text.split("---");
  try {
    const json = mb.compileOptions(bits[0]);
    if (production && json.private) return;
    if (json.date) json.date = formatDate(new Date(json.date));
    json.index = index;
    json.contentType = mime.lookup(srcPath);
    json.body = bits.slice(1).join("---").trim();
    const data = await write(srcPath, config, json);
    info(`:tada: written JSON file ${data.outPath}`);
    return data;
  } catch (exc) {
    error(exc);
  }
};

const write = async (
  srcPath: string,
  config: Record<string, any>,
  json: any
): Promise<Record<string, any>> => {
  let outputDir = config.outputDir;
  let name = basename(srcPath);
  if (json.index) {
    outputDir = dirname(outputDir);
    name = basename(dirname(srcPath));
  } else {
    const bits = name.split(".");
    name = bits.slice(0, bits.length - 1).join(".");
  }
  json.slug = json.slug || slugify(name);
  if (json.paginate !== false)
    json.paginate = config.content ? !json.index : false;
  //
  // modify config when a markdown index file (in a directory)
  if (json.index) {
    config.outputDir = resolve(outputDir, json.slug);
    config.js_source = json.js_source;
  }
  // info(JSON.stringify(json, null, 2));
  fs.mkdirSync(outputDir, { recursive: true });
  const outPath = resolve(outputDir, `${json.slug}.json`);
  const options = production ? {} : { spaces: 2 };
  await fse.writeJson(outPath, json, options);
  return { ...json, outputDir, outPath, srcPath };
};

export default compileMarkdown;
