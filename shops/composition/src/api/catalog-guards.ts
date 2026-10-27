import type { Category, Offer, Stock } from "../types";
import { isObject, isId, isAmount } from "./validation";

export function isCategory(value: unknown): value is Category {
  if (!isObject(value)) return false;
  return isId(value.id) && typeof value.slug === "string" &&
    value.slug.trim() !== "" && typeof value.name === "string" &&
    typeof value.emoji === "string" && typeof value.color === "string";
}

export function isOffer(value: unknown): value is Offer {
  if (!isObject(value)) return false;
  return isId(value.productId) && isAmount(value.percent) &&
    value.percent <= 100 && typeof value.label === "string";
}

export function isStock(value: unknown): value is Stock {
  if (!isObject(value) || typeof value.updatedAt !== "string" ||
      !isObject(value.items)) return false;
  return Object.entries(value.items).every(([id, count]) =>
    isId(Number(id)) && isAmount(count) && Number.isSafeInteger(count)
  );
}
