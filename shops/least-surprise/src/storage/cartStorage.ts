import type { CartItem } from '../types';

const CART_STORAGE_KEY = 'least_surprise_cart';

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: readonly CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // خطا در دسترسی به localStorage (مانند پر بودن یا حالت Private)
  }
}
