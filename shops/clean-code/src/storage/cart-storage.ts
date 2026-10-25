import { isCartLine } from "../api/cart-line.ts";
import type { CartLine } from "../types/product.ts";

const KEY = "cart";

export function loadCart(): CartLine[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(isCartLine);
}

export function saveCart(lines: CartLine[]): void {
  localStorage.setItem(KEY, JSON.stringify(lines));
}
