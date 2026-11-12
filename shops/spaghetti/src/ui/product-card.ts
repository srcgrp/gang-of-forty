// src/ui/product-card.ts
import type { Offer, Product } from '../types';
import { formatPrice, createEl, createPlusIcon } from './dom';
import { notifyAddToCart } from './notifications';

function getDiscountPercent(offer?: Offer): number {
    if (!offer) return 0;
    return offer.percent ?? 0;
}

export function createProductCard(
    product: Product,
    offer: Offer | undefined,
    stock: number | undefined
): HTMLElement {
    const card = createEl('article', 'product-box');
    card.id = `product-${product.id}`;

    const isOutOfStock = stock !== undefined && stock <= 0;
    if (isOutOfStock) {
        card.classList.add('out-of-stock');
    }

    const imageDiv = createEl('div', 'product-box-image');
    if (product.image) {
        const img = createEl('img');
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';
        img.onerror = () => {
            img.remove();
            imageDiv.textContent = product.emoji || '📦';
        };
        imageDiv.appendChild(img);
    } else {
        imageDiv.textContent = product.emoji || '📦';
    }

    const infoDiv = createEl('div', 'product-box-info');
    const title = createEl('h3', 'product-box-title', product.name);
    title.title = product.name;
    const weight = createEl('span', 'product-box-weight', product.unit || 'بسته');
    infoDiv.appendChild(title);
    infoDiv.appendChild(weight);

    const footer = createEl('div', 'product-box-footer');
    const priceDiv = createEl('div', 'product-box-price');

    const discountPercent = getDiscountPercent(offer);

    if (isOutOfStock) {
        const outLabel = createEl('span', 'out-of-stock-text', 'ناموجود');
        priceDiv.appendChild(outLabel);
    } else if (discountPercent > 0) {
        const finalPrice = product.price * (1 - discountPercent / 100);
        const oldPriceSpan = createEl('span', 'old-price', formatPrice(product.price));
        const priceVal = createEl('span', 'price-value', ` ${formatPrice(finalPrice)} `);
        const priceUnit = createEl('span', 'price-currency', 'تومان');

        priceDiv.appendChild(oldPriceSpan);
        priceDiv.appendChild(priceVal);
        priceDiv.appendChild(priceUnit);
    } else {
        const priceVal = createEl('span', 'price-value', formatPrice(product.price) + ' ');
        const priceUnit = createEl('span', 'price-currency', 'تومان');
        priceDiv.appendChild(priceVal);
        priceDiv.appendChild(priceUnit);
    }

    const addBtn = createEl('button', 'add-button');
    addBtn.type = 'button';
    addBtn.dataset.productId = String(product.id);
    addBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);

    if (isOutOfStock) {
        addBtn.disabled = true;
    } else {
        addBtn.appendChild(createPlusIcon());
        addBtn.addEventListener('click', () => notifyAddToCart(product.name));
    }

    footer.appendChild(priceDiv);
    footer.appendChild(addBtn);

    card.appendChild(imageDiv);
    card.appendChild(infoDiv);
    card.appendChild(footer);

    return card;
}

export function createAmazingOfferCard(
    product: Product,
    offer: Offer | undefined,
    stock: number | undefined,
    index: number
): HTMLElement {
    const card = createEl('div', 'amazing-offer-box');
    card.id = `offer-card-${index + 1}`;

    const isOutOfStock = stock !== undefined && stock <= 0;
    if (isOutOfStock) {
        card.classList.add('out-of-stock');
    }

    const imgDiv = createEl('div', 'amazing-offer-box-image-div');
    if (product.image) {
        const img = createEl('img');
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';
        img.onerror = () => {
            img.remove();
            imgDiv.textContent = product.emoji || '🎁';
        };
        imgDiv.appendChild(img);
    } else {
        imgDiv.textContent = product.emoji || '🎁';
    }

    const title = createEl('span', 'amazing-offer-box-title', product.name);
    title.title = product.name;
    const weight = createEl('span', 'amazing-offer-box-weight', product.unit || 'بسته');

    const mainPriceDiv = createEl('div', 'main-amazing-price-div');

    const discountPercent = getDiscountPercent(offer);
    const finalPrice = discountPercent > 0
        ? product.price * (1 - discountPercent / 100)
        : product.price;

    const oldPriceDiv = createEl('div', 'amazing-offer-box-old-price-div');

    if (discountPercent > 0) {
        const discountLabel = createEl(
            'span',
            'amazing-offer-box-discount-label',
            `${formatPrice(discountPercent)}٪`
        );
        const oldPrice = createEl('span', 'old-price', formatPrice(product.price));
        oldPriceDiv.appendChild(discountLabel);
        oldPriceDiv.appendChild(oldPrice);
    }

    const priceRow = createEl('div', 'amazing-offer-box-price-div');

    const addBtn = createEl('button', 'add-button');
    addBtn.type = 'button';
    addBtn.dataset.productId = String(product.id);
    addBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);

    if (isOutOfStock) {
        addBtn.disabled = true;
    } else {
        addBtn.appendChild(createPlusIcon());
        addBtn.addEventListener('click', () => notifyAddToCart(product.name));
    }

    const priceBox = createEl('div', 'amazing-offer-box-price');
    if (isOutOfStock) {
        const outText = createEl('span', 'out-of-stock-text', 'ناموجود');
        priceBox.appendChild(outText);
    } else {
        const priceVal = document.createTextNode(formatPrice(finalPrice) + ' ');
        const tomanSpan = createEl('span', 'toman', 'تومان');
        priceBox.appendChild(priceVal);
        priceBox.appendChild(tomanSpan);
    }

    priceRow.appendChild(addBtn);
    priceRow.appendChild(priceBox);

    if (discountPercent > 0) {
        mainPriceDiv.appendChild(oldPriceDiv);
    }
    mainPriceDiv.appendChild(priceRow);

    card.appendChild(imgDiv);
    card.appendChild(title);
    card.appendChild(weight);
    card.appendChild(mainPriceDiv);

    return card;
}
