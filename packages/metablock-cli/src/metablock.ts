#!/usr/bin/env node
import createClient from "./cli";

createClient().parse(process.argv);
