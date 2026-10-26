export function el<k extends keyof HTMLElementTagNameMap>(
    tag: k,
    className?: string,
    text?: string,
): HTMLElementTagNameMap[k] {
    const node: HTMLElementTagNameMap[k] = document.createElement(tag)
    if (className) node.className = className 
    if (text !== undefined) node.textContent = text
    return node
}