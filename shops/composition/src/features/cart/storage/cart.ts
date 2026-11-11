import type { CartItem } from "../../../shared/types";
import { isCartItem } from "../logic/guard";

const cartKey = "batshop-cart";
export function loadCart(): CartItem[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(cartKey) ?? "[]");
    if (!Array.isArray(data)) return [];
    const items: unknown[] = data;
    if (!items.every(isCartItem)) return [];
    if (new Set(items.map(item => item.id)).size !== items.length) return [];
    return items;
  } catch { return []; }
}
export function saveCart(cart: readonly CartItem[]): boolean {
  try {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    return true;
  } catch { return false; }
}
