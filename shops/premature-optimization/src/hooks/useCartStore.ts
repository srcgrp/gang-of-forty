import { create } from "zustand";
import type { Cart } from "../scripts/types";
import { addItem } from "../scripts/logic/cart/add-item.ts";
import { removeItem } from "../scripts/logic/cart/remove-item.ts";
import { readCart, saveCart } from "../scripts/storage/cart-storage.ts";
import { saveFailedFeedback } from "../lib/animations/feedback.ts";

type CartState = {
  cart: Cart;
  add: (id: number) => void;
  remove: (id: number) => void;
};

export const useCartStore = create<CartState>()((set) => ({
  cart: readCart(),
  add: (id) => set((s) => ({ cart: addItem(s.cart, String(id)) })),
  remove: (id) => set((s) => ({ cart: removeItem(s.cart, String(id)) })),
}));

useCartStore.subscribe((s) => {
  if (!saveCart(s.cart)) saveFailedFeedback();
});
