import type { Cart } from "../types";
const KEY = "superino-cart";
export function readCart(): Cart {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(
        (entry): entry is [string, number] =>
          typeof entry[1] === "number" &&
          Number.isFinite(entry[1]) &&
          entry[1] > 0,
      ),
    );
  } catch {
    return {};
  }
}
export function saveCart(cart: Cart): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
    return true;
  } catch {
    return false;
  }
}
