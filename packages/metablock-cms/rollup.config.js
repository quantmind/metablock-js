import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDOM",
  "react-helmet": "ReactHelmet",
  "d3-time-format": "d3",
};
const externals = [
  "@metablock/core",
  "@metablock/store",
  "@metablock/react",
  "@loadable/coponent",
  "d3-time-format",
  "mobx",
];

const external = Object.keys(globals).concat(externals);

const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
];

function onwarn(warning, warn) {
  if (
    warning.code === "UNRESOLVED_IMPORT" &&
    warning.source.substring(0, 13) === "@material-ui/"
  )
    return;
  warn(warning);
}

const config = [
  {
    input: "src/index.ts",
    onwarn,
    output: {
      file: pkg.main,
      format: "cjs",
      name: "MetablockCms",
      sourcemap: true,
      globals,
    },
    external,
    plugins,
  },
  {
    input: "src/index.ts",
    onwarn,
    output: {
      file: pkg.module,
      format: "esm",
      name: "MetablockCms",
      sourcemap: true,
      globals,
    },
    external,
    plugins,
  },
];

export default config;
