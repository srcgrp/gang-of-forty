export const priceFormatter = new Intl.NumberFormat("fa-IR")

export function createTextElement<K extends keyof HTMLElementTagNameMap>(
    tag: K, text: string, className?: string
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag)
    element.textContent = text
    if (className) element.className = className
    return element
}

export function createLink(label: string, href: string): HTMLAnchorElement {
    const link = createTextElement("a", label)
    link.setAttribute("href", href)
    return link
}
