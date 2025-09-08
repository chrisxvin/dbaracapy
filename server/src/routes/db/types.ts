import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

// 请求Body结构
// 使用 TypeBox 定义 Schema
export const QueryRequestBodySchema = Type.Object({
    // 要使用的数据库连接
    profileId: Type.String(),
    // 在哪个数据库上执行
    database: Type.String(),
    // 要执行的 sql
    sql: Type.String(),
    // sql 中的参数，value数组
    bindings: Type.Optional(Type.Array(Type.Any())),
});

// 从 Schema 提取出 TypeScript 类型
export type QueryRequestBody = Static<typeof QueryRequestBodySchema>;

// 响应Body结构
export const QueryResponseBodySchema = Type.Object({
    rows: Type.Array(Type.Record(Type.String(), Type.Unknown())),
    affectedRows: Type.Integer(),
});

export type QueryResponseBody = Static<typeof QueryResponseBodySchema>;
