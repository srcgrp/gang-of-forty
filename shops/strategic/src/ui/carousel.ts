/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { $ } from './dom';

const carouselScroller = (section: Element | null): HTMLElement | null =>
  section ? $<HTMLElement>('.offers__scroller, .rail', section) : null;

const carouselUpdaters = new WeakMap<HTMLElement, () => void>();

const carouselObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (const { target } of entries) {
    if (target instanceof HTMLElement) carouselUpdaters.get(target)?.();
  }
});

export const resetCarousels = (): void => carouselObserver.disconnect();

export function initCarousel(section: HTMLElement): void {
  const scroller = carouselScroller(section);
  if (!scroller) return;
  const buttons = [...section.querySelectorAll<HTMLButtonElement>('button[data-dir]')];

  const update = () => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const position = Math.abs(scroller.scrollLeft);
    for (const button of buttons) {
      button.disabled = Number(button.dataset.dir) < 0 ? position <= 1 : position >= max - 1;
    }
  };

  let frame = 0;
  scroller.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, { passive: true });

  carouselUpdaters.set(scroller, update);
  carouselObserver.observe(scroller);
  update();
}

export function scrollCarousel(section: HTMLElement | null, direction: number): void {
  const scroller = carouselScroller(section);
  if (!scroller) return;
  const card = $<HTMLElement>('.card', scroller);
  const cardParent = card?.parentElement;
  if (!card || !cardParent) return;
  const gap = parseFloat(getComputedStyle(cardParent).columnGap) || 12;
  const step = card.getBoundingClientRect().width + gap;
  const rtl = getComputedStyle(scroller).direction === 'rtl';
  scroller.scrollBy({ left: direction * (rtl ? -1 : 1) * step });
}