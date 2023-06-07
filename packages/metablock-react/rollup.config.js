import autoExternal from "rollup-plugin-auto-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

console.info("Build @metablock/react");

const external = ["tslib"];
const globals = { tslib: "tslib", "d3-time-format": "d3" };

const plugins = [
  autoExternal(),
  typescript({
    typescript: require("typescript"),
  }),
];

const onwarn = (warning, warn) => {
  if (
    warning.code === "UNRESOLVED_IMPORT" &&
    warning.exporter.substring(0, 5) === "@mui/"
  )
    return;
  warn(warning);
};

export default {
  input: "src/index.ts",
  onwarn,
  output: [
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      generatedCode: "es2015",
      globals,
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      generatedCode: "es2015",
      globals,
    },
  ],
  external,
  plugins,
  watch: {
    clearScreen: false,
  },
};
