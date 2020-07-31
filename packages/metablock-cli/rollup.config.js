import autoExternal from "rollup-plugin-auto-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

console.info("Build @metablock/cli");

const globals = { tslib: "tslib" };
const external = ["tslib"];

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
    // format: "es",
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
