import type { CartItem } from "../../../shared/types/products";
import { isRecord } from "../../../shared/validation/record";

const CART_KEY = "cartItems";

function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    Number.isSafeInteger(value.id) &&
    value.id > 0 &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0 &&
    typeof value.quantity === "number" &&
    Number.isSafeInteger(value.quantity) &&
    value.quantity > 0
  );
}

export function loadCart(): CartItem[] {
  const saved = localStorage.getItem(CART_KEY);

  if (saved === null) {
    return [];
  }

  try {
    const data: unknown = JSON.parse(saved);

    if (!Array.isArray(data) || !data.every(isCartItem)) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}