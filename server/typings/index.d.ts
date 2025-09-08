import type { ISqlResult } from "@server/db";

declare global {
    //#region Common

    declare interface IConfig {
        port: number;
        origin: boolean | string[];
    }

    declare interface IServerProfile {
        guid: string;
        type: DatabaseType;
        name: string;

        host: string;
        port: number;
        user: string;
        password: string;

        extras?: any;
    }

    //#endregion


    declare type DatabaseType = "mysql" | "mariadb" | "mssql" | "postgres";

    declare interface IDatabaseAdatpter {
        normalize<T = any>(input: any): ISqlResult<T>;
    }
}

export { };
