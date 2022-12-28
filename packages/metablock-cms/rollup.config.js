import autoExternal from "rollup-plugin-auto-external";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

console.info("Build @metablock/cms");

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDOM",
  "react-helmet": "ReactHelmet",
  "@metablock/core": "metablock",
  "@metablock/store": "metablock",
  "@metablock/react": "metablock",
  "d3-time-format": "d3",
};
const external = ["tslib"];

const plugins = [
  autoExternal(),
  sourcemaps(),
  typescript({
    typescript: require("typescript"),
  }),
];

function onwarn(warning, warn) {
  if (
    warning.code === "UNRESOLVED_IMPORT" &&
    warning.exporter.substring(0, 5) === "@mui/"
  )
    return;
  warn(warning);
}

export default {
  input: "src/index.ts",
  plugins,
  onwarn,
  output: {
    file: pkg.main,
    format: "cjs",
    name: "MetablockCms",
    sourcemap: true,
    globals,
  },
  external,
  watch: {
    clearScreen: false,
  },
};
