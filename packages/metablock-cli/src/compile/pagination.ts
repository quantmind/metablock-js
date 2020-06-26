import { writeJson } from "fs-extra";
import { resolve } from "path";
import { log } from "../log";

const pagination = async (
  entries: Record<string, any>,
  config: Record<string, any>
) => {
  const targets = Object.keys(entries)
    .map((key) => entries[key])
    .filter((entry) => entry.source === config.source && entry.config.index);
  targets.sort((a: any, b: any) => (a.date > b.date ? 1 : 0));
  const index = targets.map((entry) => ({
    title: entry.title,
    author: entry.author,
    date: entry.date.toString(),
    image: entry.indexImage || entry.image,
    description: entry.description,
  }));
  const file = resolve(config.output, `index.json`);
  writeJson(file, index);
  log(`:package: written index ${file}`);
};

export default pagination;
