import type { Cart, CartLine, Product } from "../../types";
export function getCartLines(cart: Cart, products: Product[]): CartLine[] {
  return Object.entries(cart)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => {
      const product = products.find((item) => String(item.id) === id);
      return {
        id: Number(id),
        name: product?.name ?? `محصول ${id}`,
        price: product?.price ?? 0,
        quantity,
      };
    });
}
export function cartCount(cart: Cart): number {
  return Object.values(cart).reduce(
    (sum, value) => sum + Math.max(0, value),
    0,
  );
}
