export const createText = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  content: string,
  className = '',
): HTMLElementTagNameMap[K] => {
  const node: HTMLElementTagNameMap[K] = document.createElement(tag)
  node.textContent = content
  node.className = className
  return node
}
