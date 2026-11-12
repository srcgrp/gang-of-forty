import type { CartItem, Product } from "../types";

export function addToCart(cart: CartItem[], product: Product): CartItem[] {
    const exists = cart.some((cartItem) => cartItem.id === product.id)
    if (exists) {
      return cart.map((cartItem) => cartItem.id === product.id ? {...cartItem , qty : cartItem.qty + 1} : cartItem)
    }
    return [...cart, {id: product.id, name: product.name, price: product.price, qty: 1 }]
    
}

export function decreaseItem(cart: CartItem[], id: number): CartItem[] {
    return cart
            .map((cartItem) => cartItem.id === id ? {...cartItem , qty : cartItem.qty - 1} : cartItem)
            .filter((cartItem) => cartItem.qty > 0)
}