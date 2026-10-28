import type { Product, Offer } from '../types'
import { priceFormatter } from './elements'

export function createProductPrices(product: Product, finalPrice: number, offer: Offer | undefined, isUnavailable: boolean, statusId: string): HTMLElement {
    const prices = document.createElement("div")
    prices.className = "product-prices"
    if (offer) {
        const previous = document.createElement("p")
        previous.className = "previous-price"
        const oldPrice = document.createElement("del")
        oldPrice.textContent = priceFormatter.format(product.price) + " تومان"
        previous.append("قیمت قبلی: ", oldPrice)
        prices.append(previous)
    }
    const current = document.createElement("p")
    current.className = "current-price"
    const value = document.createElement("strong")
    value.textContent = priceFormatter.format(finalPrice)
    current.append(offer ? "قیمت با تخفیف: " : "قیمت: ", value, " تومان")
    prices.append(current)
    if (isUnavailable) {
        const status = document.createElement("p")
        status.className = "stock-status"
        status.id = statusId
        status.textContent = "ناموجود"
        prices.append(status)
    }
    return prices
}
