import { create } from "zustand";
import type { CartItem } from "../shared/types";
import { addItem, decreaseItem, removeItem } from "../features/cart/logic/items";
import { loadCart, saveCart } from "../features/cart/storage/cart";

type CartState = {
  lines: CartItem[];
  add: (item: CartItem, stock: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};
export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  add: (item, stock) => set((state) => ({ lines: addItem(state.lines, item, stock) })),
  decrease: (id) => set((state) => ({ lines: decreaseItem(state.lines, id) })),
  remove: (id) => set((state) => ({ lines: removeItem(state.lines, id) })),
  clear: () => set({ lines: [] }),
}));
useCartStore.subscribe((state) => saveCart(state.lines));
