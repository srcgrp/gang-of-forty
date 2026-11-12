import type { CartLine } from "../types";

const CART_KEY = "deadlock-cart";

function isCartLine(value: unknown): value is CartLine {
  return typeof value === "object" && value !== null &&
    "productId" in value && typeof value.productId === "number" &&
    "quantity" in value && typeof value.quantity === "number" && value.quantity > 0;
}

export function loadCart(): CartLine[] {
  try {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isCartLine) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartLine[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
