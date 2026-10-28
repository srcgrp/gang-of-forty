import {createEmoji, createLink, el} from './dom';

import type {Banner, BannerOptions} from '../types';

export function createBanner(
    data: Banner,
    {id, titleTag, buttonClass}: BannerOptions,
): HTMLElement {
    const banner = el('section', 'banner');
    banner.id = id;

    const title = el(titleTag, '', data.title);
    title.id = `${id}-title`;
    banner.setAttribute('aria-labelledby', title.id);

    banner.append(
        title,
        el('p', '', data.text),
        createEmoji(data.emoji, 'banner-emoji'),
        createLink(
            data.cta.href,
            data.cta.label,
            `banner-button ${buttonClass}`,
        ),
    );

    return banner;
}
