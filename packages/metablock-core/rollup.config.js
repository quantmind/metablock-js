import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import getBanner from "../../scripts/banner.js";
import pkg from "./package.json";

console.info("Build @metablock/core");

const banner = getBanner(pkg);
const globals = { tslib: "tslib" };
const external = ["tslib"];

console.log(banner);

const config = (prod) => {
  const plugins = [
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
