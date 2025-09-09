import type { Static } from "@sinclair/typebox";
import type { FastifyInstance } from "fastify";
import type { ErrorResponse } from "$/types";
import type { SqlRequest } from "../types";

import { Type } from "@sinclair/typebox";
import * as db from "$lib/db";
import { ErrorResponseSchema } from "$/types";
import { SqlRequestSchema } from "../types";

//#region Types

// 查询响应Body结构
const QueryResponseSchema = Type.Object({
    rows: Type.Array(Type.Record(Type.String(), Type.Unknown())),
});

type QueryResponse = Static<typeof QueryResponseSchema>;

//#endregion

function POST(fastify: FastifyInstance) {
    fastify.post<{
        Body: SqlRequest;
        Reply: QueryResponse | ErrorResponse;
    }>("/",
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

export default async function(fastify: FastifyInstance) {
    POST(fastify);
}
