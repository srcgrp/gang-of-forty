import { fragmentTarget, scrollToFragment } from './fragment'

export function enableNavigation(): void {
    document.addEventListener("click", (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 ||
            event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
        if (!(event.target instanceof Element)) return
        const link = event.target.closest<HTMLAnchorElement>("a[href]")
        if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return
        const url = new URL(link.href, location.href)
        if (url.origin !== location.origin || url.pathname !== location.pathname ||
            url.search !== location.search || !url.hash || !fragmentTarget(url.hash)) return

        event.preventDefault()
        const mobileMenu = document.querySelector<HTMLDetailsElement>(".mobile-menu")
        if (!mobileMenu) throw new Error("Missing mobile menu")
        mobileMenu.open = false
        if (location.hash !== url.hash) history.pushState(null, "", url.hash)
        requestAnimationFrame(() => scrollToFragment())
    })

    window.addEventListener("hashchange", () => scrollToFragment())

    const siteHeader = document.querySelector<HTMLElement>(".site-header")
    if (!siteHeader) throw new Error("Missing site header")
    const headerObserver = new ResizeObserver(() => {
        const height = siteHeader.getBoundingClientRect().height
        document.documentElement.style.setProperty("--header-offset", `${height + 12}px`)
    })
    headerObserver.observe(siteHeader)
}
