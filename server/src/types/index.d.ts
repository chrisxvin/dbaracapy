import type { Knex } from "knex";

declare global {

    declare interface IConnection {
        // id: string;
        profileId: string;
        database: string;
        // todo: change to pool
        connection: Knex;
        adapter: IDatabaseAdatpter;
    }

}

export { };
