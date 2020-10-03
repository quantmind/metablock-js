import chalk from "chalk";
import { exec } from "child-process-promise";
import logger from "console";
import { getPackagePath, getPackages, updateVersion } from "./version";

export const publish = async () => {
  const dirs = getPackages();
  await updateVersion();
  for (let i = 0; i < dirs.length; ++i) {
    const packagePath = getPackagePath(dirs[i]);
    logger.log(chalk.green(`   npm publish --access public ${packagePath}`));
    await exec("npm publish --access public", { cwd: packagePath });
  }
};
