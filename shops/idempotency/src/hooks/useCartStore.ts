import { create } from "zustand";
import type { CartAction, CartItem, Product } from "../shared/types/products";
import { loadCart, saveCart } from "../features/cart/storage/items";
import {
  addCartItem,
  canIncreaseCartItem,
  clearCart,
} from "../features/cart/logic/items";
import { applyCartAction } from "../features/cart/logic/actions";

type CartState = {
  lines: CartItem[];
  add: (product: Product, availableStock: number) => boolean;
  change: (action: CartAction, id: number, availableStock: number) => boolean;
  clear: () => void;
};

export const useCartStore = create<CartState>()((set, get) => ({
  lines: loadCart(),
  add: (product, availableStock) => {
    const { lines } = get();
    if (!canIncreaseCartItem(lines, product.id, availableStock)) return false;
    set({ lines: addCartItem(lines, product) });
    return true;
  },
  change: (action, id, availableStock) => {
    const { lines } = get();
    const nextLines = applyCartAction(lines, action, id, availableStock);
    set({ lines: nextLines });
    return nextLines !== lines;
  },
  clear: () => set({ lines: clearCart() }),
}));

useCartStore.subscribe((state, previous) => {
  if (state.lines !== previous.lines) saveCart(state.lines);
});
