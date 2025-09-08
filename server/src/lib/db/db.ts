import type { IExecuteResult, IQueryResult } from "@server/db";
import type { Knex } from "knex";

import knex from "knex";
import { getProfile, getProfiles } from "../../common";
import { createAdapter } from "./adapters";
import { getConnection } from "./connection";


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





// 获取或创建连接池
function getPool(dbGuid: string) {
    /*
  if (!pools.has(dbGuid)) {
    const dbConfig = config[dbGuid];
    if (!dbConfig) {
      throw new Error(`Database config for GUID ${dbGuid} not found`);
    }
    pools.set(dbGuid, new Pool(dbConfig));
  }
  return pools.get(dbGuid);
  */
}

/**
 * @deprecated
 */
export async function runSQL<T = any>(sql: string, bindings: any[] = []) {
    /*


    // MySQL / SQLite (mysql2 返回 [rows, fields])
    if (Array.isArray(result)) {
        const rows = result[0] ?? result;
        return {
            rows,
            affectedRows: Array.isArray(rows) ? rows.length : 0,
        };
    }

    // PostgreSQL
    if (result && result.rows) {
        return {
            rows: result.rows,
            affectedRows: result.affectedRows ?? result.rows.length,
        };
    }

    // MSSQL
    if (result && (result as any).recordset) {
        return {
            rows: (result as any).recordset,
            affectedRows: (result as any).rowsAffected?.[0] ?? (result as any).recordset.length,
        };
    }
    */
}
