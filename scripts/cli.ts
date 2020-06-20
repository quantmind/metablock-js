#!/usr/bin/env node
import { Command } from "commander";
import { version } from "../package.json";
import { publish } from "./publish";
import { updateVersion } from "./version";

const program = new Command();
program.version(version);
program.arguments("[cmd]").action((cmd) => program.help());

program
  .command("update")
  .description("Update version of packages")
  .action(() => updateVersion());

program
  .command("publish")
  .description("Publish to npm")
  .action(() => publish());

program.parse(process.argv);
