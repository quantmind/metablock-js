import { compileOptions } from "@metablock/core";
import fs from "fs";
import { writeJson } from "fs-extra";
import mime from "mime-types";
import { basename, resolve } from "path";
import slugify from "slugify";
import { error, info } from "../log";

const production = process.env.NODE_ENV === "production";

const compileFile = async (
  srcPath: string,
  config: Record<string, any>,
  slug?: string,
  index?: boolean
): Promise<Record<string, any> | undefined> => {
  const text = fs.readFileSync(srcPath, { encoding: "utf-8" });
  const bits = text.split("---");
  try {
    const json = compileOptions(bits[0]);
    if (production && json.draft) return;
    if (index) json.index = true;
    json.contentType = mime.lookup(srcPath);
    json.body = bits.slice(1).join("---").trim();
    const data = await write(json, srcPath, config, slug);
    info(`:tada: written JSON file ${data.outPath}`);
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
  slug?: string
): Promise<Record<string, any>> => {
  const bits = basename(srcPath).split(".");
  slug = slug ? slug : bits.slice(0, bits.length - 1).join(".");
  json.slug = json.slug || slugify(slug);
  json.paginate = config.paginate === false ? false : true;
  info(JSON.stringify(json, null, 2));
  fs.mkdirSync(config.output, { recursive: true });
  const outPath = resolve(config.output, `${json.slug}.json`);
  const options = production ? {} : { spaces: 2 };
  await writeJson(outPath, json, options);
  return { ...json, outPath, srcPath };
};

export default compileFile;
