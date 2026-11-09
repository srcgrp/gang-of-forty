import type { Category, Shop } from "../types"
import { createFooterAbout } from "./footerAbout"
import { createFooterLinks, createFooterHours } from "./footerColumns"

export function renderFooter(
    currentShop: Shop,
    categories: Category[],
    shopName: string,
    onNavigate: (event: MouseEvent) => void
): void {
    const footer = document.querySelector<HTMLElement>("#footer")

    if (footer) {
        const categoryLinks = categories.map(function (category) {
            return { label: category.name, href: "#" + category.slug }
        })
        const helpTargets = ["#shipping", "#returns", "#faq"]
        const helpLinks = currentShop.help.map(function (entry, index) {
            return {
                label: entry.label,
                href: entry.href === "#" ? helpTargets[index] : entry.href
            }
        })

        const grid = document.createElement("div")
        grid.className = "site-footer__grid container"
        grid.append(
            createFooterAbout(currentShop, shopName),
            createFooterLinks(
                "دسته‌بندی کالاها",
                "footer-categories-title",
                categoryLinks,
                onNavigate
            ),
            createFooterLinks(
                "راهنمای خرید",
                "footer-guide-title",
                helpLinks,
                onNavigate
            ),
            createFooterHours(currentShop)
        )

        const bottom = document.createElement("div")
        bottom.className = "site-footer__bottom container"
        const copyright = document.createElement("p")
        copyright.className = "copyright"
        copyright.textContent = currentShop.copyright.replaceAll(
            currentShop.name,
            shopName
        )

        const backToTopLink = document.createElement("a")
        backToTopLink.className = "back-to-top"
        backToTopLink.textContent = "بازگشت به بالا"
        backToTopLink.href = "#top"
        backToTopLink.addEventListener("click", onNavigate)
        bottom.append(copyright, backToTopLink)

        const contactAnchor = document.createElement("span")
        contactAnchor.className = "category-anchor"
        contactAnchor.id = "contact"
        footer.replaceChildren(contactAnchor, grid, bottom)
        footer.hidden = false
    }
}