// A small badge: visible text + a hidden text for screen readers.
export function createBadge(text: string, readerText: string, className: string): HTMLElement {
  const badge: HTMLElement = document.createElement('span');
  badge.textContent = text;
  badge.classList.add(className);

  const reader: HTMLElement = document.createElement('span');
  reader.textContent = readerText;
  reader.classList.add('visually-hidden');

  badge.append(reader);
  return badge;
}