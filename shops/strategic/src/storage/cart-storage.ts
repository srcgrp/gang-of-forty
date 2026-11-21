/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { isId, isQuantity, isRecord } from '../api/basic-guards';
import type { CartLine } from '../types';
export const CART_KEY = 'armin-market:cart';

export const isCartLine = (value: unknown): value is CartLine =>
  isRecord(value) &&
  isId(value.productId) && isQuantity(value.quantity) && value.quantity > 0;

const toLines = (parsed: unknown): unknown[] => {
  if (Array.isArray(parsed)) return parsed;
  if (!isRecord(parsed)) return [];
  return Object.entries(parsed).map(([id, quantity]) => ({ productId: Number(id), quantity }));
};

export function loadCart(): CartLine[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    const unique = new Map<number, CartLine>();
    for (const line of toLines(parsed).filter(isCartLine)) unique.set(line.productId, line);
    return [...unique.values()].sort((first, second) => first.productId - second.productId);
  } catch {
    return [];
  }
}

export function saveCart(cart: readonly CartLine[]): void {
  try {
    const serialized = JSON.stringify(cart);
    if (localStorage.getItem(CART_KEY) !== serialized) localStorage.setItem(CART_KEY, serialized);
  } catch {
    // Storage is full...
  }
}

export function watchCart(changed: (cart: CartLine[]) => void): void {
  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.storageArea === localStorage && (event.key === CART_KEY || event.key === null)) changed(loadCart());
  });
}
