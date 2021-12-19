import { exec } from "child-process-promise";
import logger from "console";
import { getPackagePath, getPackages } from "./version";

const publishCommand = "npm publish --access public";
const command = [
  "echo '//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}' > .npmrc",
  publishCommand,
  "rm .npmrc",
].join(" && ");

export const publish = async () => {
  const dirs = getPackages();
  for (let i = 0; i < dirs.length; ++i) {
    const packagePath = getPackagePath(dirs[i]);
    logger.log(`   ${publishCommand} ${packagePath}`);
    await exec(command, { cwd: packagePath });
  }
};
