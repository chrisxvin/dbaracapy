import type { FastifyInstance } from "fastify";

import { runSQL } from "../../db";
import { QueryRequestBodySchema, QueryResponseBodySchema, type QueryRequestBody } from "./types";


export async function routes(server: FastifyInstance) {
    server.post<{ Body: QueryRequestBody }>(
        "/exec",
        {
            schema: {
                body: QueryRequestBodySchema,
                response: {
                    200: QueryResponseBodySchema,
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
            const { sql, bindings = [] } = request.body;
            try {
                // const pool = getPool(dbGuid);
                // const result = await pool.query(sql, values);
                const result = await runSQL(sql, bindings);
                console.log("runSQL", result);
                reply.send({
                    data: result.rows,
                    affectedRows: -1,
                });
            } catch (err) {
                reply.code(500).send({ error: err });
            }
        },
    );
}

export default routes;
