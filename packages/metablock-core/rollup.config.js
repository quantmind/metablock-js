import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const globals = {
  tslib: "tslib",
};

const banner = `// ${pkg.name} v${
  pkg.version
} Copyright ${new Date().getFullYear()} ${pkg.author} - ${pkg.homepage}`;
const external = ["tslib"];

const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
];

if (process.env.NODE_ENV === "production")
  plugins.push(terser({ output: { preamble: banner } }));

export default {
  input: "src/index.ts",
  output: {
    file: pkg.main,
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
