import type { Category } from '../../../shared/types'
import { createTextElement, createLink } from '../../../shared/ui/elements'

export function renderCategories(categories: Category[], namesByCategory: Map<number, string[]>): void {
    const grid = document.querySelector<HTMLDivElement>("#category-grid")
    const sections = document.querySelector<HTMLElement>("#category-sections")
    const desktopMenu = document.querySelector<HTMLDivElement>("#desktop-categories")
    const mobileMenu = document.querySelector<HTMLDivElement>("#mobile-categories")
    const footerMenu = document.querySelector<HTMLElement>("#footer-categories")

    if (!grid || !sections || !desktopMenu || !mobileMenu || !footerMenu) {
        throw new Error("Missing category elements")
    }
    const menus = [desktopMenu, mobileMenu, footerMenu]

    grid.replaceChildren()
    sections.replaceChildren()
    menus.forEach(menu => menu.replaceChildren())

    categories.forEach(category => {
        const href = `#${category.slug}`
        const link = createLink("", href)
        const icon = createTextElement("span", category.emoji)
        icon.setAttribute("aria-hidden", "true")
        icon.style.background = category.color
        link.append(icon, createTextElement("strong", category.name))
        grid.append(link)

        menus.forEach(menu => menu.append(createLink(category.name, href)))

        if (!document.getElementById(category.slug)) {
            const section = document.createElement("article")
            section.id = category.slug
            section.setAttribute("aria-labelledby", `category-${category.id}-title`)
            const sectionIcon = createTextElement("span", category.emoji)
            sectionIcon.setAttribute("aria-hidden", "true")
            sectionIcon.style.background = category.color
            const copy = document.createElement("div")
            const heading = createTextElement("h2", category.name)
            heading.id = `category-${category.id}-title`
            const names = namesByCategory.get(category.id) ?? []
            copy.append(heading)
            if (names.length) {
                copy.append(createTextElement("p", names.join("، ")))
            }
            section.append(sectionIcon, copy)
            sections.append(section)
        }
    })
}
