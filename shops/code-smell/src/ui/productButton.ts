import type { Product, CartItem } from "../types"

export function createAddButton(
    product: Product,
    isUnavailable: boolean,
    onAddToCart: (item: CartItem) => void
): HTMLButtonElement {
    const button = document.createElement("button")
    button.className = "button button--secondary button--block"
    button.type = "button"
    button.disabled = isUnavailable

    const buttonLabel = isUnavailable
        ? product.name + ": ناموجود"
        : "افزودن به سبد خرید:" + " " + product.name

    button.setAttribute("aria-label", buttonLabel)

    const plus = document.createElement("span")
    plus.textContent = "+"
    plus.setAttribute("aria-hidden", "true")

    const text = document.createElement("span")
    text.textContent = isUnavailable
        ? "ناموجود"
        : "افزودن به سبد خرید"

    button.append(plus, text)

    button.addEventListener("click", function () {
        onAddToCart({
            id: product.id,
            quantity: 1
        })
    })

    return button
}