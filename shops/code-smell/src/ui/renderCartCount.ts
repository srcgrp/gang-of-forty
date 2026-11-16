export function renderCartCount(count: number): void {
    const cartButton = document.querySelector<HTMLButtonElement>("#cart-button")
    const cartBadge = document.querySelector<HTMLSpanElement>(".cart-button__badge")
    const countText = new Intl.NumberFormat("fa-IR").format(count)

    if (cartButton && cartBadge) {
        cartBadge.textContent = countText

        cartButton.setAttribute(
            "aria-label",
            "سبد خرید:" + " " + countText + " " + "کالا"
        )
    }
}