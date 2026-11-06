import type { Cart } from "../types";
import { isCart } from "./cartGuard";

const KEY = "shop-cart";

export function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return {};
    const data: unknown = JSON.parse(raw);
    if (isCart(data)) return data;
    console.warn("saved cart is invalid, starting with an empty cart");
  } catch (err) {
    console.warn("could not read the saved cart:", err);
  }
  return {};
}

export function saveCart(cart: Cart): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn("could not save the cart:", err);
  }
}
