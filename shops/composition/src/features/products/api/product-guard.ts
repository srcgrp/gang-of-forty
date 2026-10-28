import type { Product } from "../../../shared/types";
import { isObject, isId, isAmount, isList } from "../../../shared/api/validation";

export function isProduct(value: unknown): value is Product {
  if (!isObject(value)) return false;
  return (
    isId(value.id) && isId(value.categoryId) &&
    typeof value.name === "string" && value.name.trim() !== "" &&
    typeof value.emoji === "string" && typeof value.unit === "string" &&
    isAmount(value.price) && isList(value.tags) &&
    value.tags.every((tag: unknown) => typeof tag === "string")
  );
}
