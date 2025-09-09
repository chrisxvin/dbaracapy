import knex from "knex";
import { v4 as uuidv4 } from "uuid";
import { getProfile } from "$/common";
import { createAdapter } from "./adapters";

const connections = new Map<string, IConnection>();

export function getConnection(connectionId: string): IConnection;
export function getConnection(profileId: string, database: string): IConnection;
export function getConnection(connectionOrProfileId: string, database?: string): IConnection {
    if (database == null) {
        return _getConnectionById(connectionOrProfileId);
    }

    return _getConnectionByProfile(connectionOrProfileId, database);
}

function _createConnection(profileId: string, database: string): IConnection {
    const profile = getProfile(profileId);
    if (profile == null)
        throw new Error(`Invalid profile: ${profileId}`);

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

    const id = uuidv4().toUpperCase();
    const conn = {
        id,
        profileId,
        database,
        connection: db,
        adapter: createAdapter(profile.type),
    };
    connections.set(id, conn);
    return conn;
}

function _getConnectionById(connectionId: string): IConnection {
    const conn = connections.get(connectionId);
    if (conn == null)
        throw new Error(`Invalid connection: ${connectionId}`);

    return conn;
}

function _getConnectionByProfile(profileId: string, database: string): IConnection {
    let conn = connections.values().find(a => a.profileId === profileId && a.database === database);
    if (conn == null)
        conn = _createConnection(profileId, database);

    return conn;
}
