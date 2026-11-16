import type { ProductCardData, CartItem } from "../types"
import { createProductMedia, createProductPrice } from "./productDetails"
import { createAddButton } from "./productButton"

export function createProductCard(
    product: ProductCardData,
    sectionId: string,
    index: number,
    currency: string,
    onAddToCart: (item: CartItem) => void
): HTMLLIElement {
    const item = document.createElement("li")
    item.id = sectionId + "-item-" + (index + 1)
    item.tabIndex = -1

    const card = document.createElement("article")
    card.className = "product-card"
    if (product.isUnavailable) {
        card.classList.add("product-card--unavailable")
    }

    const tags = document.createElement("p")
    tags.className = "product-card__tags"
    tags.textContent = product.tags.join(" · ")
    tags.hidden = product.tags.length === 0

    const category = document.createElement("p")
    category.className = "product-card__category"
    category.textContent = product.categoryName

    const title = document.createElement("h3")
    title.className = "product-card__title"
    title.textContent = product.name

    const unit = document.createElement("p")
    unit.className = "product-card__unit"
    unit.textContent = product.unit

    card.append(
        createProductMedia(product, product.offer, product.isUnavailable),
        category,
        title,
        unit,
        tags
    )

    const footer = document.createElement("div")
    footer.className = "product-card__footer"
    footer.append(
        createProductPrice(
            product,
            product.offer,
            product.finalPrice,
            currency
        ),
        createAddButton(product, product.isUnavailable, onAddToCart)
    )
    card.append(footer)
    item.append(card)
    return item
}