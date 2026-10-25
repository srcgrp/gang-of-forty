import type { CartLine } from "../../types/product.ts";

export function addToCart(lines: CartLine[], productId: number): CartLine[] {
  const next = lines.map(function (line) {
    return { productId: line.productId, qty: line.qty };
  });
  const found = next.find(function (line) {
    return line.productId === productId;
  });
  if (found) {
    found.qty = found.qty + 1;
    return next;
  }
  next.push({ productId: productId, qty: 1 });
  return next;
}

export function removeFromCart(): CartLine[] {
  return [];
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce(function (sum, line) {
    return sum + line.qty;
  }, 0);
}
