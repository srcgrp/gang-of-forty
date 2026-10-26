/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CartItem, CartLine, ProductItem } from '../../types';

export const cartCount = (cart: readonly CartLine[]): number =>
  cart.reduce((sum, line) => sum + line.quantity, 0);

export function cartRows(cart: readonly CartLine[], items: ReadonlyMap<number, ProductItem>): CartItem[] {
  return cart.flatMap((line) => {
    const item = items.get(line.productId);
    return item ? [{ ...item, quantity: line.quantity, oldPrice: item.oldPrice || item.price }] : [];
  });
}

export function cartTotal(rows: readonly CartItem[]): { total: number; oldTotal: number } {
  return rows.reduce(
    (sum, row) => ({ total: sum.total + row.price * row.quantity, oldTotal: sum.oldTotal + row.oldPrice * row.quantity }),
    { total: 0, oldTotal: 0 },
  );
}