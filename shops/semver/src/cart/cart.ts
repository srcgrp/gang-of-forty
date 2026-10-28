import type { CartLine, Product } from '../types.ts';

export function addItem(lines: readonly CartLine[], productId: number): CartLine[] {
  const exists = lines.some((l) => l.productId === productId);
  if (!exists) return [...lines, { productId, qty: 1 }];
  return lines.map((l) =>
    l.productId === productId ? { ...l, qty: l.qty + 1 } : l,
  );
}

export function setQty(
  lines: readonly CartLine[],
  productId: number,
  qty: number,
): CartLine[] {
  if (qty <= 0) return removeItem(lines, productId);
  return lines.map((l) => (l.productId === productId ? { ...l, qty } : l));
}

export function removeItem(lines: readonly CartLine[], productId: number): CartLine[] {
  return lines.filter((l) => l.productId !== productId);
}

export function totalPrice(
  lines: readonly CartLine[],
  products: readonly Product[],
): number {
  return lines.reduce((sum, l) => {
    const p = products.find((x) => x.id === l.productId);
    return p ? sum + p.price * l.qty : sum;
  }, 0);
}