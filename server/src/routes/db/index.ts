import type { Static } from "@sinclair/typebox";
import type { FastifyInstance } from "fastify";
import type { ErrorResponse } from "$/types";

import { Type } from "@sinclair/typebox";
import * as db from "$lib/db";
import { ErrorResponseSchema } from "$/types";

//#region Types

// 请求Body结构
// 使用 TypeBox 定义 Schema
export const SqlRequestSchema = Type.Object({
    // 要使用的数据库连接 ID
    connectionId: Type.String(),
    // 要执行的 sql
    sql: Type.String(),
    // sql 中的参数，value数组
    bindings: Type.Optional(Type.Array(Type.Any())),
});

// 从 Schema 提取出 TypeScript 类型
export type SqlRequest = Static<typeof SqlRequestSchema>;

// 查询响应Body结构
export const QueryResponseSchema = Type.Object({
    rows: Type.Array(Type.Record(Type.String(), Type.Unknown())),
});

export type QueryResponse = Static<typeof QueryResponseSchema>;

// 执行响应Body结构
export const ExecuteResponseSchema = Type.Object({
    affectedRows: Type.Integer(),
});

export type ExecuteResponse = Static<typeof ExecuteResponseSchema>;

//#endregion

function POST_Query(fastify: FastifyInstance) {
    fastify.post<{
        Body: SqlRequest;
        Reply: QueryResponse | ErrorResponse;
    }>("/query",
        {
            schema: {
                body: SqlRequestSchema,
                response: {
                    200: QueryResponseSchema,
                    400: ErrorResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const { connectionId, sql, bindings = [] } = request.body;
            try {
                const result = await db.query(connectionId, sql, bindings);
                reply.code(200).send(result);
            } catch (err) {
                reply.code(400).send(String(err));
            }
        },
    );
}

function POST_Execute(fastify: FastifyInstance) {
    fastify.post<{
        Body: SqlRequest;
        Reply: ExecuteResponse | ErrorResponse;
    }>("/execute",
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

export async function routes(fastify: FastifyInstance) {
    POST_Execute(fastify);
    POST_Query(fastify);
}

export default routes;
