import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDOM",
  "react-helmet": "ReactHelmet",
  "@metablock/core": "metablock",
  "@metablock/store": "metablock",
};
const externals = ["tslib", "clsx", "history"];

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

export default [
  {
    input: "src/index.ts",
    onwarn,
    output: {
      file: pkg.main,
      format: "cjs",
      name: "MetablockReact",
      sourcemap: true,
      globals,
    },
    external,
    plugins,
    watch: {
      clearScreen: false,
    },
  },
  {
    input: "src/index.ts",
    onwarn,
    output: {
      file: pkg.module,
      format: "esm",
      name: "MetablockReact",
      sourcemap: true,
      globals,
    },
    external,
    plugins,
    watch: {
      clearScreen: false,
    },
  },
];
