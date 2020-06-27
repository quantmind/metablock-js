import { writeJson } from "fs-extra";
import { resolve } from "path";
import { log } from "../log";

const pagination = async (
  entries: Record<string, any>,
  config: Record<string, any>
) => {
  if (!config.content || !config.index) return;
  const targets = Object.keys(entries)
    .map((key) => entries[key])
    .filter((entry) => entry.source === config.source && entry.config.index);
  const index = targets.map((entry) => ({
    title: entry.title,
    author: entry.author,
    image: entry.indexImage || entry.image,
    description: entry.description,
    slug: entry.slug,
  }));
  const file = resolve(config.output, `index.json`);
  writeJson(file, index);
  log(`:package: written index ${file}`);
};

export default pagination;
