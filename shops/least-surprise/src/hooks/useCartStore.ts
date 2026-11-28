
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, ProductWithDetails } from '../types'
import {
  addToCart,
  removeFromCart,
  calculateTotalCount,
  calculateTotalPrice,
} from '../cart/cart'

type CartState = {
  cart: CartItem[]
  addItem: (product: ProductWithDetails) => void
  removeItem: (productId: string | number) => void
  totalCount: () => number
  totalPrice: () => number
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (product) =>
        set((state) => ({
          cart: addToCart(state.cart, product, product.stock),
        })),

      removeItem: (productId) =>
        set((state) => ({
          cart: removeFromCart(state.cart, productId),
        })),
      clearCart: () => set({ cart: [] }),
      totalCount: () => calculateTotalCount(get().cart),

      totalPrice: () => calculateTotalPrice(get().cart),
    }),
    {
      name: 'least-surprise-cart',
    },
  ),
)
