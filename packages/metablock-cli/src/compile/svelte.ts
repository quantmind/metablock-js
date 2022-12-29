import nodeResolve from "@rollup/plugin-node-resolve";
import fs from "fs";
import { resolve } from "path";
import { rollup } from "rollup";
import svelte from "rollup-plugin-svelte";
import { error, info } from "../log";
import { contentType } from "./compiler";

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
  const output = await safeRollup(srcPath, config);
  if (!output) return;
  const outPath = resolve(config.sourceDir, `compiled.${fileName}`);
  config.js_compiled = new Set();
  output.forEach((out: any) => {
    if (out.code) {
      const target =
        out.facadeModuleId === srcPath ? outPath : out.facadeModuleId;
      config.js_compiled.add(target);
      fs.writeFileSync(target, out.code);
      info(`:blue_heart: written javascript compiled file ${target}`);
    }
  });
};

const safeRollup = async (
  srcPath: string,
  config: Record<string, any>
): Promise<any[] | null> => {
  try {
    const bundle = await rollup({
      input: srcPath,
      plugins: [
        svelte({
          include: `${config.sourceDir}/*.svelte`,
          emitCss: false,
        }),
        nodeResolve(),
      ],
    });
    //
    const { output } = await bundle.generate({
      sourcemap: true,
      format: "es",
    });
    return output;
  } catch (exc) {
    error(exc);
    return null;
  }
};
export default compileBundle;
