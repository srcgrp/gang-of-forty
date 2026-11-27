import type { Cart, CartLine, Offer, Product } from "../../types";
import { calculatePrice } from "../catalog/calculate-price.ts";
import { toCartKey } from "./cart-key.ts";

export function getCartQuantity(cart: Cart, productId: number): number {
  return cart[toCartKey(productId)] ?? 0;
}

export function cartCount(cart: Cart): number {
  return Object.values(cart).reduce(
    (sum, quantity) => sum + Math.max(0, quantity),
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
  return Object.entries(cart)
    .filter(([, quantity]) => quantity > 0)
    .map(([key, quantity]) => {
      const productId = Number(key);
      const product = products.find((item) => item.id === productId);
      const offer = offers.find((item) => item.productId === productId);

      return {
        id: productId,
        name: product?.name ?? `محصول ${key}`,
        price: calculatePrice(product?.price ?? 0, offer),
        quantity,
      };
    });
}

export function deliveryCost(
  subtotal: number,
  deliveryFee: number,
  freeDeliveryOver: number,
): number {
  return subtotal > freeDeliveryOver ? 0 : deliveryFee;
}
