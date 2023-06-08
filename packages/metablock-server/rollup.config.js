import autoExternal from "rollup-plugin-auto-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

console.info("Build @metablock/server");

const globals = { tslib: "tslib" };
const external = ["tslib", "perf_hooks"];

const plugins = [
  autoExternal(),
  typescript({
    typescript: require("typescript"),
  }),
];

export default {
  input: "src/index.ts",
  output: {
    file: pkg.main,
    format: "cjs",
    generatedCode: "es2015",
    globals,
  },
  external,
  plugins,
  watch: {
    clearScreen: false,
  },
};
