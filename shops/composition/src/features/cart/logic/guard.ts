import type { CartItem } from "../../../shared/types";

export function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  return "id" in value && typeof value.id === "number" &&
    Number.isSafeInteger(value.id) && value.id > 0 &&
    "name" in value && typeof value.name === "string" && value.name.trim() !== "" &&
    "price" in value && typeof value.price === "number" &&
    Number.isFinite(value.price) && value.price >= 0 &&
    "quantity" in value && typeof value.quantity === "number" &&
    Number.isSafeInteger(value.quantity) && value.quantity > 0 &&
    Number.isFinite(value.price * value.quantity);
}
