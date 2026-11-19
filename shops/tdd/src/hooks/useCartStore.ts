import { create } from 'zustand'
import type { CartLine } from '../shared/types'
import { addToCart, removeFromCart } from '../features/cart/cart'
import { loadCart, saveCart } from '../features/cart/data/storage'

type CartState = {
    lines: CartLine[]
    add: (id: number) => void
    remove: (id: number) => void
    clear: () => void
}

export const useCartStore = create<CartState>()((set) => ({
    lines: loadCart(),
    add: (id) => set(s => ({ lines: addToCart(s.lines, id) })),
    remove: (id) => set(s => ({ lines: removeFromCart(s.lines, id) })),
    clear: () => set({ lines: [] }),
}))

useCartStore.subscribe(s => saveCart(s.lines))
