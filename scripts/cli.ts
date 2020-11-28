#!/usr/bin/env node
import { Command } from "commander";
import process from "process";
import { version } from "../package.json";
import { publish } from "./publish";
import { devVersion, updateVersion } from "./version";

const program = new Command();
program.version(version);
program.arguments("[cmd]").action((cmd) => program.help());

const error = (e: any) => {
  process.exitCode = 1;
  console.error(e.message || e);
};

program
  .command("dev")
  .description("Set dev dependencies - for development")
  .action(() => devVersion().catch(error));

program
  .command("update")
  .description("Update version of packages")
  .action(() => updateVersion().catch(error));

program
  .command("publish")
  .description("Publish to npm")
  .action(() => publish().catch(error));

program.parse(process.argv);
