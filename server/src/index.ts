import "./utils/logger";
import "./common";

import { loadConfig, loadProfiles } from "./common";
import { start } from "./server";

function main() {
    loadConfig();
    loadProfiles();
    start();
}

main();
