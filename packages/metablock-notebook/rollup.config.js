import resolve from "@rollup/plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const globals = {};
const externals = ["tslib"];

const external = Object.keys(globals).concat(externals);

const plugins = [
  resolve(),
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
