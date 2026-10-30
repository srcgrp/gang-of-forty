export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string | number | null,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = String(text);
  return el;
}

export function clear(container: HTMLElement | null): void {
  container?.replaceChildren();
}

export function byId<T extends HTMLElement = HTMLElement>(
  id: string,
): T | null {
  return document.getElementById(id) as T | null;
}

export function on<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Document | null,
  event: K,
  handler: (e: HTMLElementEventMap[K]) => void,
): void {
  target?.addEventListener(event, handler as EventListener);
}
