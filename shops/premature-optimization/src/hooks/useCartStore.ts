import { create } from "zustand";
import type { Cart } from "../scripts/types";
import { addItem } from "../scripts/logic/cart/add-item.ts";
import { cartCount } from "../scripts/logic/cart/cart-lines.ts";
import { removeItem } from "../scripts/logic/cart/remove-item.ts";
import { readCart, saveCart } from "../scripts/storage/cart-storage.ts";
import { saveFailedFeedback } from "../lib/animations/feedback.ts";

export type CartState = {
  cart: Cart;
  add: (productId: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()((set) => ({
  cart: readCart(),
  add: (productId) =>
    set((state) => ({ cart: addItem(state.cart, productId) })),
  remove: (productId) =>
    set((state) => ({ cart: removeItem(state.cart, productId) })),
  clear: () => set({ cart: {} }),
}));

// Selector
export const selectCartCount = (state: CartState): number =>
  cartCount(state.cart);

useCartStore.subscribe((state, previousState) => {
  if (state.cart === previousState.cart) return;
  if (!saveCart(state.cart)) saveFailedFeedback();
});