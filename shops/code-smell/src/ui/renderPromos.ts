import type { Home } from "../types"
import { createSideBanner, createPromoCard } from "./promoBanners"
import { createDiscountCard } from "./discountCard"

export function renderPromos(
    home: Home,
    onNavigate: (event: MouseEvent) => void
): void {
    const section = document.querySelector<HTMLElement>("#special-offers")

    if (section) {
        section.setAttribute("aria-labelledby", "special-offers-title")

        const container = document.createElement("div")
        container.className = "container"

        const sectionHeader = document.createElement("header")
        sectionHeader.className = "section__header"

        const sectionTitle = document.createElement("h2")
        sectionTitle.className = "section__title"
        sectionTitle.textContent = "پیشنهاد ویژه"
        sectionTitle.id = "special-offers-title"

        const sectionSubtitle = document.createElement("p")
        sectionSubtitle.className = "section__subtitle"
        sectionSubtitle.textContent = "فرصت‌های محدود این هفته را از دست ندهید."

        sectionHeader.append(sectionTitle, sectionSubtitle)

        const grid = document.createElement("div")
        grid.className = "promo-grid"

        home.promos.forEach(function (promo) {
            grid.append(createPromoCard(promo, onNavigate))
        })

        grid.append(
            createDiscountCard(),
            createSideBanner(home.side, onNavigate)
        )

        container.append(sectionHeader, grid)
        section.replaceChildren(container)
        section.hidden = false
    }
}