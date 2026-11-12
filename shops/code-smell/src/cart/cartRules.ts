import type { Cart, CartItem, CartRowData, Offer, Product } from "../types"
import { getFinalPrice, getProductOffer } from "../catalog/getProductCardData"

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

export function removeFromCart(cart: Cart, id: number): Cart {
    const updatedCart = { ...cart }
    delete updatedCart[String(id)]

    return updatedCart
}

export function cartRows(
    cart: Cart,
    products: Product[],
    offers: Offer[]
): CartRowData[] {
    const selectedProducts = products.filter(function (product) {
        return (cart[String(product.id)] ?? 0) > 0
    })

    return selectedProducts.map(function (product) {
        const quantity = cart[String(product.id)] ?? 0
        const offer = getProductOffer(product.id, offers)
        const finalPrice = getFinalPrice(product, offer)

        return {
            ...product,
            quantity,
            lineTotal: finalPrice * quantity
        }
    })
}

export function cartTotal(rows: CartRowData[]): number {
    let total = 0

    rows.forEach(function (row) {
        total += row.lineTotal
    })

    return total
}