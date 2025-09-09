import type { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

import { Type } from "@fastify/type-provider-typebox";
import { getProfiles } from "$/common";

//#region Types

//#endregion

const GET: FastifyPluginAsyncTypebox = async (fastify, opts) => {
    fastify.get("/",
        {
            schema: {
                response: {
                    200: Type.Array(Type.Any()),
                }
            }
        },
        (request, reply) => {
            reply.code(200).send(getProfiles());
        },
    );
};

export default async function (fastify: FastifyInstance, opts: Record<never, never>) {
    GET(fastify, opts);
}
