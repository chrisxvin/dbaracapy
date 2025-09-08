import type { ISqlResult } from "@server/db";
import { log } from "console";

export class MysqlAdapter implements IDatabaseAdatpter {
    public normalize<T = any>(input: any): ISqlResult<T> {
        //todo: 区分是查询还是其他

        log("MysqlAdapter", input);
        if (Array.isArray(input)) {
            const rows = input[0] ?? input;
            return {
                rows,
                affectedRows: Array.isArray(rows) ? rows.length : 0,
            };
        }

        return {
            rows: [],
            affectedRows: -1,
        };
    }

}
