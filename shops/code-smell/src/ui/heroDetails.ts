import type { Banner, Shop } from "../types"

export function createHeroActions(
    hero: Banner,
    onNavigate: (event: MouseEvent) => void
): HTMLDivElement {
    const actions = document.createElement("div")
    actions.className = "hero__actions"

    const heroLink = document.createElement("a")
    heroLink.className = "button button--primary"
    heroLink.textContent = hero.cta.label
    heroLink.href = hero.cta.href
    heroLink.addEventListener("click", onNavigate)

    const categoriesLink = document.createElement("a")
    categoriesLink.className = "button button--secondary"
    categoriesLink.textContent = "دسته‌بندی کالاها"
    categoriesLink.href = "#categories"
    categoriesLink.addEventListener("click", onNavigate)

    actions.append(heroLink, categoriesLink)
    return actions
}

export function createHeroFeatures(shop: Shop): HTMLUListElement {
    const features = document.createElement("ul")
    features.className = "hero__features"
    const numberFormat = new Intl.NumberFormat("fa-IR")

    const featureTexts = [
        "ارسال در" + " " + shop.city,
        "ساعت فعالیت:" + " " + shop.hours.open +
            " " + "تا" + " " + shop.hours.close,
        "ارسال رایگان از" + " " +
            numberFormat.format(shop.freeDeliveryOver) +
            " " + shop.currency
    ]

    featureTexts.forEach(function (text) {
        const item = document.createElement("li")
        item.textContent = text
        features.append(item)
    })

    return features
}