import { create } from 'zustand'
import { addToCart, removeFromCart } from '../features/cart/rules/lines.ts'
import { loadCart, saveCart } from '../features/cart/storage/cartStorage.ts'
import type { CartLine } from '../shared/types.ts'

type CartState = {
    lines: CartLine[]
    add: (id: number) => void
    remove: (id:number) => void
}

export const useCartStore = create<CartState>()((set) => ({
    lines: loadCart(),
    add: (id) => set((s) => ({ lines: addToCart(s.lines, id) })),
    remove: (id) => set((s) => ({ lines: removeFromCart(s.lines, id) })),
}))

useCartStore.subscribe((s) => saveCart(s.lines))