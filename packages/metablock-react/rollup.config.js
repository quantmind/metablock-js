import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-router-dom": "ReactRouterDOM",
  "react-helmet": "ReactHelmet",
};
const externals = ["clsx", "history", "@metablock/core", "@metablock/store"];

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
    input: pkg.types,
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
  },
  {
    input: pkg.types,
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
  },
];

export default config;
