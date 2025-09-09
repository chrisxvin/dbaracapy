import type { Static } from "@sinclair/typebox";

import { Type } from "@sinclair/typebox";

// 错误Body结构
export const ErrorResponseSchema = Type.String();

export type ErrorResponse = Static<typeof ErrorResponseSchema>;
