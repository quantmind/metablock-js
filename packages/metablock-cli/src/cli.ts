import colors from "colors";
import { Command } from "commander";
import emoji from "node-emoji";
import safe from "./safe";
import ship from "./ship";

const safeShip = safe(ship);

const log = (msg: string) => {
  console.log(colors.green(emoji.emojify(msg)));
};

const error = (msg: string) => {
  console.log(colors.red(emoji.emojify(msg)));
  process.exit(1);
};

const createClient = () => {
  const program = new Command();
  program.arguments("[cmd]").action((cmd) => program.help());

  program
    .command("ship")
    .description("ship a new bundle for your block to metablock CDN")
    .option("--bundle <bundle>", "Bundle location (default is ./dist)")
    .option(
      "--block <block>",
      "Meta block ID to override the METABLOCK_SERVICE_ID env variable"
    )
    .option(
      "--token <token>",
      "Meta block authentication token to override the METABLOCK_API_TOKEN env variable"
    )
    .action((options) =>
      safeShip({
        bundle: options.bundle,
        block: options.block,
        token: options.token,
        log,
        error,
      })
    );

  return program;
};

export default createClient;
