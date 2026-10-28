import type { Cart, CartLine } from '../types';
import { isRecord } from '../api/is-record';
import { STORAGE_KEYS } from './keys';

export function isCartLine(v: unknown): v is CartLine {
  return (
    isRecord(v) &&
    typeof v.id === 'number' &&
    typeof v.quantity === 'number' &&
    v.quantity > 0 &&
    Number.isFinite(v.quantity)
  );
}

export function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.cart);
    if (!raw) return {};
    const data: unknown = JSON.parse(raw);

    if (Array.isArray(data)) {
      const lines = data.filter(isCartLine);
      return Object.fromEntries(lines.map((l) => [String(l.id), Math.floor(l.quantity)]));
    }
    return {};
  } catch {
    return {};
  }
}

export function saveCart(cart: Cart): void {
  const lines: CartLine[] = Object.entries(cart).map(([id, quantity]) => ({
    id: Number(id),
    quantity,
  }));
  try {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(lines));
  } catch (err) {
    console.warn('[cart] failed to save', err);
  }
}