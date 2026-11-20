import { create } from 'zustand'
import { addToCart, removeFromCart } from '../cart/cart'
import { loadCart, saveCart } from '../storage/storage'
import type { CartLine } from '../types'

type CartState = {
  lines: CartLine[]
  add: (id: number) => void
  remove: (id: number) => void
}

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  remove: (id) =>
    set((s) => ({ lines: removeFromCart(s.lines, id) })),
  add: (id) =>
    set((s) => ({ lines: addToCart(s.lines, id) })),
}))

useCartStore.subscribe((s) => saveCart(s.lines))
