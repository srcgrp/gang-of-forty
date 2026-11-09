import type {
  Product,
  CartItem,
} from "../../../shared/types/products";

export function addCartItem(
  cart: CartItem[],
  product: Product,
): CartItem[] {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [
    ...cart,
    {
      id: product.id,
      price: product.price,
      quantity: 1,
    },
  ];
}

export function removeCartItem(
  cart: CartItem[],
  productId: number,
): CartItem[] {
  return cart.filter((item) => item.id !== productId);
}

export function clearCart(): CartItem[] {
  return [];
}

export {
  decreaseCartItem,
  increaseCartItem,
  canIncreaseCartItem,
} from "./quantity";

export { getCartCount, getCartSubtotal } from "./totals";