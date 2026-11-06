import {getCarouselProducts} from '../catalog/carousel-products';
import {discountedPrice} from '../catalog/pricing';
import {createEmoji, createIcon, createLink, dom, el} from './dom';

import type {CarouselConfig, Product} from '../types';
import type {Context} from '../catalog/context';

const faNumber = new Intl.NumberFormat('fa-IR');

export function renderCarousels(
    carousels: CarouselConfig[],
    context: Context,
    promos: HTMLElement,
): void {
    const sections: HTMLElement[] = carousels.map((carousel: CarouselConfig) =>
        createCarouselSection(carousel, context),
    );

    // The promo banners go between the first and the second carousel.
    sections.splice(1, 0, promos);
    dom.carousels.replaceChildren(...sections);
}

function createCarouselSection(
    carousel: CarouselConfig,
    context: Context,
): HTMLElement {
    const products = getCarouselProducts(carousel, context);

    const section = el('section', 'page-section');
    section.id = carousel.id;

    const title = el('h2', 'titles');
    title.id = `${carousel.id}-title`;
    title.append(createEmoji(carousel.emoji, 'title-emoji'), carousel.title);
    section.setAttribute('aria-labelledby', title.id);

    const items = el('div', 'carousel-items');
    items.tabIndex = 0;
    items.setAttribute('role', 'group');
    items.setAttribute(
        'aria-label',
        `${carousel.title}، با کلیدهای جهت‌نما حرکت کنید`,
    );

    const firstId = `${carousel.id}-first-item`;
    const lastId = `${carousel.id}-last-item`;

    if (products.length === 0) {
        items.append(
            el(
                'p',
                'carousel-message carousel-message-info',
                'فعلاً محصولی برای نمایش وجود ندارد.',
            ),
        );
    } else {
        const cards = products.map((product: Product) =>
            createCard(product, context),
        );

        const firstCard = cards[0];
        const lastCard = cards[cards.length - 1];

        if (firstCard && lastCard) {
            firstCard.id = firstId;
            lastCard.id = lastId;
        }

        items.append(...cards);
    }

    const buttons = el('div', 'carousel-buttons');
    buttons.append(
        createNavButton(firstId, 'رفتن به ابتدای فهرست', 'chevron-right'),
        createNavButton(lastId, 'رفتن به انتهای فهرست', 'chevron-left'),
    );

    const carouselBox = el('div', 'carousel');
    carouselBox.append(items, buttons);
    section.append(title, carouselBox);

    return section;
}

function createCard(product: Product, context: Context): HTMLElement {
    const inStock = (context.stockById[product.id] ?? 0) > 0;
    const offer = context.offerByProductId.get(product.id);

    const card = el('article', 'item');
    if (!inStock) card.classList.add('item-out-of-stock');

    const image = createEmoji(product.emoji, 'item-emoji');
    const imageBox = el('div', 'item-image');
    imageBox.setAttribute('aria-hidden', 'true');
    imageBox.style.backgroundColor =
        context.categoryById.get(product.categoryId)?.color ?? '';
    imageBox.append(image);
    card.append(imageBox);

    if (!inStock) {
        card.append(
            el('span', 'item-badge item-badge-out-of-stock', 'ناموجود'),
        );
    } else if (offer) {
        card.append(
            el(
                'span',
                'item-badge',
                `${faNumber.format(offer.percent)}٪ تخفیف`,
            ),
        );
    }

    card.append(
        el('h3', '', product.name),
        el('p', 'item-weight', product.unit),
    );

    const price = el('p', 'item-price');
    if (offer) {
        const newPrice = discountedPrice(product.price, offer.percent);
        price.append(
            el('del', '', faNumber.format(product.price)),
            ` ${faNumber.format(newPrice)} تومان`,
        );
    } else {
        price.textContent = `${faNumber.format(product.price)} تومان`;
    }

    const button = el('button', '', '+');
    button.type = 'button';

    if (inStock) {
        button.dataset.productId = String(product.id);
        button.dataset.productName = product.name;
        button.setAttribute('aria-label', `افزودن ${product.name} به سبد`);
    } else {
        button.disabled = true;
        button.setAttribute('aria-label', `${product.name} ناموجود است`);
    }

    const purchase = el('div', 'item-purchase');
    purchase.append(price, button);
    card.append(purchase);

    return card;
}

function createNavButton(
    href: string,
    label: string,
    iconName: string,
): HTMLAnchorElement {
    const link = createLink(href.startsWith('#') ? href : `#${href}`);
    link.setAttribute('aria-label', label);
    link.append(createIcon(iconName, '%231f2a1c'));
    return link;
}
