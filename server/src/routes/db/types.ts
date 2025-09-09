import { Type } from "@sinclair/typebox";

// 请求Body结构
// 使用 TypeBox 定义 Schema
export const SqlRequestSchema = Type.Object({
    // 要使用的数据库连接 ID
    connectionId: Type.String(),
    // 要执行的 sql
    sql: Type.String(),
    // sql 中的参数，value数组
    bindings: Type.Optional(Type.Array(Type.Any())),
});
