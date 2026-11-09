import type { Cart, CartLine, Offer, Product } from "../../types";
import { calculatePrice } from "../catalog/calculate-price";

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

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

export function getPricedLines(
  cart: Cart,
  products: Product[],
  offers: Offer[],
): CartLine[] {
  return getCartLines(cart, products).map((line) => ({
    ...line,
    price: calculatePrice(
      line.price,
      offers.find((offer) => offer.productId === line.id),
    ),
  }));
}
