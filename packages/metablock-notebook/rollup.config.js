import autoExternal from "rollup-plugin-auto-external";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

console.info("Build @metablock/notebook");

const globals = { tslib: "tslib" };

const external = Object.keys(globals);

const plugins = [
  autoExternal(),
  sourcemaps(),
  typescript({
    typescript: require("typescript"),
  }),
];

export default {
  input: "src/index.ts",
  output: {
    file: pkg.main,
    format: "umd",
    name: "metablock",
    sourcemap: true,
    globals,
  },
  external,
  plugins,
  watch: {
    clearScreen: false,
  },
};
