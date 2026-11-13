import { create } from "zustand";
import { addToCart } from "../cart/addToCart";
import { removeFromCart } from "../cart/removeFromCart";
import { loadCart, saveCart } from "../storage/cartStorage";
import type { CartLine, Product } from "../types";

type CartState = {
  lines: CartLine[];
  add: (product: Product, price: number) => void;
  remove: (id: number) => void;
};

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),

  add: (product, price) =>
    set((state) => ({
      lines: addToCart(state.lines, product, price),
    })),

  remove: (id) =>
    set((state) => ({
      lines: removeFromCart(state.lines, id),
    })),
}));

useCartStore.subscribe((state) => {
  saveCart(state.lines);
});