import type { Product, Offer } from '../types'
import { priceFormatter } from './elements'

export function createProductImage(product: Product, offer: Offer | undefined, isUnavailable: boolean): HTMLElement {
    const image = document.createElement("div")
    image.className = "product-image"
    const icon = document.createElement("span")
    icon.className = "product-icon"
    icon.setAttribute("aria-hidden", "true")
    icon.textContent = product.emoji
    image.append(icon)

    if (offer) {
        const badge = document.createElement("span")
        badge.className = "discount-badge"
        badge.textContent = priceFormatter.format(offer.percent) + "٪ تخفیف"
        image.append(badge)
    }
    if (isUnavailable) {
        const badge = document.createElement("span")
        badge.className = "stock-badge"
        badge.textContent = "ناموجود"
        badge.setAttribute("aria-hidden", "true")
        image.append(badge)
    }
    return image
}
