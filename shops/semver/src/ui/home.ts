import type { CarouselConfig, Home } from '../types';

const setText = (selector: string, text: string): void => {
  const element = document.querySelector<HTMLElement>(selector);
  if (element) {
    element.textContent = text;
  }
};

const setHref = (selector: string, href: string): void => {
  const element = document.querySelector<HTMLAnchorElement>(selector);
  if (element) {
    element.href = href;
  }
};

const renderPromos = (home: Home): void => {
  const box = document.querySelector<HTMLElement>('#promos');
  if (!box) {
    return;
  }

  box.replaceChildren();

  home.promos.forEach((promo) => {
    const card = document.createElement('a');
    card.className = 'promo-card';
    card.href = promo.href;
    card.style.backgroundColor = promo.color;

    const emoji = document.createElement('span');
    emoji.className = 'promo-emoji';
    emoji.textContent = promo.emoji;

    const text = document.createElement('span');
    text.className = 'promo-text';
    text.textContent = promo.text;

    card.append(emoji, text);
    box.appendChild(card);
  });
};

export const renderHomeBanners = (home: Home): void => {
  setText('#hero-h1', home.hero.title);
  setText('#hero-p', home.hero.text);
  setText('#cta-label', home.hero.cta.label);
  setHref('#cta', home.hero.cta.href);

  setText('#hero-h2', home.side.title);
  setText('#hero-p2', home.side.text);
  setText('#cta-side-label', home.side.cta.label);
  setHref('#cta-side', home.side.cta.href);

  renderPromos(home);
};

export interface CarouselSection {
  config: CarouselConfig;
  element: HTMLElement;
}

export const buildCarouselSections = (
  container: HTMLElement,
  carousels: CarouselConfig[],
  categorySlugs: Set<string>,
): CarouselSection[] => {
  const built: CarouselSection[] = [];

  carousels.forEach((config) => {
    const id = categorySlugs.has(config.id)
      ? `carousel-${config.id}`
      : config.id;

    const heading = document.createElement('h2');
    heading.className = 'section-title';
    heading.id = id;
    heading.textContent = `${config.emoji} ${config.title}`;

    const board = document.createElement('article');
    board.className = 'flex-item-product';

    const loading = document.createElement('p');
    loading.className = 'loading-state';
    loading.textContent = 'در حال بارگذاری…';

    const error = document.createElement('p');
    error.className = 'error-state';
    error.hidden = true;
    error.textContent = 'خطا در بارگذاری';

    board.append(loading, error);
    container.append(heading, board);

    built.push({ config, element: board });
  });

  return built;
};
