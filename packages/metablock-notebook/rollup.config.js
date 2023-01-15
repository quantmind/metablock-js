import { nodeResolve } from "@rollup/plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import getBanner from "../../scripts/banner";
import pkg from "./package.json";

console.info("Build @metablock/notebook");

const banner = getBanner(pkg);
const globals = { tslib: "tslib", "d3-require": "d3" };
const external = Object.keys({ tslib: "tslib" });

const config = (prod) => {
  const plugins = [
    sourcemaps(),
    nodeResolve(),
    typescript({
      typescript: require("typescript"),
    }),
  ];
  if (prod) plugins.push(terser({ output: { preamble: banner } }));
  return [
    {
      input: "src/index.ts",
      output: {
        file: prod ? pkg.main : pkg.main.replace(".min.", "."),
        format: "umd",
        name: "metablock",
        sourcemap: true,
        banner,
        globals,
      },
      external,
      plugins,
      watch: {
        clearScreen: false,
      },
    },
    {
      input: "src/index.ts",
      output: {
        file: pkg.module,
        format: "esm",
        name: "metablock",
        sourcemap: true,
        globals,
      },
      external,
      plugins,
      watch: {
        clearScreen: false,
      },
    },
  ];
};

export default config();
