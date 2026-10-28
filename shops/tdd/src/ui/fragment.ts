export function fragmentTarget(hash: string): HTMLElement | null {
    let id
    try {
        id = decodeURIComponent(hash.slice(1))
    } catch {
        return null
    }
    return document.getElementById(id)
}

export function scrollToFragment(animate: boolean = true): void {
    const target = fragmentTarget(location.hash)
    document.querySelectorAll<HTMLElement>(".is-fragment-target").forEach(element => {
        element.classList.remove("is-fragment-target")
    })
    if (!target) return
    target.classList.add("is-fragment-target")
    const behavior = animate && !matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "smooth" : "instant"
    const header = document.querySelector<HTMLElement>(".site-header")
    if (!header) throw new Error("Missing site header")
    const headerHeight = header.getBoundingClientRect().height
    const track = target.closest<HTMLElement>(".product-track")
    const section = (track && target.closest<HTMLElement>(".product-carousel")) || target

    if (track) {
        const padding = parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0
        track.scrollBy({
            left: target.getBoundingClientRect().right - track.getBoundingClientRect().right + padding,
            behavior
        })
    }

    window.scrollTo({
        top: Math.max(0, scrollY + section.getBoundingClientRect().top - headerHeight - 12),
        behavior
    })
}
