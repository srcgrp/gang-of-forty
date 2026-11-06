import { closestTarget } from './dom';

const TRACK_SELECTOR = '.hero-carousel__track, .categories__list, .product-shelf__grid';

function updateNavState(track: HTMLElement): void {
  const parent = track.closest<HTMLElement>('.hero-carousel, .categories, .product-shelf');
  if (!parent) return;
  const start = parent.querySelector<HTMLElement>('[data-carousel-start]');
  const end = parent.querySelector<HTMLElement>('[data-carousel-end]');
  if (!start && !end) return;
  const max = Math.max(0, track.scrollWidth - track.clientWidth);
  const pos = Math.abs(track.scrollLeft);
  const scrollable = max > 2;
  const setDisabled = (el: HTMLElement | null, disabled: boolean): void => {
    if (!el) return;
    if (disabled) el.setAttribute('aria-disabled', 'true');
    else el.removeAttribute('aria-disabled');
  };
  setDisabled(start, !scrollable || pos <= 2);
  setDisabled(end, !scrollable || pos >= max - 2);
}

function updateAll(): void {
  document.querySelectorAll<HTMLElement>(TRACK_SELECTOR).forEach(updateNavState);
}

export function setupCarouselControls(): void {
  document.addEventListener('click', (e) => {
    const btn = closestTarget<HTMLElement>(e, '[data-carousel-start], [data-carousel-end]');
    if (btn?.getAttribute('aria-disabled') === 'true') e.preventDefault();
  });

  document.addEventListener('scroll', (e) => {
    if (e.target instanceof HTMLElement && e.target.matches(TRACK_SELECTOR)) updateNavState(e.target);
  }, { capture: true, passive: true });

  document.querySelectorAll<HTMLElement>(TRACK_SELECTOR).forEach(updateNavState);

  const root = document.getElementById('product-shelves');
  if (root) {
    new MutationObserver(() => {
      root.querySelectorAll<HTMLElement>('.product-shelf__grid').forEach(updateNavState);
    }).observe(root, { childList: true, subtree: true });
  }

  window.addEventListener('resize', updateAll, { passive: true });

  const heroTrack = document.querySelector<HTMLElement>('.hero-carousel__track');
  if (heroTrack && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) entry.target.setAttribute('data-state', 'active');
        else entry.target.removeAttribute('data-state');
      });
    }, { root: heroTrack, threshold: [0, 0.6, 1] });
    heroTrack.querySelectorAll('.hero-carousel__slide').forEach((s) => observer.observe(s));
  }
}