import type { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import type { RouteParams } from "./types";

import * as db from "$lib/db";
import { Type } from "@fastify/type-provider-typebox";
import { ErrorResponseSchema } from "$/types";

//#region Types

const ConnectionResponseSchema = Type.String();

//#endregion

const GET: FastifyPluginAsyncTypebox = async (fastify, opts) => {
    fastify.get("/",
        {
            schema: {
                params: Type.Object({
                    profileId: Type.String(),
                    database: Type.String(),
                }),
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

export default async function (fastify: FastifyInstance, opts: Record<never, never>) {
    GET(fastify, opts);
}
