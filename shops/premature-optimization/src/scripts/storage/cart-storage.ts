import type { Cart } from "../types";

const CART_STORAGE_KEY = "superino-cart";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidQuantity(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function readCart(): Cart {
  try {
    const rawCart = localStorage.getItem(CART_STORAGE_KEY);
    if (rawCart === null) return {};

    const parsedCart: unknown = JSON.parse(rawCart);
    if (!isRecord(parsedCart)) return {};

    const validEntries = Object.entries(parsedCart).filter(
      (entry): entry is [string, number] => isValidQuantity(entry[1]),
    );
    return Object.fromEntries(validEntries);
  } catch {
    return {};
  }
}

export function saveCart(cart: Cart): boolean {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch {
    return false;
  }
}
