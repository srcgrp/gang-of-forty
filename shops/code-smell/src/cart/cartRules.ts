import type { Cart, CartItem } from "../types"

export function cartCount(cart: Cart): number {
    let count = 0

    Object.values(cart).forEach(function (quantity) {
        count += quantity
    })

    return count
}

export function addToCart(cart: Cart, cartItem: CartItem): Cart {
    const updatedCart = { ...cart }
    const productId = String(cartItem.id)

    updatedCart[productId] =
        (updatedCart[productId] ?? 0) + cartItem.quantity

    return updatedCart
}