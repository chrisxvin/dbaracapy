import knex from "knex";
import type { ISqlResult } from "@server/db";

const db = knex({
    client: "mysql",
    connection: {
        host: "192.168.1.231",
        port: 3306,
        user: "trinity",
        password: "trinity",
        database: "auth3",
    },
});

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

export async function runSQL<T = any>(sql: string, bindings: any[] = []): Promise<ISqlResult<T>> {
    const result = await db.raw(sql, bindings);
    console.log("runSQL", sql, bindings, result);

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

    // 兜底
    return { rows: [], affectedRows: 0 };
}
