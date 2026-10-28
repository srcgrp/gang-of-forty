import type { CartLine } from '../types'

export type StoredCart = Record<string | number, number>

export function addToCart(cart: StoredCart, productId: number): StoredCart {
    const count = cart[productId] ?? 0
    return {
        ...cart,
        [productId]: count + 1
    }
}

export function getCartTotalCount(cart: StoredCart): number {
    return Object.values(cart).reduce<number>((sum, count) => sum + Number(count ?? 0), 0)
}

export function toCartLines(cart: StoredCart): CartLine[] {
    return Object.entries(cart).map(([id, quantity]) => ({
        productId: Number(id),
        quantity: Number(quantity ?? 0)
    }))
}