import nodeResolve from "@rollup/plugin-node-resolve";
import fs from "fs";
import { resolve } from "path";
import { info } from "../log";
import { contentType } from "./compiler";

const svelte = require("rollup-plugin-svelte");
const rollup = require("rollup");
const compileContentTypes = new Set([
  "application/javascript",
  "application/svelte",
]);
//
// Compile bundles with svelte support
const compileBundle = async (
  config: Record<string, any>,
  sourceFile?: string
) => {
  if (sourceFile) {
    if (!compileContentTypes.has(contentType(sourceFile))) return;
    if (config.js_compiled && config.js_compiled.has(sourceFile)) return;
  }
  const fileName = config.js_source.trim();
  const srcPath = resolve(config.sourceDir, fileName);

  const bundle = await rollup.rollup({
    input: srcPath,
    plugins: [
      svelte({
        include: `${config.sourceDir}/*.svelte`,
      }),
      nodeResolve(),
    ],
  });
  const outPath = resolve(config.sourceDir, `compiled.${fileName}`);
  //
  const { output } = await bundle.generate({
    sourcemap: true,
    format: "es",
  });
  config.js_compiled = new Set();
  output.forEach((out: any) => {
    const target =
      out.facadeModuleId === srcPath ? outPath : out.facadeModuleId;
    config.js_compiled.add(target);
    fs.writeFileSync(target, out.code);
    info(`:tada: written javascript compiled file ${target}`);
  });
};

export default compileBundle;
