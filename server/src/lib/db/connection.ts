
import knex from "knex";
import { getProfile } from "$/common";
import { createAdapter } from "./adapters";

const connections = new Map<string, IConnection>();

export function getConnection(profileId: string, database: string): IConnection {
    const key = `${profileId}----${database}`;
    let conn = connections.get(key)!;
    if (conn == null) {
        const profile = getProfile(profileId);
        if (profile == null)
            throw new Error(`Invalid profile ${profileId}`);

        const db = knex({
            client: profile.type,
            connection: {
                host: profile.host,
                port: profile.port,
                user: profile.user,
                password: profile.password,
                database,
            },
        });

        conn = {
            profileId,
            database,
            connection: db,
            adapter: createAdapter(profile.type),
        };
        connections.set(key, conn);
    }

    return conn;
}
