import type { ISqlResult } from "@server/db";

import { getConnection } from "./db";

export async function execSQL<T = any>(profileId: string, database: string, sql: string, bindings: any[] = []): Promise<ISqlResult<T>> {
    // get connection by profileId and database
    const conn = getConnection(profileId, database);

    // run sql with adapter
    const rawResult = await conn.connection.raw(sql, bindings);
    const resolvedResult = conn.adapter.normalize(rawResult);

    // return result
    return resolvedResult;
}
