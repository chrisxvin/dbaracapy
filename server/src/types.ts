import type { Static } from "@sinclair/typebox";

import { Type } from "@sinclair/typebox";

// 错误Body结构
export const ErrorResponseBodySchema = Type.String();

export type ErrorResponseBody = Static<typeof ErrorResponseBodySchema>;
