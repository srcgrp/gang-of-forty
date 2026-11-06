import {createBanner} from './banner';
import {createEmoji, createLink, dom, el} from './dom';

import type {Home} from '../types';
import type {Promo} from '../types';

export function renderBanners(home: Home): void {
    dom.banners.replaceChildren(
        createBanner(home.hero, {
            id: 'banner-1',
            titleTag: 'h1',
            buttonClass: 'banner-button-right',
        }),
        createBanner(home.side, {
            id: 'banner-2',
            titleTag: 'h2',
            buttonClass: 'banner-button-left',
        }),
    );
}

export function createPromos(promos: Promo[]): HTMLDivElement {
    const wrapper = el('div', 's-banners-container');

    wrapper.append(
        ...promos.map((promo: Promo) => {
            const link = createLink(promo.href, '', 's-banners');
            link.style.backgroundColor = promo.color;
            link.append(createEmoji(promo.emoji, 'promo-emoji'), promo.text);
            return link;
        }),
    );

    return wrapper;
}
