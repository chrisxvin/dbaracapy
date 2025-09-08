import type { IExecuteResult, IQueryResult } from "@server/db";

import { getConnection } from "./db";

async function dispatch(profileId: string, database: string, sql: string, bindings: any[], normalizeCallback: (adapter: IDatabaseAdatpter) => ((result: any) => any)): Promise<any> {
    // get connection by profileId and database
    const conn = getConnection(profileId, database);

    // run sql with adapter
    const result = await conn.connection.raw(sql, bindings);
    return normalizeCallback(conn.adapter)(result);
}

export async function execute(profileId: string, database: string, sql: string, bindings: any[] = []): Promise<IExecuteResult> {
    /*
    // get connection by profileId and database
    const conn = getConnection(profileId, database);

    // run sql with adapter
    const rawResult = await conn.connection.raw(sql, bindings);
    const resolvedResult = conn.adapter.normalizeExecute(rawResult);

    // return result
    return resolvedResult;
    */
    return dispatch(profileId, database, sql, bindings, (adapter) => adapter.normalizeExecute);
}

export async function query<T = any>(profileId: string, database: string, sql: string, bindings: any[] = []): Promise<IQueryResult<T>> {
    /*
    // get connection by profileId and database
    const conn = getConnection(profileId, database);

    // run sql with adapter
    const rawResult = await conn.connection.raw(sql, bindings);
    const resolvedResult = conn.adapter.normalizeQuery(rawResult);

    // return result
    return resolvedResult;
    */
    return dispatch(profileId, database, sql, bindings, (adapter) => adapter.normalizeQuery);
}
