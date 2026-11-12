import type { ProductCard } from '../types';

export const priceElement = (card: ProductCard): HTMLDivElement => {
    const price = document.createElement('div');
    price.className = 'price';
    if (card.oldPriceText) {
        const old = document.createElement('del');
        old.textContent = card.oldPriceText;
        price.append(old);
    }
    const amount = document.createElement('strong');
    amount.textContent = card.priceText;
    price.append(amount);
    return price;
};
