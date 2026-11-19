import {create} from 'zustand';

import {addToCart, decreaseCartQuantity, removeFromCart} from '../cart/cart';
import {loadCart, saveCart} from '../storage/cart';

import type {CartLine} from '../types';

type CartState = {
    lines: CartLine[];
    add: (productId: number) => void;
    decrease: (productId: number) => void;
    remove: (productId: number) => void;
};

export const useCartStore = create<CartState>()((set) => ({
    lines: loadCart(),

    add: (productId) =>
        set((state) => ({
            lines: addToCart(state.lines, productId),
        })),

    decrease: (productId) =>
        set((state) => ({
            lines: decreaseCartQuantity(state.lines, productId),
        })),

    remove: (productId) =>
        set((state) => ({
            lines: removeFromCart(state.lines, productId),
        })),
}));

useCartStore.subscribe((state) => {
    saveCart(state.lines);
});
