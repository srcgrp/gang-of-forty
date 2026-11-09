import type { Shop, Category } from '../types';
import { h, setText } from './dom';

function renderSchedule(schedule: { days: string; time: string }[]): void {
  const el = document.getElementById('footer-schedule');
  if (!el) return;
  const frag = document.createDocumentFragment();
  schedule.forEach((item, i) => {
    if (i > 0) frag.appendChild(document.createElement('br'));
    frag.appendChild(document.createTextNode(item.days));
    frag.appendChild(document.createElement('br'));
    frag.appendChild(document.createTextNode(item.time));
  });
  el.replaceChildren(frag);
}

export function renderFooter(shop: Shop | null, categories: Category[]): void {
  if (!shop) return;
  setText('footer-brand-name', shop.name);
  setText('footer-brand-tagline', shop.slogan);
  setText('footer-about', shop.about);
  setText('footer-copyright', shop.copyright);

  const help = document.querySelector<HTMLUListElement>('#footer-help-list');
  if (help) {
    help.replaceChildren(...shop.help.map((l) => h('li', {}, h('a', { href: l.href, textContent: l.label }))));
  }

  const contact = document.querySelector<HTMLUListElement>('#footer-contact-list');
  if (contact) {
    contact.replaceChildren();
    if (shop.phone) contact.appendChild(h('li', {}, h('a', { href: `tel:${shop.phone}`, textContent: shop.phone, dir: 'ltr' })));
    if (shop.address) contact.appendChild(h('li', { textContent: shop.address }));
  }

  renderSchedule(shop.schedule);

  const cats = document.querySelector<HTMLUListElement>('#footer-categories-list');
  if (cats) {
    cats.replaceChildren(...categories.map((c, i) => {
      const li = h('li');
      li.style.setProperty('--i', String(i));
      li.appendChild(h('a', {
        href: `#${c.slug}`,
        textContent: c.name,
        dataset: { catSlug: c.slug },
      }));
      return li;
    }));
  }
}