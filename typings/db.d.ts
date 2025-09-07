declare module "@server/db" {
    interface ISqlResult<T = any> {
        rows: T[];
        affectedRows?: number;
    }
}
