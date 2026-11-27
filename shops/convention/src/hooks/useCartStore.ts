import { create } from 'zustand'
import { addToCart, removeFromCart, retainAvailable } from '../cart/cart'
import { loadCart, saveCart } from '../storage/cart-storage'
import type { CartItem } from '../types'

type CartState = {
  lines: CartItem[]
  add: (id: number) => void
  remove: (id: number) => void
  retainAvailable: (products: { id: number }[]) => void
  clear: () => void
}

export const useCartStore = create<CartState>()((set) => ({
  lines: loadCart(),
  add: (id) => set((state) => ({ lines: addToCart(state.lines, id) })),
  remove: (id) => set((state) => ({ lines: removeFromCart(state.lines, id) })),
  retainAvailable: (products) => set((state) => {
    const lines = retainAvailable(state.lines, products)
    return lines === state.lines ? state : { lines }
  }),
  clear: () => set({ lines: [] }),
}))

useCartStore.subscribe((state, previous) => {
  if (state.lines !== previous.lines) saveCart(state.lines)
})
