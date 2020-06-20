#!/usr/bin/env node
import createClient from "./src/cli";

createClient().parse(process.argv);
