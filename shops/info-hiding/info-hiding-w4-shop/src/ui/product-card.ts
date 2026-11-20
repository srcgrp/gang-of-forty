import type { ProductCard } from '../types';
import { priceElement } from './product-price';

export const createProductCard = (product: ProductCard, id: string): HTMLElement => {
    const card = document.createElement('article');
    card.className = product.available ? 'product' : 'product unavailable';
    card.id = id;
    if (product.discountText) {
        const badge = document.createElement('span');
        badge.className = 'discount';
        badge.textContent = product.discountText;
        card.append(badge);
    }
    const icon = document.createElement('span');
    icon.className = 'product-icon';
    icon.textContent = product.emoji;
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-label', product.name);
    const name = document.createElement('h3');
    name.textContent = product.name;
    const unit = document.createElement('p');
    unit.textContent = product.unit;
    card.append(icon, name, unit);
    if (!product.available) {
        const label = document.createElement('p');
        label.className = 'stock-label';
        label.textContent = 'ناموجود';
        card.append(label);
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = product.available ? 'افزودن +' : 'ناموجود';
    button.disabled = !product.available;
    button.dataset.add = String(product.id);
    button.setAttribute('aria-label', 'افزودن ' + product.name + ' به سبد خرید');
    card.append(priceElement(product), button);
    return card;
};
