import type { Shelf } from '../../../shared/types';
import { h } from '../../../shared/ui/dom';
import { createCarouselNav } from '../../../shared/ui/carousel-nav';

export function buildShelf(cfg: Shelf): HTMLElement {
  const section = h('section', { className: 'product-shelf', id: cfg.id });
  if (cfg.source === 'offers') section.dataset.variant = 'offers';
  section.setAttribute('aria-labelledby', `${cfg.id}-title`);

  const head = h('div', { className: 'product-shelf__head' },
    h('h2', { id: `${cfg.id}-title`, className: 'product-shelf__title', textContent: cfg.title }),
    createCarouselNav(`#${cfg.id}-start`, `#${cfg.id}-end`, cfg.title)
  );
  const status = h('div', { className: 'product-shelf__status', id: `${cfg.id}-status` });
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.hidden = true;

  const grid = h('ul', { className: 'product-shelf__grid', id: `${cfg.id}-grid`, tabIndex: 0 });
  grid.setAttribute('aria-label', cfg.title);
  grid.setAttribute('aria-busy', 'true');

  const main = h('div', { className: 'product-shelf__main' }, head, status, grid);
  const inner = h('div', { className: 'product-shelf__inner' }, main);
  const container = h('div', { className: 'container' }, inner);
  section.appendChild(container);
  return section;
}