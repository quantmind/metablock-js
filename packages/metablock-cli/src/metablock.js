#!/usr/bin/env node
const { createClient } = require("./index");

createClient().parse(process.argv);
