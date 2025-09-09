import type { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

import { Type } from "@fastify/type-provider-typebox";
import * as db from "$lib/db";
import { ErrorResponseSchema } from "$/types";
import { SqlRequestSchema } from "../types";

//#region Types

// 执行响应Body结构
const ExecuteResponseSchema = Type.Object({
    affectedRows: Type.Integer(),
});

//#endregion

const POST: FastifyPluginAsyncTypebox = async (fastify, opts) => {
    fastify.post("/",
        {
            schema: {
                body: SqlRequestSchema,
                response: {
                    200: ExecuteResponseSchema,
                    400: ErrorResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const { connectionId, sql, bindings = [] } = request.body;
            try {
                const result = await db.execute(connectionId, sql, bindings);
                reply.code(200).send(result);
            } catch (err) {
                reply.code(400).send(String(err));
            }
        },
    );
}

export default async function (fastify: FastifyInstance, opts: Record<never, never>) {
    POST(fastify, opts);
}
