import { h } from './dom';
import { createIcon } from './icons';

export function createCarouselNav(startHref: string, endHref: string, label: string): HTMLElement {
  const nav = h('nav', { className: 'carousel-nav' });
  nav.setAttribute('aria-label', `ناوبری ${label}`);

  const start = h('a', { href: startHref, className: 'carousel-nav__btn' });
  start.dataset.carouselStart = '';
  start.setAttribute('aria-label', `رفتن به ابتدای ${label}`);
  start.appendChild(createIcon('arrowRight'));

  const end = h('a', { href: endHref, className: 'carousel-nav__btn' });
  end.dataset.carouselEnd = '';
  end.setAttribute('aria-label', `رفتن به انتهای ${label}`);
  end.appendChild(createIcon('arrowLeft'));

  nav.append(start, end);
  return nav;
}