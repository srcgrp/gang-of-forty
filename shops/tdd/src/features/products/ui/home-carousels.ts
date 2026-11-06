import type { CarouselConfig, Product, Offer } from '../../../shared/types'
import { createTextElement, createLink } from '../../../shared/ui/elements'
import { renderProducts } from './product-carousel'

export function renderHomeCarousels(configurations: CarouselConfig[], productsByCarousel: Map<string, Product[]>, unavailableByProduct: Map<number, boolean>, offers: Map<number, Offer>, finalPrices: Map<number, number>, onAdd: () => void): void {
    const container = document.querySelector<HTMLDivElement>("#home-carousels")
    if (!container) throw new Error("Missing home carousels")
    container.replaceChildren()
    configurations.forEach(config => {
        const section = document.createElement("section")
        section.className = "product-carousel"
        section.id = config.id
        const headingId = `${config.id}-title`
        section.setAttribute("aria-labelledby", headingId)
        const header = document.createElement("header")
        header.className = "section-heading"
        const heading = createTextElement("h2", `${config.emoji} ${config.title}`)
        heading.id = headingId
        header.append(heading)

        const controls = document.createElement("nav")
        controls.className = "carousel-controls"
        controls.id = `${config.id}-controls`
        controls.setAttribute("aria-label", `کنترل‌های ${config.title}`)
        controls.append(
            createLink("اولین محصول →", `#${config.id}-first`),
            createLink("آخرین محصول ←", `#${config.id}-last`)
        )
        const status = createTextElement("p", "", "carousel-status")
        status.setAttribute("role", "status")
        const track = document.createElement("section")
        track.id = `${config.id}-track`
        track.className = "product-track"
        track.tabIndex = 0
        track.setAttribute("aria-label", `محصولات ${config.title}`)
        section.append(header, controls, status, track)
        container.append(section)

        const selected = productsByCarousel.get(config.id) ?? []
        renderProducts({ prefix: config.id, track, controls, status }, selected, unavailableByProduct, offers, finalPrices, onAdd)
    })
}
