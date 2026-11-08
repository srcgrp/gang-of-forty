import type { Category } from '../../../shared/types';
import { h } from '../../../shared/ui/dom';
import { createIcon } from '../../../shared/ui/icons';

export function renderCategories(categories: Category[]): void {
  const ul = document.querySelector<HTMLUListElement>('#categories-list');
  if (!ul) return;
  ul.replaceChildren();

  const all = h('li');
  all.style.setProperty('--i', '0');
  const allLink = h('a', {
    className: 'category',
    href: '#',
    id: 'cat-start',
    dataset: { catSlug: '', category: 'all' },
  });
  const allImg = h('span', { className: 'category__img category__img--all' });
  allImg.appendChild(createIcon('grid', 'category__all-icon'));
  allLink.append(allImg, h('span', { className: 'category__name', textContent: 'همه' }));
  all.appendChild(allLink);
  ul.appendChild(all);

  categories.forEach((cat, i) => {
    const li = h('li');
    li.style.setProperty('--i', String(i + 1));
    const a = h('a', {
      className: 'category',
      href: `#${cat.slug}`, 
      dataset: { catSlug: cat.slug },
    });
    if (i === categories.length - 1) a.id = 'cat-end';
    const img = h('span', { className: 'category__img' });
    if (cat.color) img.style.backgroundColor = cat.color;
    if (cat.image) img.appendChild(h('img', { src: cat.image, alt: cat.name, width: 200, height: 200 }));
    else img.appendChild(h('span', { className: 'product__emoji', textContent: cat.emoji }));
    a.append(img, h('span', { className: 'category__name', textContent: cat.name }));
    li.appendChild(a);
    ul.appendChild(li);
  });
}