import type { Category, Product } from '../../../shared/types';
import { h } from '../../../shared/ui/dom';

export function renderMegaMenu(categories: Category[], products: Product[], promos: Record<string, string>): void {
  const ul = document.querySelector<HTMLUListElement>('#mega-menu-categories');
  if (!ul) return;
  ul.replaceChildren(...categories.map((cat, index) => {
    const items = products.filter((p) => p.categoryId === cat.id);
    const li = h('li', { className: 'mega-menu__item' });
    if (index === 0) li.dataset.state = 'active';
    
    const link = h('a', { className: 'mega-menu__category-link', href: `#${cat.slug}`, textContent: cat.name, dataset: { catSlug: cat.slug } });
    const list = h('ul', { className: 'mega-menu__products' });
    
    if (items.length === 0) {
      list.appendChild(h('li', { className: 'mega-menu__products-empty', textContent: 'محصولی برای نمایش نیست' }));
    } else {
      items.forEach(p => list.appendChild(h('li', {}, h('a', { href: `#${cat.slug}`, textContent: p.name, dataset: { catSlug: cat.slug } }))));
    }
    
    const sub = h('div', { className: 'mega-menu__products-panel' }, h('h4', { className: 'mega-menu__products-title', textContent: 'محصولات' }), list);
    const media = h('span', { className: 'mega-menu__promo-media' });
    media.setAttribute('aria-hidden', 'true');
    
    const promoImage = promos[cat.slug];
    if (promoImage) {
      media.appendChild(h('img', { src: promoImage, alt: '', loading: 'lazy', width: 400, height: 600 }));
    }
    
    const promo = h('a', { className: 'mega-menu__promo', href: `#${cat.slug}`, dataset: { catSlug: cat.slug } }, media, h('span', { className: 'mega-menu__promo-body' }, h('span', { className: 'mega-menu__promo-title', textContent: cat.name }), h('span', { className: 'mega-menu__promo-desc', textContent: `${items.length} کالا` })));
    li.append(link, sub, promo);
    return li;
  }));
}