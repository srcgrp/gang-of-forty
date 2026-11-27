import { create } from "zustand"
import type { CartItem, CartProduct} from "../types"
import { loadCart, saveCart } from "../storage/cart"
import { addToCart, decreaseItem } from "../cart/cartItems"

type CartState = {
  items: CartItem[]
  add: (product: CartProduct) => void
  remove: (id: number) => void
}

export const useCartStore = create<CartState>()((set) => ({
  items: loadCart(),
  add: (product) => set((s) => ({ items: addToCart(s.items, product) })),
  remove: (id) => set((s) => ({ items: decreaseItem(s.items, id) })),
}))

useCartStore.subscribe((state) => saveCart(state.items))