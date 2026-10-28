import type { Banner, Home } from "../types"

export function createSideBanner(
    sideData: Banner,
    onNavigate: (event: MouseEvent) => void
): HTMLElement {
    const side = document.createElement("article")
    side.className = "hero-side promo-side"

    const heading = document.createElement("h3")
    heading.className = "hero-side__title"
    heading.textContent = sideData.title
    const emoji = document.createElement("span")
    emoji.className = "hero-side__emoji"
    emoji.textContent = sideData.emoji
    emoji.setAttribute("aria-hidden", "true")
    heading.prepend(emoji)

    const text = document.createElement("p")
    text.className = "hero-side__text"
    text.textContent = sideData.text
    const link = document.createElement("a")
    link.className = "button button--primary"
    link.textContent = sideData.cta.label
    link.href = sideData.cta.href
    link.addEventListener("click", onNavigate)

    side.append(heading, text, link)
    return side
}

export function createPromoCard(
    promo: Home["promos"][number],
    onNavigate: (event: MouseEvent) => void
): HTMLElement {
    const card = document.createElement("article")
    card.className = "promo-card promo-card--api"
    card.style.backgroundColor = promo.color

    const heading = document.createElement("h3")
    heading.className = "promo-card__title"
    heading.textContent = promo.text
    const link = document.createElement("a")
    link.className = "button button--dark"
    link.textContent = "مشاهده کالاها"
    link.href = promo.href
    link.addEventListener("click", onNavigate)

    const emoji = document.createElement("span")
    emoji.className = "promo-card__art promo-card__emoji"
    emoji.textContent = promo.emoji
    emoji.setAttribute("aria-hidden", "true")

    card.append(heading, link, emoji)
    return card
}