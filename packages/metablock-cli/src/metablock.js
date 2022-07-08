#!/usr/bin/env node
import { createClient } from "@metablock/cli";

createClient().parse(process.argv);
