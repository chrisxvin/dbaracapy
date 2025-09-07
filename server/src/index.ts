import fs from "fs";
import path from "path";

import "./common";

import { loadConfig } from "./common";
import { start } from "./server";

async function main() {
    await loadConfig();
    start();
}

main();
