
import type {
  CartAction,
  CartItem,
} from "../../../shared/types/products";

import {
  canIncreaseCartItem,
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
} from "./items";

export function applyCartAction(
  cart: CartItem[],
  action: CartAction,
  productId: number,
  availableStock: number,
): CartItem[] {
  switch (action) {
    case "increase":
      return canIncreaseCartItem(cart, productId, availableStock)
        ? increaseCartItem(cart, productId)
        : cart;

    case "decrease":
      return decreaseCartItem(cart, productId);

    case "remove":
      return removeCartItem(cart, productId);
  }
}
