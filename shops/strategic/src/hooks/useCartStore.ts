import { create } from 'zustand';
import type { CartLine, ProductItem } from '../types';
import { changeCart, reconcileCart } from '../features/cart/cart';
import { loadCart, saveCart } from '../storage/cart-storage';

type CartState = {
  lines: CartLine[];
  items: ReadonlyMap<number, ProductItem>;
  catalogStatus: 'loading' | 'ready' | 'error';
  add: (id: number) => void;
  remove: (id: number) => void;
  setCatalog: (items: ReadonlyMap<number, ProductItem>) => void;
  startCatalogLoad: () => void;
  failCatalogLoad: () => void;
};

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  items: new Map(),
  catalogStatus: 'loading',
  startCatalogLoad: () => set({ catalogStatus: 'loading' }),
  failCatalogLoad: () => set({ catalogStatus: 'error' }),
  add: (id) => set((state) => {
    if (state.catalogStatus !== 'ready') return state;
    const change = changeCart(state.lines, state.items, id, 'add');
    return change ? { lines: change.lines } : state;
  }),
  remove: (id) => set((state) => {
    if (state.catalogStatus !== 'ready') return state;
    const change = changeCart(state.lines, state.items, id, 'remove');
    return change ? { lines: change.lines } : state;
  }),
  setCatalog: (items) => set((state) => ({
    items,
    catalogStatus: 'ready',
    lines: reconcileCart(state.lines, (id) => items.get(id)?.stock ?? 0),
  })),
}));

const unsubscribe = useCartStore.subscribe((state, previous) => {
  if (state.lines !== previous.lines) saveCart(state.lines);
});

if (import.meta.hot) import.meta.hot.dispose(unsubscribe);
