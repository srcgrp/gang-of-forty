import { create } from 'zustand';
import type { CartLine, Product, Stock } from '../types';
import { addToCart, removeFromCart, reconcileCart } from '../cart/rules';
import { loadCart, saveCart } from '../storage/cart';
type CartState = {
    lines: CartLine[]; stock: Stock;
    add: (id: number) => void; remove: (id: number) => void;
    sync: (products: Product[], stock: Stock) => void;
};
export const useCartStore = create<CartState>()(set => ({
    lines: loadCart(), stock: { updatedAt: '', items: {} },
    add: id => set(state => ({ lines: addToCart(state.lines, id, state.stock) })),
    remove: id => set(state => ({ lines: removeFromCart(state.lines, id) })),
    sync: (products, stock) => set(state => ({
        stock, lines: reconcileCart(state.lines, products, stock)
    }))
}));
useCartStore.subscribe((state, previous) => {
    if (state.lines !== previous.lines) saveCart(state.lines);
});
