import { exec } from "child-process-promise";
import logger from "console";
import { getPackagePath, getPackages } from "./version";

const publishCommand = "npm publish --access public";

export const publish = async () => {
  const dirs = getPackages();
  for (let i = 0; i < dirs.length; ++i) {
    const packagePath = getPackagePath(dirs[i]);
    logger.log(`   ${publishCommand} ${packagePath}`);
    await exec(publishCommand, { cwd: packagePath });
  }
};
