import { writeJson } from "fs-extra";
import { resolve } from "path";
import { info } from "../log";

const pagination = async (entries: Record<string, any>, outputDir: string) => {
  const targets = Object.keys(entries)
    .map((key) => entries[key])
    .filter(
      (entry) =>
        entry.config.paginate &&
        entry.paginate &&
        entry.config.indexDir === outputDir
    );
  if (targets.length) {
    const index = targets.map((entry) => ({
      title: entry.title,
      author: entry.author,
      date: entry.date,
      image: entry.indexImage || entry.image,
      description: entry.description,
      slug: entry.slug,
    }));
    const file = resolve(outputDir, `index.json`);
    writeJson(file, index);
    info(`:package: written ${index.length} entries in the index ${file}`);
  }
};

export default pagination;
