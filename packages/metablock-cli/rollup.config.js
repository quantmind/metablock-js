import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const globals = {};
const external = ["tslib"].concat(Object.keys(pkg.dependencies));

const plugins = [
  resolve(),
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
