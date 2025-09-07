import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";

// 使用 TypeBox 定义 Schema
export const QueryRequestBodySchema = Type.Object({
    // 要执行的 sql
    sql: Type.String(),
    // sql 中的参数，key-value 形式
    bindings: Type.Optional(Type.Array(Type.Any())),
});

// 从 Schema 提取出 TypeScript 类型
export type QueryRequestBody = Static<typeof QueryRequestBodySchema>;

export const QueryResponseBodySchema = Type.Object({
    // todo: 当发生错误时，body直接返回错误信息。
    // errorCode: Type.Integer(),
    // errorMsg: Type.String(),
    affectedRows: Type.Integer(),
    data: Type.Array(Type.Record(Type.String(), Type.Unknown())),
});

export type QueryResponseBody = Static<typeof QueryResponseBodySchema>;
