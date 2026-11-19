import { create } from 'zustand';
import { addItem, canAdd } from '../cart/rules';
import { removeLine } from '../cart/cartLines';
import { loadCart, saveCart } from '../storage/cart';
import type { CartState } from '../types';

let stockMessageTimer: ReturnType<typeof setTimeout> | undefined;

export const useCartStore = create<CartState>()((set) => ({
  cart: loadCart(),
  stockMessage: null,
  add: (item) => {
    clearTimeout(stockMessageTimer);
    set((s) => {
      if (canAdd(s.cart, item)) {
        return { cart: addItem(s.cart, item), stockMessage: null };
      }
      stockMessageTimer = setTimeout(() => set({ stockMessage: null }), 4000);
      return { stockMessage: `به سقف موجودی «${item.name}» رسیدید.` };
    });
  },
  remove: (id) => {
    clearTimeout(stockMessageTimer);
    set((s) => ({ cart: removeLine(s.cart, id), stockMessage: null }));
  },
}));

useCartStore.subscribe((s, previous) => {
  if (s.cart !== previous.cart) saveCart(s.cart);
});
