import type { Carousel } from "../types"
import { createCarouselControls } from "./carouselControls"

export function createCarousel(
    carouselData: Carousel,
    index = 0
): HTMLElement {
    const section = document.createElement("section")
    section.className = "section"
    if (index % 2 === 0) {
        section.classList.add("section--muted")
    }
    section.id = carouselData.id
    section.dataset.carousel = "true"
    section.setAttribute("aria-labelledby", carouselData.id + "-title")

    const container = document.createElement("div")
    container.className = "container"
    const header = document.createElement("header")
    header.className = "section__header section__header--carousel"
    const title = document.createElement("h2")
    title.className = "section__title"
    title.textContent = carouselData.title
    title.id = carouselData.id + "-title"

    if (carouselData.emoji) {
        const emoji = document.createElement("span")
        emoji.className = "carousel-title__emoji"
        emoji.textContent = carouselData.emoji
        emoji.setAttribute("aria-hidden", "true")
        title.prepend(emoji, document.createTextNode(" "))
    }
    header.append(title)

    const row = document.createElement("div")
    row.className = "carousel-heading-row"
    const subtitle = document.createElement("p")
    subtitle.className = "section__subtitle"
    subtitle.textContent = carouselData.source === "offers"
        ? "قیمت‌های ویژه روی کالاهای پرمصرف."
        : "خرید روزانه، تازه و به‌صرفه."
    row.append(subtitle, createCarouselControls(section, carouselData.title))
    header.append(row)

    const status = document.createElement("p")
    status.className = "catalog-status"
    status.id = carouselData.id + "-status"
    status.setAttribute("role", "status")
    const list = document.createElement("ul")
    list.className = "product-grid"
    list.tabIndex = 0
    list.setAttribute("aria-label", "کاروسل" + " " + carouselData.title)
    list.setAttribute("aria-describedby", status.id)

    container.append(header, status, list)
    section.append(container)
    return section
}