import { readdirSync, readJson, writeJson } from "fs-extra";
import { join } from "path";

const rootDir = join(__dirname, "..");

const updateVersion = async (version: string) => {
  await Promise.all(
    readdirSync(join(rootDir, "packages"))
      .filter((dir) => dir.substring(0, 10) === "metablock-")
      .map(async (dir: string) => {
        const packagePath = join(rootDir, "packages", dir, "package.json");
        const packageJSON = await readJson(packagePath);
        packageJSON.version = version;
        await writeJson(packagePath, packageJSON, { spaces: 2 });
      })
  );
};

export default updateVersion;
