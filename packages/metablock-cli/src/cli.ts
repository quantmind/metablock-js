import { Command } from "commander";
import fetch from "cross-fetch";
import FormData from "form-data";
import { compile } from "./compile";
import safe from "./safe";
import ship from "./ship";

global.fetch = fetch as any;
global.FormData = FormData as any;

const safeShip = safe(ship);

const createClient = () => {
  const program = new Command();
  program.arguments("[cmd]").action((cmd) => program.help());

  program
    .command("ship")
    .description("ship a new bundle for your block to metablock CDN")
    .option("--bundle <bundle>", "Bundle location (default is ./dist)")
    .option(
      "--block <block>",
      "Meta block ID to override the METABLOCK_BLOCK_ID env variable"
    )
    .option(
      "--token <token>",
      "Meta block authentication token to override the METABLOCK_API_TOKEN env variable"
    )
    .option(
      "--env <env>",
      "Metablock environment to override the METABLOCK_ENV env variable"
    )
    .action(safeShip);

  program
    .command("compile [source]")
    .description("compile markdown files into JSON data files")
    .option("-w, --watch", "Watch files for changes and recompile them")
    .option("-v, --verbose", "Log as much as possible")
    .action(compile);

  return program;
};

export default createClient;
