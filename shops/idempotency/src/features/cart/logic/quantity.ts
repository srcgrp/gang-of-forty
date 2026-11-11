import type { CartItem } from "../../../shared/types/products";

export function decreaseCartItem(
  cart: CartItem[],
  productId: number,
): CartItem[] {
  return cart
    .filter(
      (item) => item.id !== productId || item.quantity > 1,
    )
    .map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
}

export function increaseCartItem(
  cart: CartItem[],
  productId: number,
): CartItem[] {
  return cart.map((item) =>
    item.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
}

export function canIncreaseCartItem(
  cart: CartItem[],
  productId: number,
  availableStock: number,
): boolean {
  const currentQuantity =
    cart.find((item) => item.id === productId)?.quantity ?? 0;

  return currentQuantity < availableStock;
}