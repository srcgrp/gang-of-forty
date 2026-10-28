import { fragmentTarget } from './fragment'

export function enableNavigation(
    getHash: (href: string) => string | null,
    onNavigate: (hash: string) => void,
    onHistory: () => void
): void {
    document.addEventListener("click", (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 ||
            event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
        if (!(event.target instanceof Element)) return
        const link = event.target.closest<HTMLAnchorElement>("a[href]")
        if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return
        const hash = getHash(link.href)
        if (!hash || !fragmentTarget(hash)) return

        event.preventDefault()
        const mobileMenu = document.querySelector<HTMLDetailsElement>(".mobile-menu")
        if (!mobileMenu) throw new Error("Missing mobile menu")
        mobileMenu.open = false
        onNavigate(hash)
    })

    window.addEventListener("popstate", onHistory)
    window.addEventListener("hashchange", onHistory)

    const siteHeader = document.querySelector<HTMLElement>(".site-header")
    if (!siteHeader) throw new Error("Missing site header")
    const headerObserver = new ResizeObserver(() => {
        const height = siteHeader.getBoundingClientRect().height
        document.documentElement.style.setProperty("--header-offset", `${height + 12}px`)
    })
    headerObserver.observe(siteHeader)
}
