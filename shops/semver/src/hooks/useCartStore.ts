import { create } from 'zustand';
import { addItem, removeItem } from '../cart/cart';
import { loadCart, saveCart } from '../storage/cart-storage';
import type { CartLine } from '../types';

type CartState = {
  lines: CartLine[];
  add: (productId: number) => void;
  remove: (productId: number) => void;
};

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  add: (productId) => set((state) => ({ lines: addItem(state.lines, productId) })),
  remove: (productId) => set((state) => ({ lines: removeItem(state.lines, productId) })),
}));

useCartStore.subscribe((state) => saveCart(state.lines));
