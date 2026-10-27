import type { CartLine } from '../types';

const CART_KEY = 'acid-cart';

export function getCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartLine[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
