import { create } from "zustand";
import { addToCart } from "../cart/addToCart";
import { removeFromCart } from "../cart/removeFromCart";
import { loadCart, saveCart } from "../storage/cartStorage";
import type { CartLine, Product } from "../types";
import { changeQty } from "../cart/changeQty";

type CartState = {
  clear: () => void;
  lines: CartLine[];
  add: (product: Product, price: number) => void;
  remove: (id: number) => void;
      change: (id: number, delta: number) => void;
  
};

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  clear: () => set({ lines: [] }),
  add: (product, price) =>
    set((state) => ({
      lines: addToCart(state.lines, product, price),
    })),

  remove: (id) =>
    set((state) => ({
      lines: removeFromCart(state.lines, id),
    })),
      change: (id, delta) =>
    set((state) => ({
      lines: changeQty(state.lines, id, delta),
    })),
}));

useCartStore.subscribe((state) => {
  saveCart(state.lines);
});