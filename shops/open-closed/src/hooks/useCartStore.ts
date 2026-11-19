import { create } from 'zustand'
import { addItem, removeItem } from '../cart/cart.ts'
import { loadCart, saveCart } from '../storage/cart.ts'
import type { Cart } from '../types.ts'

type CartState = {
  cart: Cart
  add: (id: number) => void
  remove: (id: number) => void
}

export const useCartStore = create<CartState>()((set) => ({
  cart: loadCart(),
  add: (id) => set((s) => ({ cart: addItem(s.cart, id) })),
  remove: (id) => set((s) => ({ cart: removeItem(s.cart, id) })),
}))

// Save after each cart change
useCartStore.subscribe((s, prev) => {
  if (s.cart !== prev.cart) saveCart(s.cart)
})