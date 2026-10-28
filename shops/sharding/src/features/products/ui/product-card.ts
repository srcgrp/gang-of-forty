import type { Card } from '../../../shared/types';
import { h } from '../../../shared/ui/dom';
import { createIcon } from '../../../shared/ui/icons';
import { renderCartButton, mkBtn } from '../../../shared/ui/cart-button';
import { priceFmt, discountPct } from '../../../shared/ui/price-format';

export function renderProductCard(card: Card): HTMLLIElement {
  const li = h('li', { className: 'product-item' });
  const article = h('article', { className: 'product' });
  article.dataset.stock = card.inStock ? 'in' : 'out';

  const body = h('div', { className: 'product__link' });
  const imgWrap = h('span', { className: 'product__img' });
  
  if (card.image) {
    imgWrap.appendChild(h('img', { src: card.image, alt: card.name, loading: 'lazy' }));
  } else {
    imgWrap.classList.add('product__img--emoji');
    imgWrap.appendChild(h('span', { className: 'product__emoji', textContent: card.emoji || '🛒' }));
  }

  if (!card.inStock) {
    imgWrap.appendChild(h('span', { className: 'product__badge-stock', textContent: 'ناموجود' }));
  } else if (card.discountPercent) {
    imgWrap.appendChild(h('span', {
      className: 'product__discount',
      textContent: discountPct.format(card.discountPercent / 100),
    }));
  }

  body.append(imgWrap, h('h3', { className: 'product__name', textContent: `${card.name} — ${card.unit}` }));

  const footer = h('div', { className: 'product__footer' });
  const price = h('span', { className: 'product__price' },
    h('span', { className: 'product__current', textContent: priceFmt.format(card.price) }),
    h('span', { className: 'product__unit', textContent: 'تومان' }),
  );
  if (card.oldPrice !== undefined) {
    price.appendChild(h('span', { className: 'product__old', textContent: priceFmt.format(card.oldPrice) }));
  }

  const actions = h('div', { className: 'product__actions', dataset: { productId: String(card.id), productName: card.name } });
  if (!card.inStock) {
    const addBtn = mkBtn('product__add', `${card.name} ناموجود است`);
    addBtn.disabled = true;
    addBtn.appendChild(createIcon('plus'));
    actions.appendChild(addBtn);
  } else {
    renderCartButton(actions, card.id, card.name, card.qty, card.stockQty); 
  }

  footer.append(price, actions);
  article.append(body, footer);
  li.appendChild(article);
  return li;
}