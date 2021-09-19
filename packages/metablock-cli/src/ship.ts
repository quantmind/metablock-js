import { Metablock } from "@metablock/core";
import archiver from "archiver";
import fs from "fs";
import prettyBytes from "pretty-bytes";
import { info } from "./log";
import settings from "./settings";

const ship = async (options: any) => {
  const block = options.block || settings.METABLOCK_BLOCK_ID;
  const bundle = options.bundle || settings.BUNDLE_LOCATION;
  const token = options.token || settings.METABLOCK_API_TOKEN;
  const name = settings.GIT_SHA || "new-deployment";
  const env = options.env || settings.METABLOCK_ENV;
  if (fs.existsSync(bundle)) {
    const stats = fs.lstatSync(bundle);
    if (!stats.isDirectory)
      throw new Error(`${bundle} is not a directory cannot upload bundle`);
  } else {
    throw new Error(`${bundle} directory does not exist!`);
  }
  const fileName = `${name}.zip`;
  const fullPath = process.env.PWD + `/${fileName}`;
  info(`:package: creating ${fullPath} archive from ${bundle}`);
  const output = fs.createWriteStream(fullPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  const waiter = new Promise((resolve) => {
    output.on("close", () => {
      info(
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
  const cli = new Metablock({ baseUrl: settings.METABLOCK_API_URL });
  cli.token = token;
  const data: any = await waiter;
  const form = new FormData();
  form.append("env", env);
  form.append("name", name);
  form.append("bundle", data);
  info(`:rocket: shipping "${env}" deployment to block "${block}"`);
  try {
    const body = await cli.blocks.ship(block, form);
    const response = JSON.stringify(body, null, 1);
    info(`:tada: upload successful!\n${response}`);
  } catch (err: any) {
    const response = JSON.stringify(err.data, null, 1);
    throw new Error(`upload failed with status ${err.status}\n${response}`);
  }
};

export default ship;
