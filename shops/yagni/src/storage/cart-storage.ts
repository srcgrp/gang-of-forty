import type { Cart, CartItem } from '../types';
const CART_KEY = 'yagni-cart';
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null && !Array.isArray(value); }
export function isCartLine(value: unknown): value is CartItem {
  if (!isRecord(value)) return false;
  return typeof value.productId === 'number' && Number.isInteger(value.productId) && value.productId > 0 && typeof value.name === 'string' && typeof value.price === 'number' && Number.isFinite(value.price) && value.price >= 0 && typeof value.quantity === 'number' && Number.isInteger(value.quantity) && value.quantity > 0;
}
export function readCart(): Cart {
  try { const raw = localStorage.getItem(CART_KEY); if (!raw) return []; const parsed: unknown = JSON.parse(raw); if (!Array.isArray(parsed)) return []; const entries: unknown[] = parsed; return entries.every(isCartLine) ? entries.filter(isCartLine) : []; }
  catch { return []; }
}
export function writeCart(cart: Cart): boolean {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); return true; }
  catch { return false; }
}

// Lesson 5 names for the storage boundary.
export const loadCart = readCart;
export const saveCart = writeCart;
