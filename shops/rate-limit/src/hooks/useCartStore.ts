import { create } from 'zustand';
import { addItem } from '../cart/rules';
import { removeLine } from '../cart/cartLines';
import { loadCart, saveCart } from '../storage/cart';
import type { CartState } from '../types';

export const useCartStore = create<CartState>()((set) => ({
  cart: loadCart(),
  add: (item) => set((s) => ({ cart: addItem(s.cart, item) })),
  remove: (id) => set((s) => ({ cart: removeLine(s.cart, id) })),
}));

useCartStore.subscribe((s) => saveCart(s.cart));
