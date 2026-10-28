import type { Product } from './types';
import { state, changeQty } from './state';
import { h, renderCartButton, notyf } from './ui';
import { renderImageOrEmoji } from './dom';
import { priceFmt, applyOffer } from './utils';

export function setupSearch(): void {
  const search = document.querySelector<HTMLInputElement>('#search-input');
  const box = document.getElementById('search-results');
  if (!search || !box) return;

  const close = () => {
    box.hidden = true;
    box.replaceChildren();
  };

  const offerFor = (p: Product) => state.offers.find((o) => o.productId === p.id);

  search.addEventListener('input', () => {
    const fuse = state.fuse;
    if (!fuse) return;

    const q = search.value.trim();
    if (!q) return close();

    const hits = fuse.search(q).map((r) => r.item).slice(0, 8);
    box.replaceChildren();

    if (hits.length === 0) {
      box.appendChild(
        h('p', {
          className: 'search-results__empty',
          textContent: 'نتیجه‌ای یافت نشد',
        }),
      );
      box.hidden = false;
      return;
    }

    for (const p of hits) {
      const offer = offerFor(p);
      const finalPrice = applyOffer(p.price, offer);

      const imgWrap = h('div', { className: 'search-results__img' });
      renderImageOrEmoji(imgWrap, p.image, p.name, p.emoji);

      const info = h('div', { className: 'search-results__info' },
        h('span', { className: 'search-results__name', textContent: p.name }),
        h('span', {
          className: 'search-results__price',
          textContent: `${priceFmt.format(finalPrice)} تومان`,
        }),
      );

      const actions = h('div', {
        className: 'product__actions search-results__actions',
        dataset: { productId: String(p.id), productName: p.name },
      });
      renderCartButton(actions, p.id, p.name);

      const item = h('div', { className: 'search-results__item', role: 'listitem' });
      item.dataset.productId = String(p.id);
      item.append(imgWrap, info, actions);
      box.appendChild(item);
    }

    box.hidden = false;
  });

  box.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const item = e.target.closest<HTMLElement>('.search-results__item');
    if (!item || e.target.closest('.search-results__actions')) return;
    const pid = item.dataset.productId;
    if (!pid) return;

    changeQty(pid, 1);
    const name = item.querySelector('.search-results__name')?.textContent || 'کالا';
    notyf.success(`${name} به سبد اضافه شد`);

    const actions = item.querySelector<HTMLElement>('.search-results__actions');
    if (actions) renderCartButton(actions, pid, name);

    item.style.backgroundColor = 'var(--lime-soft)';
    setTimeout(() => {
      item.style.backgroundColor = '';
    }, 300);
  });

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Node)) return;
    if (!box.contains(e.target) && e.target !== search) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}