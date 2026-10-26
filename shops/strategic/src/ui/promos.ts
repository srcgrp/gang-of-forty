/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ShopModel } from '../types';
import { findBannerArt } from './art';
import { el } from './el';
import { IMG, image } from './media';
import { safeHref, stripEmoji } from './safe';

export function renderPromos(model: ShopModel): HTMLElement | null {
  const promos = Array.isArray(model.home.promos) ? model.home.promos : [];
  if (!promos.length) return null;
  const links = promos.map((promo) => {
    const text = stripEmoji(promo.text);
    const [file, , width, height] = findBannerArt(text);
    return el('a', { class: 'banner', href: safeHref(promo.href) }, [text, image(`${IMG}${file}`, { width, height })]);
  });
  return el('section', { class: 'banners', 'aria-label': 'پیشنهادهای تبلیغاتی' }, links);
}