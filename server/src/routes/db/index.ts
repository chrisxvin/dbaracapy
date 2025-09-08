import type { FastifyInstance } from "fastify";
import type { ErrorResponseBody } from "../../types";
import type { SqlRequestBody, QueryResponseBody, ExecuteResponseBody } from "./types";

import { SqlRequestBodySchema, QueryResponseBodySchema, ExecuteResponseBodySchema } from "./types";
import { ErrorResponseBodySchema } from "../../types";
import * as db from "../../db";

function addRouteQuery(fastify: FastifyInstance) {
    fastify.post<{
        Body: SqlRequestBody;
        Reply: QueryResponseBody | ErrorResponseBody;
    }>("/query",
        {
            schema: {
                body: SqlRequestBodySchema,
                response: {
                    200: QueryResponseBodySchema,
                    400: ErrorResponseBodySchema,
                },
            },
        },
        async (request, reply) => {
            const { profileId, database, sql, bindings = [] } = request.body;
            try {
                const result = await db.query(profileId, database, sql, bindings);
                reply.code(200).send(result);
            } catch (err) {
                reply.code(400).send(String(err));
            }
        },
    );
}

function addRouteExecute(fastify: FastifyInstance) {
    fastify.post<{
        Body: SqlRequestBody;
        Reply: ExecuteResponseBody | ErrorResponseBody;
    }>("/execute",
        {
            schema: {
                body: SqlRequestBodySchema,
                response: {
                    200: ExecuteResponseBodySchema,
                    400: ErrorResponseBodySchema,
                },
            },
        },
        async (request, reply) => {
            const { profileId, database, sql, bindings = [] } = request.body;
            try {
                const result = await db.execute(profileId, database, sql, bindings);
                reply.code(200).send(result);
            } catch (err) {
                reply.code(400).send(String(err));
            }
        },
    );
}

export async function routes(fastify: FastifyInstance) {
    addRouteExecute(fastify);
    addRouteQuery(fastify);
}

export default routes;
