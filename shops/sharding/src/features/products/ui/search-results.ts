import type { Product, Card } from '../../../shared/types';
import { h } from '../../../shared/ui/dom';
import { renderCartButton } from '../../../shared/ui/cart-button';
import { priceFmt } from '../../../shared/ui/price-format';

export function renderSearchResults(
  box: HTMLElement,
  hits: Product[],
  toCard: (p: Product) => Card,
): void {
  box.replaceChildren();
  if (hits.length === 0) {
    const empty = h('p', { className: 'search-results__empty', textContent: 'نتیجه‌ای یافت نشد' });
    empty.setAttribute('role', 'status');
    box.appendChild(empty);
    box.hidden = false;
    return;
  }

  for (const p of hits) {
    const card = toCard(p);
    const imgWrap = h('div', { className: 'search-results__img' });
    if (card.image) imgWrap.appendChild(h('img', { src: card.image, alt: card.name }));
    else imgWrap.appendChild(h('span', { className: 'product__emoji', textContent: card.emoji }));

    const info = h('div', { className: 'search-results__info' },
      h('span', { className: 'search-results__name', textContent: card.name }),
      h('span', { className: 'search-results__price', textContent: `${priceFmt.format(card.price)} تومان` }),
    );

    const actions = h('div', { className: 'product__actions search-results__actions' });
    actions.dataset.productId = String(card.id);
    actions.dataset.productName = card.name;

    if (card.inStock) {
      renderCartButton(actions, card.id, card.name, card.qty, card.stockQty); 
    } else {
      actions.appendChild(h('span', { className: 'search-results__out', textContent: 'ناموجود' }));
    }

    const item = h('li', { className: 'search-results__item' });
    item.dataset.productId = String(card.id);
    item.dataset.stock = card.inStock ? 'in' : 'out';
    item.append(imgWrap, info, actions);
    box.appendChild(item);
  }
  box.hidden = false;
}