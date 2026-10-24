const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function getTrack(btn: HTMLElement): HTMLElement | null {
  if (!(btn instanceof Element)) return null;
  const hero = btn.closest<HTMLElement>('.hero-carousel');
  if (hero) return hero.querySelector<HTMLElement>('.hero-carousel__track');

  const cats = btn.closest<HTMLElement>('.categories');
  if (cats) return cats.querySelector<HTMLElement>('.categories__list');

  const prod = btn.closest<HTMLElement>('.products');
  if (prod) return prod.querySelector<HTMLElement>('.products__grid');

  return null;
}

function updateNavState(track: HTMLElement): void {
  const container = track.closest<HTMLElement>('.hero-carousel, .categories, .products');
  if (!container) return;

  const startBtn = container.querySelector<HTMLElement>('.carousel-nav__btn--start');
  const endBtn = container.querySelector<HTMLElement>('.carousel-nav__btn--end');
  if (!startBtn && !endBtn) return;

  const items = track.children;
  if (!items.length) {
    startBtn?.classList.add('is-disabled');
    endBtn?.classList.add('is-disabled');
    return;
  }

  const first = items[0];
  const last = items[items.length - 1];

  const realBox = (el: Element): DOMRect => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 || r.height > 0) return r;
    const child = el.firstElementChild;
    return child ? child.getBoundingClientRect() : r;
  };

  const trackRect = track.getBoundingClientRect();
  const firstRect = realBox(first);
  const lastRect = realBox(last);

  const scrollable = track.scrollWidth - track.clientWidth > 2;

  const firstVisibleFromStart =
    firstRect.right <= trackRect.right + 2 && firstRect.left >= trackRect.left - 2;

  const lastVisibleFromEnd =
    lastRect.left >= trackRect.left - 2 && lastRect.right <= trackRect.right + 2;

  startBtn?.classList.toggle('is-disabled', !scrollable || firstVisibleFromStart);
  endBtn?.classList.toggle('is-disabled', !scrollable || lastVisibleFromEnd);
}

function scrollTrack(track: HTMLElement, toEnd: boolean): void {
  const items = track.children;
  if (!items.length) return;

  const target = toEnd ? items[items.length - 1] : items[0];
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    block: 'nearest',
    inline: toEnd ? 'end' : 'start',
  });
}

export function setupCarouselControls(): void {
  document.addEventListener('click', (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const btn = e.target.closest<HTMLElement>('.carousel-nav__btn');
    if (!btn) return;
    if (btn.classList.contains('is-disabled')) return;

    const track = getTrack(btn);
    if (!track) return;

    scrollTrack(track, btn.classList.contains('carousel-nav__btn--end'));
  });

  document.addEventListener(
    'scroll',
    (e) => {
      const track = e.target;
      if (!(track instanceof HTMLElement)) return;
      if (
        track.classList.contains('products__grid') ||
        track.classList.contains('categories__list') ||
        track.classList.contains('hero-carousel__track')
      ) {
        updateNavState(track);
      }
    },
    { capture: true, passive: true },
  );

  const root = document.getElementById('carousels-root');
  if (root) {
    new MutationObserver(() => {
      root.querySelectorAll<HTMLElement>('.products__grid').forEach(updateNavState);
    }).observe(root, { childList: true, subtree: true });
  }

  document
    .querySelectorAll<HTMLElement>(
      '.hero-carousel__track, .categories__list, .products__grid',
    )
    .forEach(updateNavState);

  const heroTrack = document.querySelector<HTMLElement>('.hero-carousel__track');
  if (heroTrack && 'IntersectionObserver' in window) {
    const slides = heroTrack.querySelectorAll<HTMLElement>('.hero-carousel__slide');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            'is-active',
            entry.intersectionRatio > 0.6,
          );
        });
      },
      { root: heroTrack, threshold: [0, 0.6, 1] },
    );
    slides.forEach((slide) => observer.observe(slide));
  }
}