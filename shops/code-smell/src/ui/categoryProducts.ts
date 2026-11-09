import type { Category, ProductCardData, CartItem } from "../types"
import { createCarousel } from "./carousel"
import { renderCarouselProducts } from "./carouselProducts"

const numberFormat = new Intl.NumberFormat("fa-IR")

export function renderCategoryProducts(
    category: Category,
    products: ProductCardData[],
    currency: string,
    onNavigate: (event: MouseEvent) => void,
    onAddToCart: (item: CartItem) => void
): void {
    const root = document.querySelector<HTMLDivElement>("#results-root")
    if (root) {
        const section = createCarousel({
            id: "filtered-products",
            title: category.name,
            emoji: category.emoji
        })
        const anchor = document.createElement("span")
        anchor.className = "category-anchor"
        anchor.id = category.slug
        section.prepend(anchor)

        const summary = document.createElement("p")
        summary.className = "filter-summary"
        summary.textContent =
            numberFormat.format(products.length) +
            " " + "کالا در دسته ی" + " " + category.name

        const reset = document.createElement("a")
        reset.className = "button button--secondary"
        reset.textContent = "مشاهده‌ همه‌ی دسته‌ها"
        reset.href = "#categories"
        reset.addEventListener("click", onNavigate)

        const title = section.querySelector<HTMLHeadingElement>(
            ".section__title"
        )
        const subtitle = section.querySelector<HTMLParagraphElement>(
            ".section__subtitle"
        )
        if (title) {
            const row = document.createElement("div")
            row.className = "filtered-heading"
            title.before(row)
            row.append(title, reset)
        }
        if (subtitle) {
            const description = document.createElement("div")
            description.className = "filtered-description"
            description.append(summary)
            subtitle.replaceWith(description)
        }

        renderCarouselProducts(section, products, currency, onAddToCart)
        root.replaceChildren(section)
    }
}