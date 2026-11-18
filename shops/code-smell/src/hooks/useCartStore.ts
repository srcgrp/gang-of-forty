import { create } from "zustand"
import type { Cart } from "../types"
import { addToCart, removeFromCart } from "../cart/cartRules"
import { loadCart, saveCart } from "../storage/cartStorage"

type CartState = {
    cart: Cart
    cartOpen: boolean
    add: (id: number) => void
    remove: (id: number) => void
    toggle: () => void
}

export const useCartStore = create<CartState>()(function (set) {
    return {
        cart: loadCart(),
        cartOpen: false,
        add: function (id) {
            set(function (state) {
                return {
                    cart: addToCart(state.cart, { id, quantity: 1 })
                }
            })
        },
        remove: function (id) {
            set(function (state) {
                return {
                    cart: removeFromCart(state.cart, id)
                }
            })
        },
        toggle: function () {
            set(function (state) {
                return {
                    cartOpen: !state.cartOpen
                }
            })
        }
    }
})

useCartStore.subscribe(function (state, previousState) {
    if (state.cart !== previousState.cart) {
        saveCart(state.cart)
    }
})