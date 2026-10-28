import type { CartLine } from '../types'
import type { StoredCart } from '../storage/cart-storage'

export function addToCart(cart: StoredCart, productId: number): StoredCart {
    const count = cart[productId] ?? 0
    return {
        ...cart,
        [productId]: count + 1
    }
}

export function getCartTotalCount(cart: StoredCart): number {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
}

export function toCartLines(cart: StoredCart): CartLine[] {
    return Object.entries(cart).map(([id, quantity]) => ({
        productId: Number(id),
        quantity
    }))
}