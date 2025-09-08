import type { ISqlResult } from "@server/db";

import type { OkPacket } from "mysql";

export class MysqlAdapter implements IDatabaseAdatpter {
    public normalize<T = any>(input: any): ISqlResult<T> {
        //todo: 区分是查询还是其他

        log("MysqlAdapter", input);
        if (Array.isArray(input) && input.length > 0) {
            // 不是查询类 sql
            if (_isOkPacket(input[0])) {
                return {
                    rows: [],
                    affectedRows: input[0].affectedRows,
                };
            }

            const rows = input[0];
            // 是查询结果集
            if (Array.isArray(rows)) {
                return {
                    rows,
                    affectedRows: -1,
                };
            }
        }

        return {
            rows: [],
            affectedRows: -1,
        };
    }

}

function _isOkPacket(p: any): p is OkPacket {
    return typeof p.fieldCount === "number" &&
        typeof p.affectedRows === "number" &&
        typeof p.message === "string" &&
        typeof p.changedRows === "number";
}
