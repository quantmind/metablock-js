import nodeResolve from "@rollup/plugin-node-resolve";
import fs from "fs";
import { resolve } from "path";
import { info } from "../log";

const svelte = require("rollup-plugin-svelte");
const rollup = require("rollup");

const compileBundle = async (config: Record<string, any>) => {
  return await Promise.all(
    config.sources.split(",").map(async (source: string) => {
      const fileName = source.trim();
      const srcPath = resolve(config.output, fileName);

      const bundle = await rollup.rollup({
        input: srcPath,
        plugins: [
          svelte({
            include: `${config.output}/*.svelte`,
          }),
          nodeResolve(),
        ],
      });
      const outPath = resolve(config.output, `compiled.${fileName}`);
      //
      const { output } = await bundle.generate({
        sourcemap: true,
        format: "es",
      });
      output.forEach((out: any) => {
        const target =
          out.facadeModuleId === srcPath ? outPath : out.facadeModuleId;
        fs.writeFileSync(target, out.code);
        info(`:tada: written javascript compiled file ${target}`);
      });
    })
  );
};

export default compileBundle;
