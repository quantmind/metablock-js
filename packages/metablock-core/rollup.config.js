import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const globals = {};
const externals = ["debug", "query-string"];

const external = Object.keys(globals).concat(externals);

const plugins = [
  resolve(),
  typescript({
    typescript: require("typescript"),
  }),
];

const config = [
  {
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
  },
];

export default config;
