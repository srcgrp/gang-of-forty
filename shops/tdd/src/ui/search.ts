import type { Product, Offer } from '../types'
import { renderProducts } from './product-carousel'
import { priceFormatter } from './elements'

export function enableSearch(unavailableByProduct: Map<number, boolean>, offers: Map<number, Offer>, finalPrices: Map<number, number>, onAdd: () => void, searchProducts: (query: string) => Product[]): void {
    const form = document.querySelector<HTMLFormElement>(".search")
    const input = document.querySelector<HTMLInputElement>("#site-search")
    const section = document.querySelector<HTMLElement>("#search-results")
    const controls = document.querySelector<HTMLElement>("#search-results-controls")
    const track = document.querySelector<HTMLDivElement>("#search-results-track")
    const status = document.querySelector<HTMLParagraphElement>("#search-results-status")
    if (!form || !input || !section || !controls || !track || !status) {
        throw new Error("Missing search elements")
    }

    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault()
        const query = input.value.trim()
        if (!query) {
            section.hidden = true
            return
        }

        const matches = searchProducts(query)
        renderProducts({ prefix: "search-results", track, controls, status }, matches, unavailableByProduct, offers, finalPrices, onAdd)
        status.textContent = matches.length
            ? `${priceFormatter.format(matches.length)} محصول پیدا شد.`
            : `نتیجه‌ای برای «${query}» پیدا نشد.`
        section.hidden = false
        section.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start"
        })
    })
}
