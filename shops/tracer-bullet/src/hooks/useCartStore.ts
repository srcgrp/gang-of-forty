import { create } from "zustand";
import { addToCart, removeFromCart } from "../cart/cart-lines.ts";
import { loadCart, saveCart } from "../storage/cart-storage.ts";
import type { CardProduct, CartLine } from "../types.ts";

type CartState = {
  lines: CartLine[];
  add: (product: CardProduct) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  add: (product) => set((s) => ({ lines: addToCart(s.lines, product) })),
  remove: (id) => set((s) => ({ lines: removeFromCart(s.lines, id) })),
  clear: () => set({ lines: [] }),
}));

useCartStore.subscribe((state) => saveCart(state.lines));