import type { HomeBanner } from '../types'
import { createTextElement, createLink } from './elements'

export function renderHero(heroData: HomeBanner): void {
    const banners = document.querySelector<HTMLDivElement>("#home-banners")
    if (!banners) throw new Error("Missing home banners")
    const hero = document.createElement("section")
    hero.className = "hero"
    hero.setAttribute("aria-labelledby", "hero-title")
    const copy = document.createElement("div")
    copy.className = "hero-copy"
    const eyebrow = createTextElement("p", "تازگی، از ارزیابی تا انتخاب", "eyebrow")
    eyebrow.prepend(document.createElement("span"))
    const title = createTextElement("h1", heroData.title)
    title.id = "hero-title"
    const actions = document.createElement("div")
    actions.className = "hero-actions"
    const primary = createLink(heroData.cta.label, heroData.cta.href)
    primary.className = "hero-primary-action"
    const secondary = createLink("داستان سام مارکت", "#about")
    secondary.className = "hero-secondary-action"
    actions.append(primary, secondary)
    const benefits = document.createElement("ul")
    benefits.className = "hero-benefits"
    const benefitsText = ["قیمت‌های روشن", "انتخاب روز", "سبد به‌صرفه"]
    benefitsText.forEach(text => {
        benefits.append(createTextElement("li", text))
    })
    copy.append(eyebrow, title, createTextElement("p", heroData.text), actions, benefits)

    const visual = document.createElement("div")
    visual.className = "hero-visual"
    const frame = document.createElement("div")
    frame.className = "hero-image-frame"
    const image = document.createElement("img")
    image.src = new URL('../../1.jpg', import.meta.url).href
    image.alt = "نارنگی‌های تازه و رسیده در سبد محصول"
    frame.append(image)
    const freshness = createTextElement("p", "", "freshness-card")
    freshness.append(
        createTextElement("strong", "انتخاب امروز سام"),
        createTextElement("span", "تازه، خوش‌رنگ و آماده برای سبد تو")
    )
    const orbit = document.createElement("div")
    orbit.className = "tdd-orbit"
    orbit.setAttribute("aria-hidden", "true")
    const orbitSteps = [["معیار", "orbit-red"], ["انتخاب", "orbit-green"], ["بهبود", "orbit-blue"]]
    orbitSteps.forEach(([text, className]) => orbit.append(createTextElement("span", text, className)))
    visual.append(frame, freshness, orbit)
    hero.append(copy, visual)
    banners.replaceChildren(hero)
}
