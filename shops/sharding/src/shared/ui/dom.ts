export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> & { dataset?: Record<string, string> } = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  const { dataset, ...rest } = props;
  Object.assign(el, rest);
  if (dataset) for (const [k, v] of Object.entries(dataset)) el.dataset[k] = v;
  for (const child of children) {
    el.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return el;
}

export function closestTarget<T extends Element>(e: Event, selector: string): T | null {
  return e.target instanceof Element ? e.target.closest<T>(selector) : null;
}

export function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = Array.from(el.classList).filter((c) => !c.startsWith('skeleton')).join(' ');
  el.removeAttribute('data-skeleton');
  el.removeAttribute('aria-hidden');
}