import type { Stock } from "../../../../shared/types";
import { isRecord } from "../../../../shared/validation/record";

export function isStock(x: unknown): x is Stock {
  if (!isRecord(x) || !isRecord(x.items)) {
    return false;
  }

  return Object.entries(x.items).every(
    ([id, quantity]) =>
      id.trim() !== "" &&
      Number.isSafeInteger(Number(id)) &&
      Number(id) >= 0 &&
      typeof quantity === "number" &&
      Number.isSafeInteger(quantity) &&
      quantity >= 0,
  );
}