import type { Cart, Product, Offer, CartRow, CartView } from '../../shared/types';
import type { AppState } from '../../shared/state/app-state';
import { finalPrice } from '../../shared/logic/pricing';
import { cartCount } from './logic/cart';
import { stockOf } from '../../shared/logic/stock';

export function cartRows(cart: Cart, products: Product[], offers: Map<number, Offer>): CartRow[] {
  const rows: CartRow[] = [];
  for (const [id, qty] of Object.entries(cart)) {
    const p = products.find((x) => x.id === Number(id));
    if (!p) continue;
    const unit = finalPrice(p.price, offers.get(p.id));
    rows.push({
      id: p.id,
      name: p.name,
      qty,
      lineTotal: unit * qty,
      ...(p.image === undefined ? {} : { image: p.image }),
      emoji: p.emoji,
    });
  }
  return rows;
}

export function cartTotal(cart: Cart, products: Product[], offers: Map<number, Offer>): number {
  let total = 0;
  for (const [id, qty] of Object.entries(cart)) {
    const p = products.find((x) => x.id === Number(id));
    if (!p) continue;
    total += finalPrice(p.price, offers.get(p.id)) * qty;
  }
  return total;
}

export function buildCartView(s: AppState): CartView {
  const rows = cartRows(s.cart, s.products, s.offerMap);
  const total = rows.reduce((sum, r) => sum + r.lineTotal, 0);
  return { count: cartCount(s.cart), rows, total };
}

export function pruneCart(s: AppState): Cart {
  if (s.products.length === 0 || !s.stock) return s.cart;
  const next: Cart = {};
  for (const [id, qty] of Object.entries(s.cart)) {
    const numId = Number(id);
    const q = Math.min(qty, stockOf(numId, s.stock));
    if (q > 0 && s.products.some((p) => p.id === numId)) {
      next[id] = q;
    }
  }
  return next;
}

export function getCartUI(s: AppState): CartView {
  return buildCartView(s);
}