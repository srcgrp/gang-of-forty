import type { Banner, Shop } from "../types"
import { createHeroActions, createHeroFeatures } from "./heroDetails"

export function renderHero(
    hero: Banner,
    shop: Shop,
    shopName: string,
    onNavigate: (event: MouseEvent) => void
): void {
    const section = document.querySelector<HTMLElement>("#hero")

    if (section) {
        section.setAttribute("aria-labelledby", "hero-title")

        const container = document.createElement("div")
        container.className = "hero__inner container"

        const content = document.createElement("div")
        content.className = "hero__content"

        const heading = document.createElement("h1")
        heading.className = "hero__title"
        heading.textContent = hero.title
        heading.id = "hero-title"

        const heroTitleEmoji = document.createElement("span")
        heroTitleEmoji.className = "hero-title__emoji"
        heroTitleEmoji.textContent = hero.emoji
        heroTitleEmoji.setAttribute("aria-hidden", "true")
        heading.prepend(heroTitleEmoji, document.createTextNode(" "))

        const actions = createHeroActions(hero, onNavigate)
        const features = createHeroFeatures(shop)

        const heroEyebrow = document.createElement("p")
        heroEyebrow.className = "hero__eyebrow"
        heroEyebrow.textContent = shopName

        const heroText = document.createElement("p")
        heroText.className = "hero__text"
        heroText.textContent = hero.text

        content.append(heroEyebrow, heading, heroText, actions, features)

        const media = document.createElement("div")
        media.className = "hero__image-wrap"

        const heroImage = document.createElement("img")
        heroImage.className = "hero__image"
        heroImage.src = "images/Golden%20Tote.webp"
        heroImage.alt = ""
        heroImage.width = 320
        heroImage.height = 320
        heroImage.setAttribute("aria-hidden", "true")

        media.append(heroImage)
        container.append(content, media)
        section.replaceChildren(container)
        section.hidden = false
    }
}