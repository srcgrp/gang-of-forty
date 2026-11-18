import type { Cart, Product, Offer, CartRow, Stock } from '../../shared/types';
import { finalPrice } from '../../shared/logic/pricing';
import { stockOf } from '../../shared/logic/stock';

export function cartRows(cart: Cart, products: Product[], offers: Map<number, Offer>): CartRow[] {
  const rows: CartRow[] = [];
  for (const [id, qty] of Object.entries(cart)) {
    const product = products.find((item) => item.id === Number(id));
    if (!product) continue;
    const unitPrice = finalPrice(product.price, offers.get(product.id));
    rows.push({
      id: product.id,
      name: product.name,
      qty,
      lineTotal: unitPrice * qty,
      ...(product.image === undefined ? {} : { image: product.image }),
      emoji: product.emoji,
    });
  }
  return rows;
}

export function cartTotal(rows: CartRow[]): number {
  return rows.reduce((sum, row) => sum + row.lineTotal, 0);
}

export function pruneCart(cart: Cart, products: Product[], stock: Stock | null): Cart {
  if (products.length === 0 || !stock) return cart;
  const next: Cart = {};
  for (const [id, quantity] of Object.entries(cart)) {
    const productId = Number(id);
    const availableQuantity = Math.min(quantity, stockOf(productId, stock));
    if (availableQuantity > 0 && products.some((product) => product.id === productId)) {
      next[id] = availableQuantity;
    }
  }
  return next;
}
