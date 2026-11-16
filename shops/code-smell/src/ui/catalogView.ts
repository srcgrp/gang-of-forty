import type { Category, ShopData, CarouselWithProducts, CartItem } from "../types"
import { renderCategoryProducts } from "./categoryProducts"
import { renderCarousels } from "./carouselProducts"

export function updateCategoryLinks(
    categories: Category[],
    activeCategory: Category | null
): void {
    categories.forEach(function (category) {
        const selector = "a[href=\"#" + category.slug + "\"]"
        document.querySelectorAll<HTMLAnchorElement>(selector).forEach(
            function (anchor) {
                if (activeCategory && activeCategory.id === category.id) {
                    anchor.setAttribute("aria-current", "true")
                } else {
                    anchor.removeAttribute("aria-current")
                }
            }
        )
    })
}

export function showCategoryResults(isFiltered: boolean): void {
    const carousels = document.querySelector<HTMLElement>("#carousels-root")
    const results = document.querySelector<HTMLElement>("#results-root")

    if (carousels && results) {
        carousels.hidden = isFiltered
        results.hidden = !isFiltered

        if (isFiltered) {
            carousels.replaceChildren()
        } else {
            results.replaceChildren()
        }
    }
}

export function renderCatalogView(
    data: ShopData,
    category: Category | null,
    carousels: CarouselWithProducts[],
    onNavigate: (event: MouseEvent) => void,
    onAddToCart: (item: CartItem) => void
): void {
    updateCategoryLinks(data.categories, category)
    showCategoryResults(category !== null)

    if (category) {
        const cards = carousels[0]?.products ?? []
        renderCategoryProducts(
            category,
            cards,
            data.shop.currency,
            onNavigate,
            onAddToCart
        )
    } else {
        renderCarousels(carousels, data.shop.currency, onAddToCart)
    }
}