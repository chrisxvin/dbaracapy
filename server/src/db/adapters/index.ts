import { MysqlAdapter } from "./mysql";

export function createAdapter(type: DatabaseType): IDatabaseAdatpter {
    switch (type) {
        case "mysql":
        case "mariadb":
            return new MysqlAdapter();

        default:
            throw new Error(`Not implemented adapter type: ${type}`);
    }
}
