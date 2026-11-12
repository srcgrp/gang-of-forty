export const el = <T extends keyof HTMLElementTagNameMap>(
  tag: T, className = '', text?: string,
): HTMLElementTagNameMap[T] => {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
export const icon = (id: string): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  svg.setAttribute('class', 'icon'); svg.setAttribute('aria-hidden', 'true');
  use.setAttribute('href', `#${id}`); svg.append(use); return svg;
};
export const button = (text: string, className = 'btn'): HTMLButtonElement => {
  const node = el('button', className, text); node.type = 'button'; return node;
};
export const safeHref = (value: string): string => /^#[a-z][a-z0-9-]*$/i.test(value) ? value : '#contact';
export const link = (text: string, href: string, className = ''): HTMLAnchorElement => {
  const node = el('a', className, text); node.href = safeHref(href); return node;
};
