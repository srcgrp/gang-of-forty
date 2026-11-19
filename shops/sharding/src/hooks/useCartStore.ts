import { create } from 'zustand'
import { applyCartChange } from '../features/cart/logic/cart'
import { pruneCart } from '../features/cart/cart-rows'
import { showCartChange } from '../lib/cart-feedback'
import { loadCart, saveCart } from '../shared/storage/cart-storage'
import type { Cart, CartChange, Product, Stock } from '../shared/types'

type CartState = {
  lines: Cart
  add: (id: number, max: number) => void
  remove: (id: number, name: string) => void
  removeLine: (id: number, name: string) => void
  clear: () => void
  reconcile: (products: Product[], stock: Stock | null) => void
}

export const useCartStore = create<CartState>()((set, get) => {
  function changeCart(id: number, change: CartChange, name: string, max = 0) {
    const { cart, result } = applyCartChange(get().lines, id, change, max)
    if (showCartChange(change, name, result)) set({ lines: cart })
  }

  return {
    lines: loadCart(),
    add: (id, max) => changeCart(id, 'add', 'کالا', max),
    remove: (id, name) => changeCart(id, 'remove', name),
    removeLine: (id, name) => changeCart(id, 'remove-line', name),
    clear: () => set({ lines: {} }),
    reconcile: (products, stock) =>
      set((state) => ({ lines: pruneCart(state.lines, products, stock) })),
  }
})

useCartStore.subscribe((state, previous) => {
  if (state.lines !== previous.lines) saveCart(state.lines)
})
