import fse from "fs-extra";
import { resolve } from "path";
import { info } from "../log";
import { production } from "./settings";

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
      order: entry.order,
      image: entry.indexImage || entry.image,
      description: entry.description,
      slug: entry.slug,
      private: entry.private || false,
    }));
    const file = resolve(outputDir, `index.json`);
    const options = production ? {} : { spaces: 2 };
    await fse.writeJson(file, index, options);
    info(`:package: written ${index.length} entries in the index ${file}`);
  }
};

export default pagination;
