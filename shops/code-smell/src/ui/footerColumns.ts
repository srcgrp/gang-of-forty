import type { Link, Shop } from "../types"

export function createFooterLinks(
    title: string,
    headingId: string,
    entries: Link[],
    onNavigate: (event: MouseEvent) => void
): HTMLElement {
    const column = document.createElement("nav")
    column.className = "footer-column"
    column.setAttribute("aria-labelledby", headingId)
    const heading = document.createElement("h2")
    heading.className = "footer-column__title"
    heading.id = headingId
    heading.textContent = title
    const list = document.createElement("ul")
    list.className = "footer-links"

    entries.forEach(function (entry) {
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.className = "footer-link"
        link.href = entry.href
        link.addEventListener("click", onNavigate)
        const arrow = document.createElement("img")
        arrow.className = "footer-link__icon"
        arrow.src = "svg/caret-left.svg"
        arrow.alt = ""
        arrow.width = 13
        arrow.height = 13
        arrow.setAttribute("aria-hidden", "true")
        link.append(arrow, document.createTextNode(entry.label))
        item.append(link)
        list.append(item)
    })

    column.append(heading, list)
    return column
}

export function createFooterHours(currentShop: Shop): HTMLElement {
    const hours = document.createElement("section")
    hours.className = "footer-column"
    hours.setAttribute("aria-labelledby", "footer-hours-title")
    const columnTitle = document.createElement("h2")
    columnTitle.className = "footer-column__title"
    columnTitle.textContent = "ساعت کاری"
    columnTitle.id = "footer-hours-title"
    hours.append(columnTitle)
    const schedule = document.createElement("ul")
    schedule.className = "footer-hours"
    currentShop.schedule.forEach(function (entry) {
        const item = document.createElement("li")
        item.className = "footer-hours__item"
        const footerIcon = document.createElement("img")
        footerIcon.className = "footer-icon"
        footerIcon.src = "svg/calendar-dots.svg"
        footerIcon.alt = ""
        footerIcon.width = 18
        footerIcon.height = 18
        footerIcon.setAttribute("aria-hidden", "true")
        const textNode = document.createElement("span")
        textNode.textContent = entry.days + ":" + " " + entry.time
        item.append(footerIcon, textNode)
        schedule.append(item)
    })
    hours.append(schedule)
    return hours
}