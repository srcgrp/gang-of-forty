import type { Category } from "../scripts/types";

import { isRecord, isString, isNullableString } from "./common-guards";

export function isCategory(x: unknown): x is Category {
  return (
    isRecord(x) &&
    Number.isInteger(x.id) &&
    isString(x.slug) &&
    x.slug !== "" &&
    isString(x.name) &&
    isString(x.image) &&
    isNullableString(x.emoji) &&
    isString(x.color)
  );
}
