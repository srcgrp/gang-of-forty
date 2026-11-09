import type { Product, Offer } from "../types"

const numberFormat = new Intl.NumberFormat("fa-IR")

export function createProductMedia(
    product: Product,
    offer: Offer | undefined,
    isUnavailable: boolean
): HTMLDivElement {
    const media = document.createElement("div")
    media.className = "product-card__media"
    const productEmoji = document.createElement("span")
    productEmoji.className = "product-card__emoji"
    productEmoji.textContent = product.emoji
    productEmoji.setAttribute("aria-hidden", "true")
    media.append(productEmoji)

    if (offer) {
        const badge = document.createElement("span")
        badge.className = "badge product-card__badge"
        badge.textContent = numberFormat.format(offer.percent) + "٪ تخفیف"
        media.append(badge)
    }
    if (isUnavailable) {
        const badge = document.createElement("span")
        badge.className = "badge product-card__stock"
        badge.textContent = "ناموجود"
        media.append(badge)
    }
    return media
}

export function createProductPrice(
    product: Product,
    offer: Offer | undefined,
    finalPrice: number,
    currency: string
): HTMLParagraphElement {
    const price = document.createElement("p")
    price.className = "price"

    if (offer) {
        const oldPrice = document.createElement("del")
        oldPrice.className = "price__old"
        oldPrice.textContent = numberFormat.format(product.price)
        price.append(oldPrice)
    }

    const currentPrice = document.createElement("span")
    currentPrice.className = "price__current"
    currentPrice.textContent = numberFormat.format(finalPrice) + " "
    const priceUnit = document.createElement("span")
    priceUnit.className = "price__unit"
    priceUnit.textContent = currency
    currentPrice.append(priceUnit)
    price.append(currentPrice)
    return price
}