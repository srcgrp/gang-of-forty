import { create } from 'zustand'
import type { CartLine, Product } from '../types'
import { addToCart, removeFromCart, getCartItemCount, getCartTotal } from '../cart'
import { loadCart, saveCart } from '../storage/cartStorage'

interface CartState {
  lines: CartLine[]
  itemCount: number
}

interface CartActions {
  add: (productId: number) => void
  remove: (productId: number) => void
  getTotal: (products: Product[]) => number
}

export type CartStore = CartState & CartActions

export const useCartStore = create<CartStore>((set, get) => {
  const initialLines = loadCart()

  return {
    lines: initialLines,
    itemCount: getCartItemCount(initialLines),

    add: (productId: number) => {
      set((state) => {
        const newLines = addToCart(state.lines, productId)
        saveCart(newLines)
        return {
          lines: newLines,
          itemCount: getCartItemCount(newLines),
        }
      })
    },

    remove: (productId: number) => {
      set((state) => {
        const newLines = removeFromCart(state.lines, productId)
        saveCart(newLines)
        return {
          lines: newLines,
          itemCount: getCartItemCount(newLines),
        }
      })
    },

    getTotal: (products: Product[]) => {
      return getCartTotal(get().lines, products)
    },
  }
})
