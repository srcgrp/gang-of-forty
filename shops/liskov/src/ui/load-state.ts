import {dom, el} from './dom';

import type {LoadState} from '../types';

const SKELETON_CARD_COUNT = 5;
const SKELETON_CATEGORY_COUNT = 7;
const ERROR_TEXT = 'بارگذاری اطلاعات ناموفق بود. لطفاً دوباره تلاش کنید.';

function createSkeletonCards(count: number): HTMLDivElement[] {
    return Array.from({length: count}, () => {
        const card = el('div', 'item item-skeleton');
        card.setAttribute('aria-hidden', 'true');
        card.append(
            el('div', 'skeleton-block'),
            el('div', 'skeleton-line'),
            el('div', 'skeleton-line skeleton-line-short'),
        );
        return card;
    });
}

function showLoading(): void {
    dom.main.setAttribute('aria-busy', 'true');
    const wide = el('div', 'banner banner-skeleton banner-skeleton-wide');
    const narrow = el('div', 'banner banner-skeleton');
    dom.banners.replaceChildren(wide, narrow);

    const status = el('p', 'visually-hidden', 'در حال بارگذاری…');
    status.setAttribute('role', 'status');
    const tiles = Array.from({length: SKELETON_CATEGORY_COUNT}, () =>
        el('div', 'skeleton-tile'),
    );
    dom.categories.replaceChildren(status, ...tiles);

    const section = el('section', 'page-section');
    section.setAttribute('aria-hidden', 'true');
    const items = el('div', 'carousel-items');
    items.append(...createSkeletonCards(SKELETON_CARD_COUNT));
    const carousel = el('div', 'carousel');
    carousel.append(items);
    section.append(el('div', 'skeleton-line skeleton-title'), carousel);
    dom.carousels.replaceChildren(section);
}

function showError(messageText: string = ERROR_TEXT): void {
    dom.main.setAttribute('aria-busy', 'false');
    dom.banners.replaceChildren();
    dom.carousels.replaceChildren();

    const message = el('p', 'carousel-message', messageText);
    message.setAttribute('role', 'alert');
    dom.categories.replaceChildren(message);
}

export function renderLoadState(state: LoadState): void {
    switch (state.status) {
        case 'loading':
            showLoading();
            break;
        case 'success':
            dom.main.setAttribute('aria-busy', 'false');
            break;
        case 'empty': {
            dom.main.setAttribute('aria-busy', 'false');
            dom.carousels.replaceChildren();
            const message = el(
                'p',
                'carousel-message',
                'محصولی برای نمایش وجود ندارد.',
            );
            dom.carousels.append(message);
            break;
        }
        case 'error':
            showError(state.message);
            break;
        default: {
            const unreachable: never = state;
            return unreachable;
        }
    }
}
