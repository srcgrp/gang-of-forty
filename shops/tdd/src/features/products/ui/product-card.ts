import type { Product, Offer } from '../../../shared/types'
import { createProductImage } from './product-image'
import { createProductPrices } from './product-prices'

export function createProductCard(product: Product, cardId: string, isUnavailable: boolean, offer: Offer | undefined, finalPrice: number, onAdd: () => void): HTMLElement {
    const titleId = cardId + "-name"
    const statusId = cardId + "-status"
    const card = document.createElement("article")
    card.className = "product-card"
    card.id = cardId
    card.setAttribute("aria-labelledby", titleId)
    card.classList.toggle("is-unavailable", isUnavailable)

    const title = document.createElement("h3")
    title.id = titleId
    title.textContent = product.name
    const amount = document.createElement("p")
    amount.className = "product-amount"
    amount.textContent = product.unit

    const button = document.createElement("button")
    button.className = "add-button"
    button.type = "button"
    button.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید")
    button.disabled = isUnavailable
    button.addEventListener("click", onAdd)
    const buttonIcon = document.createElement("span")
    buttonIcon.setAttribute("aria-hidden", "true")
    buttonIcon.textContent = isUnavailable ? "×" : "+"
    button.append("افزودن به سبد ", buttonIcon)

    card.append(createProductImage(product, offer, isUnavailable), title, amount,
        createProductPrices(product, finalPrice, offer, isUnavailable, statusId), button)
    if (isUnavailable) card.setAttribute("aria-describedby", statusId)
    return card
}
