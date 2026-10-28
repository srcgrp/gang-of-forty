import type { LoadState } from '../types'

export function clearShopSections(): void {
    const sections = ["home-banners", "home-side", "home-promos", "home-carousels", "category-grid", "category-sections", "about"]
    sections.forEach(id => {
        const element = document.getElementById(id)
        if (!element) throw new Error(`Missing section: ${id}`)
        element.replaceChildren()
    })
}

export function renderLoadState(state: LoadState, main: HTMLElement, status: HTMLParagraphElement): void {
    main.setAttribute("aria-busy", String(state.status === "loading"))
    status.classList.toggle("is-error", state.status === "error")

    switch (state.status) {
        case "loading":
            status.textContent = "در حال بارگذاری فروشگاه..."
            break
        case "success":
            status.textContent = ""
            break
        case "empty":
            status.textContent = "محصولی برای نمایش پیدا نشد."
            break
        case "error":
            status.textContent = state.message
            break
        default:
            const neverState: never = state
            throw new Error(`Unknown loading state: ${neverState}`)
    }
}
