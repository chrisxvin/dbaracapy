import type { Static } from "@sinclair/typebox";
import type { FastifyInstance } from "fastify";
import type { ErrorResponse } from "$/types";

import { Type } from "@sinclair/typebox";
import { ErrorResponseSchema } from "$/types";
import { getProfiles } from "$/common";

//#region Types

//#endregion

function GET(fastify: FastifyInstance) {
    fastify.get(
        "/",
        {},
        (request, reply) => {
            reply.code(200).send(getProfiles());
        },
    );
}


export default async function(fastify: FastifyInstance) {
    GET(fastify);
}
