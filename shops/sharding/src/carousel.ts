import type { Product, Offer, CarouselConfig, Home } from './types';
import { state } from './state';
import { h, setText, createSvgIcon } from './dom';
import { renderProductCard, skeletonCards } from './product-card';

function buildCarouselSection(cfg: CarouselConfig): HTMLElement {
  const isOffers = cfg.source === 'offers' || cfg.variant === 'offers';
  const section = h('section', {
    className: isOffers ? 'products products--offers' : 'products',
    id: cfg.id,
  });
  section.setAttribute('aria-labelledby', `${cfg.id}-title`);

  const head = h('div', { className: 'products__head' });

  if (isOffers && cfg.sub) {
    head.appendChild(
      h('div', { className: 'offers__heading' },
        h('h2', {
          id: `${cfg.id}-title`,
          className: 'products__title',
          textContent: cfg.title,
        }),
        h('p', {
          id: `${cfg.id}-sub`,
          className: 'offers__sub',
          textContent: cfg.sub,
        }),
      ),
    );
  } else {
    head.appendChild(
      h('h2', {
        id: `${cfg.id}-title`,
        className: 'products__title',
        textContent: cfg.title,
      }),
    );
  }

  const nav = h('nav', { className: 'carousel-nav' });
  nav.setAttribute('aria-label', `ناوبری کاروسل ${cfg.title}`);

  const start = h('a', {
    href: `#${cfg.id}-start`,
    className: 'carousel-nav__btn carousel-nav__btn--start',
  });
  start.setAttribute('aria-label', `رفتن به ابتدای ${cfg.title}`);
  start.appendChild(createSvgIcon('M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z'));

  const end = h('a', {
    href: `#${cfg.id}-end`,
    className: 'carousel-nav__btn carousel-nav__btn--end',
  });
  end.setAttribute('aria-label', `رفتن به انتهای ${cfg.title}`);
  end.appendChild(createSvgIcon('M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z'));

  nav.append(start, end);
  head.appendChild(nav);

  const status = h('div', {
    className: 'products__status',
    id: `${cfg.id}-status`,
  });
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.hidden = true;

  const grid = h('ul', {
    className: 'products__grid',
    id: `${cfg.id}-grid`,
    tabIndex: 0,
  });
  grid.setAttribute('aria-label', cfg.title);
  grid.setAttribute('aria-busy', 'true'); // Set busy until data loads

  const main = h('div', { className: 'products__main' }, head, status, grid);
  const inner = h('div', { className: 'products__inner' }, main);
  const container = h('div', { className: 'container' }, inner);
  section.appendChild(container);
  return section;
}

function productsForCarousel(
  cfg: CarouselConfig,
  products: Product[],
  offerMap: Map<number, Offer>,
): Product[] {
  if (cfg.source === 'offers') {
    return [...offerMap.keys()]
      .map((id) => products.find((x) => x.id === id))
      .filter((p): p is Product => p !== undefined)
      .sort(
        (a, b) =>
          (offerMap.get(b.id)?.percent || 0) - (offerMap.get(a.id)?.percent || 0),
      );
  }
  if (cfg.categoryId != null) {
    return products.filter((p) => p.categoryId === cfg.categoryId);
  }
  return [];
}

export function fillSectionGrid(
  sectionId: string,
  list: Product[],
  offerMap: Map<number, Offer>,
  stockMap: Map<number, number>,
): void {
  const grid = document.getElementById(`${sectionId}-grid`);
  const status = document.getElementById(`${sectionId}-status`);
  if (!grid || !status) return;

  if (list.length === 0) {
    renderError(sectionId, 'در حال حاضر محصولی برای نمایش نیست.');
    return;
  }

  status.hidden = true;
  status.replaceChildren();
  grid.hidden = false;
  grid.replaceChildren();
  grid.removeAttribute('aria-busy');

  const frag = document.createDocumentFragment();
  list.forEach((product, i) => {
    const card = renderProductCard(
      product,
      offerMap.get(product.id) || null,
      stockMap.get(product.id) ?? 0,
    );
    card.style.setProperty('--i', String(i));
    if (i === 0) card.id = `${sectionId}-start`;
    if (i === list.length - 1) card.id = `${sectionId}-end`;
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

export function renderError(sectionId: string, message: string): void {
  const grid = document.getElementById(`${sectionId}-grid`);
  const status = document.getElementById(`${sectionId}-status`);
  if (!grid || !status) return;

  grid.hidden = true;
  grid.replaceChildren();
  grid.removeAttribute('aria-busy');

  status.hidden = false;
  status.className = 'products__status products__status--error';
  status.replaceChildren();

  const icon = h('span', { className: 'products__status-icon', textContent: '⚠️' });
  icon.setAttribute('aria-hidden', 'true');

  status.append(
    icon,
    h('p', { className: 'products__status-title', textContent: 'بارگذاری ناموفق' }),
    h('p', { className: 'products__status-text', textContent: message }),
  );
}

export function renderProductSkeletons(): void {
  const root = document.getElementById('carousels-root');
  if (!root) return;

  root.replaceChildren();

  const defaultSections: CarouselConfig[] = [
    { id: 'offers', title: 'پیشنهادهای ویژه امروز', emoji: '🔥', source: 'offers', sub: 'در حال بارگذاری...' },
    { id: 'fruits', title: 'میوه و سبزیجات', emoji: '🥬', categoryId: 1 },
    { id: 'dairy', title: 'لبنیات و تخم‌مرغ', emoji: '🥛', categoryId: 2 },
  ];

  for (const cfg of defaultSections) {
    const section = buildCarouselSection(cfg);
    const grid = section.querySelector('.products__grid');
    if (grid) grid.appendChild(skeletonCards(7));
    root.appendChild(section);
  }
}

export function renderCarousels(home: Home | null = state.home): void {
  if (!home) return;
  const stockData = state.stockData;
  if (!stockData) return;
  const root = document.getElementById('carousels-root');
  if (!root) return;

  const products = state.products;
  const stockMap = new Map<number, number>(
    products.map((p) => [p.id, stockData.items[p.id] ?? 0]),
  );
  const offerMap = new Map<number, Offer>(state.offers.map((o) => [o.productId, o]));

  for (const cfg of home.carousels) {
    let section = document.getElementById(cfg.id);
    if (!section) {
      section = buildCarouselSection(cfg);
      root.appendChild(section);
    } else {
      if (cfg.title) setText(`${cfg.id}-title`, cfg.title);
      if (cfg.sub) setText(`${cfg.id}-sub`, cfg.sub);
    }

    const list = productsForCarousel(cfg, products, offerMap);
    fillSectionGrid(cfg.id, list, offerMap, stockMap);

    document.getElementById(`${cfg.id}-grid`)?.removeAttribute('aria-busy');
  }
}