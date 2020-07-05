import { compileOptions } from "@metablock/core";
import fs from "fs";
import { writeJson } from "fs-extra";
import mime from "mime-types";
import { basename, dirname, resolve } from "path";
import slugify from "slugify";
import { error, info } from "../log";

const production = process.env.NODE_ENV === "production";

// compile markdown files

const compileMarkdown = async (
  srcPath: string,
  config: Record<string, any>,
  index = false
): Promise<Record<string, any> | undefined> => {
  const text = fs.readFileSync(srcPath, { encoding: "utf-8" });
  const bits = text.split("---");
  try {
    const json = compileOptions(bits[0]);
    if (production && json.private) return;
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
  json.paginate = config.package ? json.index : true;
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
  await writeJson(outPath, json, options);
  return { ...json, outputDir, outPath, srcPath };
};

export default compileMarkdown;
