import { create } from 'zustand'
import { addToCart, changeQuantity, removeFromCart } from '../features/cart/calculate'
import { readCart, writeCart } from '../storage/cart'
import type { CartItem } from '../types'

type CartState = {
  items: CartItem[]
  add: (id: number) => void
  remove: (id: number) => void
  change: (id: number, delta: number) => void
    clear: () => void

}

export const useCartStore = create<CartState>()((set) => ({
 items: readCart(),
  add: (id) => set((s) => ({ items: addToCart(s.items, id) })),
  remove: (id) => set((s) => ({ items: removeFromCart(s.items, id) })),
  change: (id, delta) => set((s) => ({ items: changeQuantity(s.items, id, delta) })),
  clear: () => set({ items: [] }),
}))

useCartStore.subscribe((s) => writeCart(s.items))