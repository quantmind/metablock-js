import fs from "fs";
import { writeJson } from "fs-extra";
import mime from "mime-types";
import { basename, dirname, resolve } from "path";
import { err, log } from "../log";

const compileFile = async (
  filePath: string,
  config: Record<string, any>
): Promise<Record<string, any> | undefined> => {
  const text = fs.readFileSync(filePath, { encoding: "utf-8" });
  const bits = text.split("---");
  try {
    const json = compileHeaders(bits[0]);
    json.contentType = mime.lookup(filePath);
    json.body = bits.slice(1).join("---");
    const data = await write(json, filePath, config);
    log(`:tada: created JSON file ${data.fullPath}`);
    return data;
  } catch (exc) {
    err(exc);
  }
};

const compileHeaders = (text: string): Record<string, any> => {
  return text
    .split("\n")
    .filter((text) => text.length > 0)
    .reduce(
      (headers: Record<string, any>, header: string) => ({
        ...headers,
        ...compileHeader(header),
      }),
      {}
    );
};

const compileHeader = (text: string): Record<string, any> => {
  const bits = text.split(":");
  const name = bits[0].trim();
  if (!name || bits.length < 2) throw new Error(`Bad header ${text}`);
  return { [name]: bits.slice(1).join(":").trim() };
};

const write = async (
  json: any,
  filePath: string,
  config: Record<string, any>
): Promise<Record<string, any>> => {
  const pathBits = (config.path || "slug").split("/");
  const date = new Date(json.date);
  const bits = basename(filePath).split(".");
  const name = bits.slice(0, bits.length - 1).join(".");
  const slug = json.slug || name;
  const values: Record<string, string> = {
    yyyy: "" + date.getFullYear(),
    mm: "" + date.getMonth(),
    slug,
  };
  const fullPath =
    resolve(config.output, ...pathBits.map((bit: string) => values[bit])) +
    ".json";
  fs.mkdirSync(dirname(fullPath), { recursive: true });
  await writeJson(fullPath, json);
  return { ...json, date, fullPath };
};

export default compileFile;
