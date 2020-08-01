import autoExternal from "rollup-plugin-auto-external";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import getBanner from "../../scripts/banner";

console.info("Build @metablock/notebook");

const banner = getBanner(pkg);
const globals = { tslib: "tslib", "d3-require": "d3" };
const external = Object.keys(globals);

const config = (prod) => {
  const plugins = [
    autoExternal(),
    sourcemaps(),
    typescript({
      typescript: require("typescript"),
    }),
  ];
  if (prod) plugins.push(terser({ output: { preamble: banner } }));
  return {
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
  };
};

export default [config(), config(true)];
