import autoExternal from "rollup-plugin-auto-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

//const externals = ["tslib", "clsx", "history"];

const plugins = [
  autoExternal(),
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
    },
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
    },
    plugins,
    watch: {
      clearScreen: false,
    },
  },
];
