import { create } from "zustand";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../cart/cart-logic";
import { loadCart, saveCart } from "../storage/cart-storage";
import type { Cart, Product } from "../types";

type CartState = {
  lines: Cart;
  add: (product: Product, price: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  add: (product, price) =>
    set((state) => ({
      lines: addToCart(state.lines, product, price),
    })),
  updateQuantity: (productId, delta) =>
    set((state) => ({
      lines: updateQuantity(state.lines, productId, delta),
    })),
  remove: (productId) =>
    set((state) => ({
      lines: removeFromCart(state.lines, productId),
    })),
  clear: () => set({ lines: [] }),
}));

useCartStore.subscribe((state) => {
  if (!saveCart(state.lines)) {
    console.warn("سبد خرید در این مرورگر ذخیره نشد.");
  }
});
