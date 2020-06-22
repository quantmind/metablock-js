import { Metablock } from "@metablock/core";
import archiver from "archiver";
import child from "child_process";
import fs from "fs";
import prettyBytes from "pretty-bytes";
import log from "./log";
import settings from "./settings";

interface UploadOptions {
  bundle: string;
  block: string;
  token: string;
}

const uploadOptions = {
  bundle: settings.BUNDLE_LOCATION,
  block: settings.METABLOCK_BLOCK_ID,
  token: settings.METABLOCK_API_TOKEN,
};

const ship = async (options: any) => {
  const { bundle, block, token } = {
    ...uploadOptions,
    ...options,
  } as UploadOptions;
  const sha = child.execSync("git rev-parse HEAD").toString().trim();
  const env = options.env || settings.METABLOCK_ENV;
  if (fs.existsSync(bundle)) {
    const stats = fs.lstatSync(bundle);
    if (!stats.isDirectory)
      throw new Error(`${bundle} is not a directory cannot upload bundle`);
  } else {
    throw new Error(`${bundle} directory does not exist!`);
  }
  const fileName = `${sha}.zip`;
  const fullPath = process.env.PWD + `/${fileName}`;
  log(`:package: creating ${fullPath} archive from ${bundle}`);
  const output = fs.createWriteStream(fullPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  const waiter = new Promise((resolve) => {
    output.on("close", () => {
      log(
        `:heavy_check_mark:  bundle of ${prettyBytes(
          archive.pointer()
        )} is ready to ship!`
      );
      resolve(fs.createReadStream(fullPath));
    });
  });
  archive.pipe(output);
  archive.directory(bundle, false);
  archive.finalize();
  //
  const cli = new Metablock(settings.METABLOCK_API_URL);
  cli.token = token;
  const data: any = await waiter;
  const form = new FormData();
  form.append("env", env);
  form.append("name", sha);
  form.append("bundle", data);
  log(`:rocket: shipping "${env}" deployment to block "${block}"`);
  try {
    const body = await cli.blocks.ship(block, form);
    const response = JSON.stringify(body, null, 1);
    log(`:tada: upload successful!\n${response}`);
  } catch (err) {
    const response = JSON.stringify(err.data, null, 1);
    throw new Error(`upload failed with status ${err.status}\n${response}`);
  }
};

export default ship;
