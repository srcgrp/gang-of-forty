export function makeElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className = "",
  text = "",
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}
export function appendLink(
  container: HTMLElement,
  label: string,
  href = "#",
  className = "",
): HTMLAnchorElement {
  const link = makeElement("a", className, label);
  link.href = href || "#";
  container.append(link);
  return link;
}
