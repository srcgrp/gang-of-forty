import type { Offer, Stock } from '../../../shared/types.ts'

export function finalPrice(price: number, offer: Offer | undefined): number {
    if (!offer) return price
    return Math.round((price * (100 - offer.percent)) / 100 / 1000) * 1000
}

export function inStock(stock: Stock, id: number): boolean {
    return (stock.items[id] ?? 0) > 0
}