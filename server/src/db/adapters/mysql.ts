import type { OkPacket } from "mysql";
import type { IExecuteResult, IQueryResult } from "@server/db";

export class MysqlAdapter implements IDatabaseAdatpter {
    public readonly normalizeExecute = (input: any): IExecuteResult => {
        log("MysqlAdapter", input);
        if (Array.isArray(input) && input.length > 0 && _isOkPacket(input[0])) {
            return {
                affectedRows: input[0].affectedRows,
            };
        }

        throw new Error(`Invalid execute result:`, input);
    };

    public readonly normalizeQuery = <T = any>(input: any): IQueryResult<T> => {
        log("MysqlAdapter", input);
        if (Array.isArray(input) && input.length > 0) {
            const rows = input[0];
            // 是查询结果集
            if (Array.isArray(rows)) {
                return {
                    rows,
                };
            }
        }

        throw new Error(`Invalid query result:`, input);
    };

}

function _isOkPacket(p: any): p is OkPacket {
    return typeof p.fieldCount === "number" &&
        typeof p.affectedRows === "number" &&
        typeof p.message === "string" &&
        typeof p.changedRows === "number";
}
