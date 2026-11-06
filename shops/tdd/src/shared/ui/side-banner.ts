import type { HomeBanner } from '../types'
import { createTextElement, createLink } from './elements'

export function renderSideBanner(side: HomeBanner): void {
    const story = document.querySelector<HTMLElement>("#home-side")
    if (!story) throw new Error("Missing home side section")
    story.setAttribute("aria-labelledby", "side-title")
    const photo = document.createElement("div")
    photo.className = "story-image"
    const sideImage = document.createElement("img")
    sideImage.src = new URL('../../../labaniat.jpg', import.meta.url).href
    sideImage.alt = "لبنیات تازه"
    photo.append(sideImage, createTextElement("span", side.title))
    const sideCopy = document.createElement("div")
    const sideTitle = createTextElement("h2", side.title)
    sideTitle.id = "side-title"
    sideCopy.append(
        sideTitle,
        createTextElement("p", side.text),
        createLink(side.cta.label, side.cta.href)
    )
    story.replaceChildren(photo, sideCopy)
}
