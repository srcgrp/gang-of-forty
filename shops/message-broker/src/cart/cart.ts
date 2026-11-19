import type { CartLine, Offer, Product } from '../types'

export type StoredCart = Record<string | number, number>

export function addToCart(cart: StoredCart, productId: number): StoredCart {
    return { ...cart, [productId]: (cart[productId] ?? 0) + 1 }
}

export function removeFromCart(cart: StoredCart, productId: number): StoredCart {
    const next = { ...cart }
    delete next[productId]
    return next
}

export function cartCount(cart: StoredCart): number {
    return Object.values(cart).reduce<number>((s, c) => s + Number(c ?? 0), 0)
}

export function cartRows(cart: StoredCart): CartLine[] {
    return Object.entries(cart).map(([id, qty]) => ({ productId: Number(id), quantity: Number(qty ?? 0) }))
}

export function finalPrice(price: number, offer?: Offer): number {
    return offer ? Math.round(price * (1 - offer.percent / 100)) : price
}

export function inStock(stockCount: number): boolean {
    return stockCount > 0
}

export function formatPrice(price: number): string {
    return price.toLocaleString('fa-IR') + ' تومان'
}

export function cartTotal(cart: StoredCart, products: Product[], offers: Offer[]): number {
    const pMap = new Map(products.map(p => [p.id, p])), oMap = new Map(offers.map(o => [o.productId, o]))
    return Object.entries(cart).reduce((sum, [id, qty]) => {
        const prod = pMap.get(Number(id))
        return prod ? sum + finalPrice(prod.price, oMap.get(prod.id)) * Number(qty ?? 0) : sum
    }, 0)
}

export function visibleProducts(products: Product[], query: string): Product[] {
    const q = query.trim().toLocaleLowerCase('fa-IR')
    return q ? products.filter(p => p.name.toLocaleLowerCase('fa-IR').includes(q)) : products
}

export function toCard(product: Product, offer?: Offer, stock = 0): { product: Product; finalPrice: number; inStock: boolean } {
    return { product, finalPrice: finalPrice(product.price, offer), inStock: inStock(stock) }
}