import type { FastifyInstance, FastifyRequest, FastifyReply, FastifyListenOptions } from "fastify";

import Fastify from "fastify";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import fastifyAuth from "@fastify/auth";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import fastifyAutoload from "@fastify/autoload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serverOptions = {
    logger: true,
    // https: {
    //     key: readFileSync(join(__dirname, "../server.key")),
    //     cert: readFileSync(join(__dirname, "../server.crt")),
    // },
};
export const server: FastifyInstance = Fastify(serverOptions);
server.register(fastifyCookie);
server.register(fastifyCors, {
    origin: ["http://localhost", "http://localhost:8080", "https://localhost", "https://localhost:8080"],
    methods: "GET,POST,OPTION,PUT,DELETE",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization,X-Xsrf-Token",
    credentials: true,
});
server.register(fastifyHelmet, {});
/*
server.register(fastifyStatic, {
    root: path.join(__dirname, "../static"),
    prefix: "/", // optional: default '/'
});
*/
server.register(fastifyAuth);
server.register(fastifyFormbody);
// 注册 autoload 插件，dir 指定 routes 目录
await server.register(fastifyAutoload, {
    dir: path.join(__dirname, "routes"), // 自动加载 routes 目录下的所有路由
    routeParams: true,
    // options: Object.assign({ prefix: "/" }, process.env), // 可选：添加前缀或环境变量
});

/*
// API 路由：添加数据库配置
server.post("/config", async (request, reply) => {
  const { guid, host, port, database, user, password } = request.body;
  config[guid] = { host, port, database, user, password };
  fs.writeFileSync(configPath, `export default ${JSON.stringify(config, null, 2)};`);
  reply.send({ message: "Config saved" });
});
*/

// 启动服务器
export const start = async () => {
    const opts: FastifyListenOptions = {
        host: "0.0.0.0",
        port: 3000,
    };
    server.listen(opts, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        // console.log(`Server listening at ${address}`);
    });
};
