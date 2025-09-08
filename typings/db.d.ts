declare module "@server/db" {
    interface IExecuteResult {
        affectedRows: number;
    }

    interface IQueryResult<T = any> {
        rows: T[];
    }
}
