import type { Product, Offer } from '../../../shared/types'
import { renderProducts } from './product-carousel'
import { priceFormatter } from '../../../shared/ui/elements'

export function enableSearch(
    unavailable: Map<number, boolean>, offers: Map<number, Offer>, prices: Map<number, number>,
    onAdd: () => void, searchProducts: (query: string) => Product[],
    onQuery: (query: string) => void, initialQuery: string
): (query: string) => void {
    const form = document.querySelector<HTMLFormElement>(".search")
    const input = document.querySelector<HTMLInputElement>("#site-search")
    const section = document.querySelector<HTMLElement>("#search-results")
    const controls = document.querySelector<HTMLElement>("#search-results-controls")
    const track = document.querySelector<HTMLDivElement>("#search-results-track")
    const status = document.querySelector<HTMLParagraphElement>("#search-results-status")
    if (!form || !input || !section || !controls || !track || !status) {
        throw new Error("Missing search elements")
    }

    const elements = { input, section, controls, track, status }

    function showResults(query: string, scroll: boolean): void {
        elements.input.value = query
        if (!query.trim()) {
            elements.section.hidden = true
            return
        }
        const matches = searchProducts(query.trim())
        renderProducts({ prefix: "search-results", track: elements.track, controls: elements.controls, status: elements.status },
            matches, unavailable, offers, prices, onAdd)
        elements.status.textContent = matches.length
            ? `${priceFormatter.format(matches.length)} محصول پیدا شد.`
            : `نتیجه‌ای برای «${query}» پیدا نشد.`
        elements.section.hidden = false
        if (scroll) elements.section.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start"
        })
    }

    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault()
        const query = input.value.trim()
        onQuery(query)
        showResults(query, true)
    })

    showResults(initialQuery, false)
    return query => showResults(query, false)
}
