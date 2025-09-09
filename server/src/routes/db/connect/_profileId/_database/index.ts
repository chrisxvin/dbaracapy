import type { Static } from "@sinclair/typebox";
import type { FastifyInstance } from "fastify";
import type { ErrorResponse } from "$/types";
import type { RouteParams } from "./types";

import { Type } from "@sinclair/typebox";
import { ErrorResponseSchema } from "$/types";
import * as db from "$lib/db";

const ConnectionResponseSchema = Type.String();

type ConnectionResponse = Static<typeof ConnectionResponseSchema>;


function GET(fastify: FastifyInstance) {
    fastify.get<{
        Reply: ConnectionResponse;
        Params: RouteParams;
    }>("/",
        {
            schema: {
                response: {
                    200: ConnectionResponseSchema,
                    400: ErrorResponseSchema,
                },
            },
        },
        async (request, reply) => {
            const { profileId, database } = request.params;
            try {
                const conn = db.getConnection(profileId, database);
                reply.code(200).send(conn.id);
            } catch (ex) {
                reply.code(400).send(String(ex));
            }
        },
    );
}

export default function routes(fastify: FastifyInstance) {
    GET(fastify);
}
