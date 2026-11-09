import type { ProductCard } from '../types';
import { createProductCard } from './product-card';

export const renderProducts = (section: string, cards: ProductCard[]): void => {
    const list = document.querySelector<HTMLElement>('#' + section + '-carousel');
    const status = document.querySelector<HTMLParagraphElement>('#' + section + '-status');
    const controls = document.querySelector<HTMLDivElement>('#' + section + ' .carousel-controls');
    if (!list || !status) throw new Error('Product section is missing');
    const focused = list.contains(document.activeElement)
        ? document.activeElement?.closest<HTMLElement>('.product')?.id : undefined;
    list.replaceChildren();
    status.textContent = cards.length === 0 ? 'محصولی برای این انتخاب پیدا نشد.' : '';
    cards.forEach((card, index) => list.append(createProductCard(card, section + '-' + (index + 1))));
    if (cards.length > 0) {
        const end = document.createElement('span');
        end.id = section + '-end';
        end.className = 'carousel-end';
        end.setAttribute('aria-hidden', 'true');
        list.append(end);
    }
    if (controls) controls.hidden = cards.length === 0;
    if (focused) document.getElementById(focused)?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
};
