import type { CartLine } from "../../types/product.ts";

export function addToCart(
  lines: CartLine[],
  productId: number,
  stock: number,
): CartLine[] {
  if (stock < 1) return lines;
  const found = lines.find(function (line) {
    return line.productId === productId;
  });
  if (found && found.qty >= stock) return lines;
  if (!found) return lines.concat({ productId: productId, qty: 1 });
  return lines.map(function (line) {
    if (line.productId !== productId) {
      return { productId: line.productId, qty: line.qty };
    }
    return { productId: line.productId, qty: line.qty + 1 };
  });
}

export function removeFromCart(): CartLine[] {
  return [];
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce(function (sum, line) {
    return sum + line.qty;
  }, 0);
}
