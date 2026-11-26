import type { Cart, CartItem, CartRowData, Offer, Product, Stock } from "../types"
import { getFinalPrice, getProductOffer } from "../catalog/getProductCardData"

export function cartCount(cart: Cart, products: Product[]): number {
    return products.reduce((count, product) => count + (cart[String(product.id)] ?? 0), 0)
}

export function hasStockIssue(rows: CartRowData[], stock: Stock["items"]): boolean {
    return rows.some((row) => row.quantity > (stock[String(row.id)] ?? 0))
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

export function decreaseFromCart(cart: Cart, id: number): Cart {
    const productId = String(id)
    const quantity = cart[productId] ?? 0
    if (quantity <= 1) {
        return cart
    }
    return { ...cart, [productId]: quantity - 1 }
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
