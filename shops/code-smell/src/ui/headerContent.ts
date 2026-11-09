import Typed from "typed.js"
import type { Category, Shop } from "../types"
import { createCategoryMenu } from "./categoryMenu"

function createMainMenu(
    isMobile: boolean,
    shop: Shop,
    categories: Category[],
    onNavigate: (event: MouseEvent) => void
): HTMLUListElement {
    const list = document.createElement("ul")
    list.className = "site-nav__list container"
    list.append(createCategoryMenu(isMobile, categories, onNavigate))
    shop.menu.forEach(function (entry) {
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.className = "site-nav__link"
        link.textContent = entry.label
        link.href = entry.href
        link.addEventListener("click", onNavigate)
        item.append(link)
        list.append(item)
    })
    return list
}

export function renderHeader(
    shop: Shop,
    categories: Category[],
    productCountText: string,
    onNavigate: (event: MouseEvent) => void
): void {
    const announcement = document.querySelector<HTMLElement>("#announcement")
    const brandTagline = document.querySelector<HTMLElement>(".brand__tagline")
    const siteNav = document.querySelector<HTMLElement>("#site-nav")
    if (announcement && brandTagline && siteNav) {
        announcement.textContent = ""
        new Typed(announcement, {
            strings: [shop.notice],
            typeSpeed: 30,
            loop: true,
            showCursor: false,
            contentType: "null"
        })
        brandTagline.textContent = shop.slogan
        siteNav.replaceChildren(
            createMainMenu(false, shop, categories, onNavigate)
        )
    }
    const mobileMenu = document.querySelector<HTMLDetailsElement>("#mobile-menu")
    const summary = document.createElement("summary")
    summary.className = "menu-toggle"
    summary.textContent = "☰"
    summary.setAttribute("aria-label", "منوی اصلی")
    const mobileNav = document.createElement("nav")
    mobileNav.className = "mobile-nav"
    mobileNav.setAttribute("aria-label", "منوی اصلی موبایل")
    mobileNav.append(createMainMenu(true, shop, categories, onNavigate))
    if (mobileMenu) {
        mobileMenu.replaceChildren(summary, mobileNav)
    }
    const search = document.querySelector<HTMLInputElement>("#product-search")
    if (search) {
        search.disabled = false
        search.placeholder =
            "جستجو در میان" + " " + productCountText + " " + "کالا..."
    }
}