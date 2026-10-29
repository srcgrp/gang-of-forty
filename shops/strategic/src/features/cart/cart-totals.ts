/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CartItem, CartLine, CartTotals, CartView, ProductItem } from '../../types';

export const cartCount = (cart: readonly CartLine[]): number => cart.reduce((sum, line) => sum + line.quantity, 0);
export function cartRows(cart: readonly CartLine[], items: ReadonlyMap<number, ProductItem>): CartItem[] {
  return cart.flatMap((line) => {
    const item = items.get(line.productId);
    return item ? [{ ...item, quantity: line.quantity, subtotal: item.price * line.quantity,
      oldSubtotal: item.product.price * line.quantity }] : [];
  });
}
export function cartTotal(rows: readonly CartItem[]): CartTotals {
  const total = rows.reduce((sum, row) => sum + row.subtotal, 0);
  const oldTotal = rows.reduce((sum, row) => sum + row.oldSubtotal, 0);
  return { total, oldTotal, discount: oldTotal > 0 ? Math.round((oldTotal - total) / oldTotal * 100) : 0 };
}
export function cartView(cart: readonly CartLine[], items: ReadonlyMap<number, ProductItem>, ready: boolean): CartView {
  const rows = ready ? cartRows(cart, items) : [];
  return { ready, rows, count: cartCount(cart), ...cartTotal(rows) };
}