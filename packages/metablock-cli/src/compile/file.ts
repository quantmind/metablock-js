import { compileOptions } from "@metablock/core";
import fs from "fs";
import { writeJson } from "fs-extra";
import mime from "mime-types";
import { basename, resolve } from "path";
import slugify from "slugify";
import { error, info } from "../log";

const compileFile = async (
  srcPath: string,
  config: Record<string, any>,
  name?: string,
  index?: boolean
): Promise<Record<string, any> | undefined> => {
  const text = fs.readFileSync(srcPath, { encoding: "utf-8" });
  const bits = text.split("---");
  try {
    const json = compileOptions(bits[0]);
    if (index) json.index = true;
    json.contentType = mime.lookup(srcPath);
    json.body = bits.slice(1).join("---").trim();
    const data = await write(json, srcPath, config, name);
    info(`:tada: created JSON file ${data.outPath}`);
    return data;
  } catch (exc) {
    error(exc);
  }
};

export const copyFile = async (
  srcPath: string,
  config: Record<string, any>
) => {
  const fileName = basename(srcPath);
  const outPath = resolve(config.output, fileName);
  fs.mkdirSync(config.output, { recursive: true });
  fs.copyFileSync(srcPath, outPath);
  const contentType = mime.lookup(srcPath);
  info(`:tada: copied ${contentType} file to ${outPath}`);
  return {
    contentType,
    paginate: false,
    outPath,
    srcPath,
  };
};

const write = async (
  json: any,
  srcPath: string,
  config: Record<string, any>,
  name?: string
): Promise<Record<string, any>> => {
  const bits = basename(srcPath).split(".");
  name = name ? name : bits.slice(0, bits.length - 1).join(".");
  json.slug = json.slug || slugify(name);
  json.paginate = config.paginate === false ? false : true;
  fs.mkdirSync(config.output, { recursive: true });
  const outPath = resolve(config.output, `${json.slug}.json`);
  await writeJson(outPath, json);
  return { ...json, outPath, srcPath };
};

export default compileFile;
