import type { Product, Offer } from './types';
import { getQty } from './state';
import { h, mkBtn, cloneIcon, renderImageOrEmoji } from './dom';
import { priceFmt, discountPct, applyOffer, hasDiscount } from './utils';

// Cart button / stepper 
export function renderCartButton(
  container: HTMLElement,
  productId: string | number,
  name: string,
): void {
  container.replaceChildren();
  container.dataset.productId = String(productId);
  container.dataset.productName = name;

  const qty = getQty(productId);
  if (qty <= 0) {
    const addBtn = mkBtn('product__add', `افزودن ${name} به سبد خرید`, 'inc');
    const icon = cloneIcon('tpl-icon-plus');
    if (icon) addBtn.appendChild(icon);
    container.appendChild(addBtn);
    return;
  }

  const dec = mkBtn('product__qty-btn', `کم کردن ${name}`, 'dec', '−');

  const value = priceFmt.format(qty);
  const val = h('span', {
    className: 'product__qty-val',
    textContent: value,
  });
  val.setAttribute('aria-live', 'polite');
  val.setAttribute('aria-label', `تعداد ${name}: ${value}`);

  const inc = mkBtn('product__qty-btn', `افزودن ${name}`, 'inc', '+');

  const stepper = h('div', { className: 'product__qty' });
  stepper.append(dec, val, inc);
  container.appendChild(stepper);
}

// Product card 
export function renderProductCard(
  product: Product,
  offer: Offer | null,
  stock: number,
): HTMLLIElement {
  const outOfStock = stock === 0;
  const discounted = hasDiscount(offer) && !outOfStock;

  const li = h('li', { className: 'products__item' });
  const article = h('article', {
    className: outOfStock ? 'product product--out-of-stock' : 'product',
  });

  const body = h('div', { className: 'product__link' });
  const imgWrap = h('span', { className: 'product__img' });
  renderImageOrEmoji(imgWrap, product.image, product.name, product.emoji, {
    plateClass: 'product__img--emoji',
    width: 200,
    height: 150,
  });

  if (outOfStock) {
    imgWrap.appendChild(
      h('span', { className: 'product__badge-stock', textContent: 'ناموجود' }),
    );
  } else if (discounted && offer) {
    const badge = h('span', {
      className: 'product__discount',
      textContent: discountPct.format(offer.percent / 100),
    });
    badge.setAttribute('aria-label', `${offer.percent} درصد تخفیف`);
    imgWrap.appendChild(badge);
  }

  const name = h('h3', {
    className: 'product__name',
    textContent: `${product.name} — ${product.unit}`,
  });

  body.append(imgWrap, name);

  const footer = h('div', { className: 'product__footer' });
  const price = h('span', { className: 'product__price' });

  const finalPrice = applyOffer(product.price, offer);

  price.append(
    h('span', {
      className: 'product__current',
      textContent: priceFmt.format(finalPrice),
    }),
    h('span', { className: 'product__unit', textContent: 'تومان' }),
  );

  if (discounted) {
    const old = h('span', {
      className: 'product__old',
      textContent: priceFmt.format(product.price),
    });
    old.setAttribute(
      'aria-label',
      `قیمت قبلی ${priceFmt.format(product.price)} تومان`,
    );
    price.appendChild(old);
  }

  const actions = h('div', {
    className: 'product__actions',
    dataset: {
      productId: String(product.id),
      productName: product.name,
    },
  });

  if (outOfStock) {
    const addBtn = mkBtn('product__add', `${product.name} ناموجود است`);
    addBtn.disabled = true;
    const icon = cloneIcon('tpl-icon-plus');
    if (icon) addBtn.appendChild(icon);
    actions.appendChild(addBtn);
  } else {
    renderCartButton(actions, product.id, product.name);
  }

  footer.append(price, actions);
  article.append(body, footer);
  li.appendChild(article);
  return li;
}

// Skeleton cards 
export function skeletonCards(count: number): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    frag.appendChild(
      h('li', { className: 'products__item' },
        h('article', { className: 'product product--skeleton' },
          h('div', { className: 'product__link' },
            h('span', { className: 'product__img' }),
            h('h3', { className: 'product__name', textContent: '—' }),
          ),
          h('div', { className: 'product__footer' },
            h('span', { className: 'product__price' },
              h('span', { className: 'product__current', textContent: '—' }),
            ),
            h('span', { className: 'product__add' }),
          ),
        ),
      ),
    );
  }
  return frag;
}