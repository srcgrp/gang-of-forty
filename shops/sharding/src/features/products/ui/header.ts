import type { Shop, Category, Product, Link } from '../../../shared/types';
import { h, setText } from '../../../shared/ui/dom';
import { renderMegaMenu } from './mega-menu-view';
import { priceFmt } from '../../../shared/ui/price-format';

function renderLinks(el: HTMLElement, links: Link[], activeIndex = -1): void {
  const wrap = el instanceof HTMLUListElement;
  el.replaceChildren(...links.map((link, i) => {
    const a = h('a', { href: link.href, textContent: link.label });
    if (i === activeIndex) a.setAttribute('aria-current', 'page');
    if (!wrap) return a;
    const li = h('li', {}, a);
    li.style.setProperty('--i', String(i));
    return li;
  }));
}

export function renderHeaderParts(shop: Shop | null, productCount: number, categories: Category[], products: Product[], promos: Record<string, string>): void {
  if (!shop) return;
  setText('topbar-notice', shop.notice);
  setText('brand-name', shop.name);
  setText('brand-tagline', shop.slogan);

  const search = document.querySelector<HTMLInputElement>('#search-input');
  if (search) search.placeholder = productCount > 0 ? `جستجو در میان ${priceFmt.format(productCount)} کالا…` : 'جستجو در محصولات…';

  const nav = document.querySelector<HTMLUListElement>('#nav-list');
  if (nav) { nav.removeAttribute('aria-busy'); renderLinks(nav, shop.menu, 0); }
  
  const mobile = document.querySelector<HTMLUListElement>('#mobile-menu-list');
  if (mobile) { mobile.removeAttribute('aria-busy'); renderLinks(mobile, shop.menu); }

  renderMegaMenu(categories, products, promos);
}