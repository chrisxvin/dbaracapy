import type { FastifyInstance } from "fastify";
import type { ErrorResponseBody } from "../../types";
import type { QueryRequestBody, QueryResponseBody } from "./types";

import { runSQL } from "../../db/db";
import { QueryRequestBodySchema, QueryResponseBodySchema } from "./types";
import { ErrorResponseBodySchema } from "../../types";
import { execSQL } from "../../db";


export async function routes(fastify: FastifyInstance) {
    fastify.post<{
        Body: QueryRequestBody;
        Reply: QueryResponseBody | ErrorResponseBody;
    }>(
        "/exec",
        {
            schema: {
                body: QueryRequestBodySchema,
                response: {
                    200: QueryResponseBodySchema,
                    400: ErrorResponseBodySchema,
                },
            },
        },
        async (request, reply) => {
            /*
            const dbGuid = request.headers["db-guid"];
            if (!dbGuid) {
                return reply.code(400).send({ error: "DB-GUID header required" });
            }
            */
            const { profileId, database, sql, bindings = [] } = request.body;
            try {

                // const pool = getPool(dbGuid);
                // const result = await pool.query(sql, values);
                const result = await execSQL(profileId, database, sql, bindings);
                reply.code(200).send(result);
            } catch (err) {
                reply.code(400).send(String(err));
            }
        },
    );
}

export default routes;
