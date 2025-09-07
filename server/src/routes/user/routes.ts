import type { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";

export async function routes(fastify: FastifyInstance) {
    // GET /user 路由
    fastify.get(
        "/",
        {
            schema: {
                response: {
                    200: Type.Object({
                        message: Type.String()
                    })
                }
            }
        },
        async function(request, reply) {
            return {
                "message": "User list"
            };
        }
    );

    // POST /user 路由，带 body schema
    fastify.post(
        "/",
        {
            schema: {
                body: Type.Object({
                    name: Type.String(),
                    email: Type.String({ format: "email" })
                }),
                response: {
                    201: Type.Object({
                        id: Type.Number()
                    })
                }
            }
        },
        async function(request, reply) {
            const { name, email } = request.body as any;
            // 处理逻辑，例如保存到数据库
            reply.code(201);
            return {
                "id": 123
            };
        }
    );
}

export default routes;
