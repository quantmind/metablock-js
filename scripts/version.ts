import { readJson, writeJson } from "fs-extra";
import { join } from "path";

const rootDir = join(__dirname, "..");

export const getPackagePath = (dir: string) => join(rootDir, "packages", dir);

export const getPackages = (): string[] => [
  "metablock-notebook",
  "metablock-core",
  "metablock-cli",
  "metablock-server",
  "metablock-store",
  "metablock-react",
  "metablock-cms",
];

export const updateVersion = async () => {
  const main = await readJson(join(rootDir, "package.json"));
  const dirs = getPackages();
  const packages: string[] = dirs.map((dir) => `@${dir.replace("-", "/")}`);
  await Promise.all(
    dirs.map(async (dir: string) => {
      const packagePath = join(getPackagePath(dir), "package.json");
      const packageJSON = await readJson(packagePath);
      packageJSON.homepage = main.homepage;
      packageJSON.version = main.version;
      packageJSON.license = main.license;
      const { dependencies } = packageJSON;
      packages.forEach((pkg) => {
        if (dependencies && dependencies[pkg]) dependencies[pkg] = main.version;
      });
      await writeJson(packagePath, packageJSON, { spaces: 2 });
    })
  );
};

export const devVersion = async () => {
  const dirs = getPackages();
  const packages: string[] = dirs.map((dir) => `@${dir.replace("-", "/")}`);
  await Promise.all(
    dirs.map(async (dir: string) => {
      const packagePath = join(getPackagePath(dir), "package.json");
      const packageJSON = await readJson(packagePath);
      const { dependencies } = packageJSON;
      packages.forEach((pkg) => {
        if (dependencies && dependencies[pkg])
          dependencies[pkg] = pkg.replace("/", "-").replace("@", "./packages/");
      });
      await writeJson(packagePath, packageJSON, { spaces: 2 });
    })
  );
};
