import type Fuse from 'fuse.js';
import type { Product, Offer, StockData, Shop, Category, Home } from './types';
import { getShopSlug, isRecord, priceFmt } from './utils';

// Global state 
interface State {
  shop: Shop | null;
  home: Home | null;
  categories: Category[];
  products: Product[];
  stockData: StockData | null;
  offers: Offer[];
  fuse: Fuse<Product> | null;
}

export const state: State = {
  shop: null,
  home: null,
  categories: [],
  products: [],
  stockData: null,
  offers: [],
  fuse: null,
};

// Cart 
const CART_KEY = `shop:${getShopSlug()}:v1:cart`;

export function getCart(): Record<string, number> {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return {};
    const out: Record<string, number> = {};
    for (const [id, qty] of Object.entries(data)) {
      const n = Number(qty);
      if (Number.isFinite(n) && n > 0) out[id] = Math.floor(n);
    }
    return out;
  } catch {
    return {};
  }
}

export function setCart(cart: Record<string, number>): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err: unknown) {
    console.warn('[cart] failed to persist to localStorage', err);
  }
  updateCartBadge();
}

export function getQty(id: string | number): number {
  return getCart()[String(id)] || 0;
}

export function changeQty(id: string | number, delta: number): number {
  const cart = getCart();
  const key = String(id);
  const next = Math.max(0, Math.floor((cart[key] || 0) + delta));
  if (next === 0) delete cart[key];
  else cart[key] = next;
  setCart(cart);
  return next;
}

export function cartTotal(): number {
  return Object.values(getCart()).reduce((sum, n) => sum + n, 0);
}

export function updateCartBadge(): void {
  const total = cartTotal();
  const badge = document.getElementById('cart-badge');
  const status = document.getElementById('cart-status');
  if (badge) {
    badge.textContent = priceFmt.format(total);
    badge.hidden = total === 0;
  }
  if (status) {
    status.textContent =
      total === 0 ? 'سبد خرید خالی است' : `${priceFmt.format(total)} کالا در سبد خرید`;
  }
}