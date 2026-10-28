import type { ShopDetails } from '../types'
import { createTextElement, createLink } from './elements'
import { renderAbout } from './about'

export function renderShop(shop: ShopDetails): void {
    const notice = document.querySelector<HTMLParagraphElement>("#shop-notice")
    const slogan = document.querySelector<HTMLElement>("#shop-slogan")
    const footerAbout = document.querySelector<HTMLParagraphElement>("#footer-about-text")
    const address = document.querySelector<HTMLElement>("#shop-address")
    if (!notice || !slogan || !footerAbout || !address) {
        throw new Error("Missing shop elements")
    }

    notice.textContent = shop.notice
    slogan.textContent = shop.slogan
    renderAbout(shop.about)
    footerAbout.textContent = shop.about

    const phone = createLink(shop.phone, `tel:${shop.phone.replace(/[^+0-9]/g, "")}`)
    phone.dir = "ltr"
    address.replaceChildren(
        document.createTextNode(shop.address),
        document.createElement("br"),
        phone
    )

    const schedule = document.querySelector<HTMLDivElement>("#shop-schedule")
    if (!schedule) throw new Error("Missing shop schedule")
    schedule.replaceChildren(createTextElement("h3", "ساعت کاری"))
    shop.schedule.forEach(entry => {
        schedule.append(createTextElement("p", `${entry.days}: ${entry.time}`))
    })

    // I Kept my own brand while using the API's copyright text.
    const brandName = document.querySelector<HTMLElement>(".brand strong")
    const copyright = document.querySelector<HTMLParagraphElement>("#shop-copyright")
    if (!brandName || !copyright) throw new Error("Missing shop footer elements")
    copyright.textContent = shop.copyright.replaceAll(shop.name, brandName.textContent)

    const navigationSelectors = [".desktop-navigation", ".mobile-navigation"]
    navigationSelectors.forEach(selector => {
        const menu = document.querySelector<HTMLElement>(selector)
        if (!menu) throw new Error(`Missing navigation: ${selector}`)
        menu.querySelectorAll<HTMLAnchorElement>("[data-shop-link]").forEach(link => link.remove())
        shop.menu.forEach(item => {
            const link = createLink(item.label, item.href)
            link.dataset.shopLink = ""
            menu.append(link)
        })
    })
}
