import type { HomePromo } from '../types'
import { createTextElement, createLink } from './elements'

export function renderPromos(promoData: HomePromo[]): void {
    const promos = document.querySelector<HTMLElement>("#home-promos")
    if (!promos) throw new Error("Missing home promos")
    promos.replaceChildren()
    promoData.forEach((promo, index) => {
        const article = document.createElement("article")
        article.className = index % 2 === 0 ? "promo promo-primary" : "promo promo-secondary"
        const content = document.createElement("div")
        content.append(
            createTextElement("h2", promo.text),
            createLink("مشاهده محصولات", promo.href)
        )
        const emoji = createTextElement("span", promo.emoji)
        emoji.setAttribute("aria-hidden", "true")
        article.append(content, emoji)
        promos.append(article)
    })
}
