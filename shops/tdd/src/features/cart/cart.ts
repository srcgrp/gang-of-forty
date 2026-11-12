import type { CartLine, Product } from '../../shared/types'

export function addToCart(cart: CartLine[], productId: number): CartLine[] {
    const line = cart.find(item => item.productId === productId)
    return line
        ? cart.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
        : [...cart, { productId, quantity: 1 }]
}

export function removeFromCart(cart: CartLine[], productId: number): CartLine[] {
    return cart.filter(item => item.productId !== productId)
}

export function cartCount(cart: CartLine[]): number {
    return cart.reduce((count, item) => count + item.quantity, 0)
}

export function cartTotal(cart: CartLine[], products: Product[]): number {
    return cart.reduce((total, item) => {
        const product = products.find(entry => entry.id === item.productId)
        return total + (product ? product.price * item.quantity : 0)
    }, 0)
}
