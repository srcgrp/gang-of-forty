import { el, makeButton } from '../utils/utils.js';
import { formatPrice } from '../utils/format.js';

import type { ProductView } from '../type.js';

const makeCard = (product: ProductView): HTMLLIElement => {
    const card = el('li', 'card');
    const media = el('div', 'card-media');
    const emoji = el('span', 'card-emoji', product.emoji);
    media.append(emoji);

    if (product.color) {
        media.style.setProperty('--tone', product.color);
    }
    
    if (product.off !== undefined) {
        media.append(el('span', 'chip-off', `${formatPrice(product.off)}٪`));
    }

    if (product.stock === 0) {
        media.append(el('span', 'chip-out', 'ناموجود'));
    }

    const favButton = makeButton({
        className: 'act-btn act-fav',
        iconId: 'i-heart',
        label: `افزودن ${product.name} به علاقه‌مندی‌ها`,
    });
    media.append(favButton);

    const title = el('h3', 'card-title');
    const titleLink = el('a', null, product.name);
    titleLink.href = `#product-${product.id}`;
    title.append(titleLink);

    const body = el('div', 'card-body');
    body.append(title);

    if (product.unit) {
        const unit = el('p', 'card-weight', product.unit);
        unit.setAttribute('aria-label', `واحد محصول: ${product.unit}`);
        body.append(unit);
    }

    const price = el('p', 'price');

    if (product.oldPrice !== undefined) {
        const del = el('del');
        del.append(
            el('span', 'sr-only', 'قیمت قبل از تخفیف '),
            formatPrice(product.oldPrice)
        );
        price.append(del);
    }


    const strong = el('strong', null, formatPrice(product.price));
    strong.append(el('small', null, 'تومان'));
    price.append(strong);

    const cartButton = makeButton({
        className: 'act-btn act-cart',
        iconId: 'i-cart',
        label: `افزودن ${product.name} به سبد خرید`,
    });


    if (product.stock === 0) {
        card.classList.add('card--out');
        cartButton.disabled = true;
    }

    const foot = el('div', 'card-foot');
    foot.append(price, cartButton);

    card.append(media, body, foot);

    return card;
};

export { makeCard };