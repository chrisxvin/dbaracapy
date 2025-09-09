type RouteId = "/db/connect/:profileId/:database";

export type RouteParams = import("../types").RouteParams & {
    database: string;
};
