import type { ProductCardData, CarouselWithProducts, CartItem } from "../types"
import { createProductCard } from "./productCard"
import { createCarousel } from "./carousel"

export function renderCarouselProducts(
    section: HTMLElement,
    products: ProductCardData[],
    currency: string,
    onAddToCart: (item: CartItem) => void
): void {
    const list = section.querySelector<HTMLUListElement>(".product-grid")
    const status = section.querySelector<HTMLParagraphElement>(".catalog-status")
    if (list && status) {
        list.replaceChildren()
        products.forEach(function (product, index) {
            const card = createProductCard(
                product,
                section.id,
                index,
                currency,
                onAddToCart
            )
            list.append(card)
        })
        const hasProducts = products.length > 0
        list.hidden = !hasProducts
        list.setAttribute("aria-busy", "false")
        status.textContent = hasProducts ? "" : "کالایی پیدا نشد!"
        status.hidden = hasProducts
        section.querySelectorAll<HTMLAnchorElement>(".carousel-controls a").forEach(
            function (control, index) {
                const itemIndex = index === 0 ? 1 : products.length || 1
                control.href = "#" + section.id + "-item-" + itemIndex
                if (hasProducts) {
                    control.removeAttribute("aria-disabled")
                } else {
                    control.setAttribute("aria-disabled", "true")
                }
                control.tabIndex = hasProducts ? 0 : -1
            }
        )
        list.scrollLeft = 0
    }
}

export function renderCarousels(
    carousels: CarouselWithProducts[],
    currency: string,
    onAddToCart: (item: CartItem) => void
): void {
    const root = document.querySelector<HTMLDivElement>("#carousels-root")
    if (root) {
        root.replaceChildren()
        carousels.forEach(function (carousel, index) {
            const section = createCarousel(carousel, index)
            renderCarouselProducts(
                section,
                carousel.products,
                currency,
                onAddToCart
            )
            root.append(section)
        })
    }
}