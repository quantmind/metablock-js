import archiver from "archiver";
import child from "child_process";
import fs from "fs";
import prettyBytes from "pretty-bytes";
import request from "request";
import settings from "./settings";

const passthrough = () => undefined;

interface UploadOptions {
  bundle: string;
  block: string;
  token: string;
  log: (msg: string) => void;
  error: (msg: string) => void;
}

const uploadOptions = {
  bundle: settings.BUNDLE_LOCATION,
  block: settings.METABLOCK_SERVICE_ID,
  token: settings.METABLOCK_API_TOKEN,
  log: passthrough,
  error: passthrough,
};

const ship = (options: any) => {
  const opts: UploadOptions = { ...uploadOptions, ...options };
  const sha = child.execSync("git rev-parse HEAD").toString().trim();
  const loc = opts.bundle;
  if (fs.existsSync(loc)) {
    const stats = fs.lstatSync(loc);
    if (!stats.isDirectory)
      throw new Error(`${loc} is not a directory cannot upload bundle`);
  } else {
    throw new Error(`${loc} directory does not exist!`);
  }
  const fileName = `${sha}.zip`;
  const fullPath = process.env.PWD + `/${fileName}`;
  opts.log(`:rocket: create ${fullPath} archive from ${loc}`);
  const output = fs.createWriteStream(fullPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  output.on("close", () => {
    opts.log(
      `:rocket: bundle of ${prettyBytes(archive.pointer())} is ready to ship!`
    );
    post(sha, fullPath, opts);
  });
  archive.pipe(output);
  archive.directory(loc, false);
  archive.finalize();
};

const post = (sha: string, fullPath: string, opts: UploadOptions) => {
  const formData = { name: sha, bundle: fs.createReadStream(fullPath) };
  const url = `${settings.METABLOCK_API_URL}/v1/services/${opts.block}/deployments`;
  const headers = { "x-metablock-api-key": opts.token };
  opts.log(`:rocket: shipping to ${url}`);
  request.post(
    { url, formData, headers },
    (err: any, httpResponse: any, body: any) => {
      if (err) opts.error(`upload failed: ${err}`);
      const response = JSON.stringify(JSON.parse(body), null, 1);
      if (httpResponse.statusCode === 201) {
        opts.log(`:tada: upload successful!\n${response}`);
      } else {
        opts.error(
          `:broken_heart: upload failed with status ${httpResponse.statusCode}\n${response}`
        );
      }
    }
  );
};

export default ship;
