import type { Stock } from "../scripts/types";

import { isRecord, isString, isFiniteNumber } from "./common-guards";

export function isStock(x: unknown): x is Stock {
  return (
    isRecord(x) &&
    isString(x.updatedAt) &&
    isRecord(x.items) &&
    Object.values(x.items).every(
      (quantity: unknown): boolean => isFiniteNumber(quantity) && quantity >= 0,
    )
  );
}
