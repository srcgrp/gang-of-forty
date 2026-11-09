import type { Shop } from "../types"
import { shopContent } from "./shopContent"
import { createGuideFaq } from "./guideFaq"

const numberFormat = new Intl.NumberFormat("fa-IR")

export function renderGuide(shop: Shop): void {
    const section = document.querySelector<HTMLElement>("#shopping-guide")
    if (section) {
        const data = shopContent.guide
        section.setAttribute("aria-labelledby", "shopping-guide-title")

        const container = document.createElement("div")
        container.className = "container"
        const header = document.createElement("header")
        header.className = "section__header"
        const title = document.createElement("h2")
        title.className = "section__title"
        title.id = "shopping-guide-title"
        title.textContent = data.title
        const subtitle = document.createElement("p")
        subtitle.className = "section__subtitle"
        subtitle.textContent = data.subtitle
        header.append(title, subtitle)

        const cards = document.createElement("div")
        cards.className = "guide__cards"
        const schedule = shop.schedule.map(function (entry) {
            return entry.days + " " + "از" + " " + entry.time
        }).join(" " + "و" + " ")

        data.cards.forEach(function (item) {
            const card = document.createElement("article")
            card.className = "info-card"
            card.id = item.id
            let text = item.text
            if (item.id === "shipping") {
                text =
                    "سفارش‌ها در بازه‌های دوساعته ارسال می‌شوند؛" + " " +
                    schedule + ". ارسال سفارش‌های بالای" + " " +
                    numberFormat.format(shop.freeDeliveryOver) + " " +
                    shop.currency + " " + "رایگان است."
            }

            const heading = document.createElement("h3")
            heading.className = "info-card__title"
            heading.textContent = item.title
            const description = document.createElement("p")
            description.className = "info-card__text"
            description.textContent = text
            card.append(heading, description)
            cards.append(card)
        })

        const guide = document.createElement("div")
        guide.className = "guide"
        guide.append(cards, createGuideFaq(shop))
        container.append(header, guide)
        section.replaceChildren(container)
        section.hidden = false
    }
}