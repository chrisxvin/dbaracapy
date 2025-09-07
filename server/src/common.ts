import type { HTTPMethods, FastifyInstance } from "fastify";
import type { IConfig } from "./types";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

// 动态加载配置文件
import configDist from "./config.dist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config: IConfig = configDist as IConfig;

export async function loadConfig() {
    // 加载配置
    const configPath = path.join(__dirname, "config.js");
    if (fs.existsSync(configPath)) {
        config = (await import(configPath)).default;
    }
}

export function getConfig(): IConfig {
    return config;
}

/*
export function regMocks(svr: FastifyInstance) {
    console.log("注册路由:");
    const keys = Object.keys(mockStore);
    keys.forEach(key => {
        console.log(`\t${key}`);
        const m = mockStore[key];
        svr.route({
            method: m.method,
            url: m.url,
            handler: m.handler,
        });
    });
}
*/
