/* Amirhossein (Armin) Panahi */

import { $ } from './dom';

function updateArrows(scroller: HTMLElement): void {
  const shelf = scroller.closest('.shelf');
  if (!shelf) return;

  const position = Math.abs(scroller.scrollLeft);
  const max = scroller.scrollWidth - scroller.clientWidth;

  for (const button of shelf.querySelectorAll<HTMLButtonElement>('button[data-dir]')) {
    const previous = Number(button.dataset.dir) < 0;
    button.disabled = previous ? position <= 1 : position >= max - 1;
  }
}

const observer = new ResizeObserver(entries => {
  for (const { target } of entries) {
    if (target instanceof HTMLElement) updateArrows(target);
  }
});

export function resetCarousels(): void {
  observer.disconnect();
}

export function initCarousel(section: HTMLElement): void {
  const scroller = $<HTMLElement>('.offers__scroller, .rail', section);
  if (!scroller) return;

  scroller.addEventListener('scroll', () => updateArrows(scroller), { passive: true });
  observer.observe(scroller);
  updateArrows(scroller);
}

export function scrollCarousel(section: HTMLElement | null, direction: number): void {
  const scroller = section?.querySelector<HTMLElement>('.offers__scroller, .rail');
  if (!scroller) return;

  const card = $<HTMLElement>('.card', scroller);
  const parent = card?.parentElement;
  if (!card || !parent) return;

  const gap = parseFloat(getComputedStyle(parent).columnGap) || 12;
  const step = card.getBoundingClientRect().width + gap;
  const rtl = getComputedStyle(scroller).direction === 'rtl';
  scroller.scrollBy({ left: direction * (rtl ? -1 : 1) * step });
}