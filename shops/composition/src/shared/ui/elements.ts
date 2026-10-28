export function createElement<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  className: string,
  text: string,
): HTMLElementTagNameMap[Tag] {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

export function createLink(text: string, href: string, className: string): HTMLAnchorElement {
  const link = createElement("a", className, text);
  link.href = href;
  return link;
}
