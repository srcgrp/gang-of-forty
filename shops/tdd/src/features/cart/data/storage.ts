import type { CartLine } from '../../../shared/types'

const CART_KEY = "tdd:w5:cart"

export function loadCart(): CartLine[] {
    try {
        const saved = localStorage.getItem(CART_KEY)
        if (!saved) return []
        const cart: unknown = JSON.parse(saved)
        if (!Array.isArray(cart)) return []
        return cart.filter((item): item is CartLine =>
            typeof item.productId === 'number' &&
            Number.isInteger(item.productId) &&
            item.productId > 0 &&
            typeof item.quantity === 'number' &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        )
    } catch {
        return []
    }
}

export function saveCart(cart: CartLine[]): void {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch {
        return
    }
}
