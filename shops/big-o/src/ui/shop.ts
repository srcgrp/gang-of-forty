import type { Shop } from '../types';
import { getHtmlElement } from './getHtmlElement';

// Converts Latin digits in a string to Persian digits.
function toPersianDigits(text: string) {
    return text.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)] ?? digit);
}

// Fills the notice bar, tagline, phone and opening hours from shop.json.
// shop: object from shop.json.
export function renderShop(shop: Shop) {
    const formatter = new Intl.NumberFormat('fa-IR');

    getHtmlElement<HTMLParagraphElement>(".announcement p").textContent =
        `ارسال رایگان برای خریدهای بالای ${formatter.format(shop.freeDeliveryOver)} ${shop.currency}`;

    getHtmlElement<HTMLParagraphElement>(".title p").textContent = shop.slogan;

    const phoneLink = getHtmlElement<HTMLAnchorElement>("address a");
    getHtmlElement<HTMLElement>("bdi", phoneLink).textContent = toPersianDigits(shop.phone).replace("-", "\u2011");
    phoneLink.href = `tel:${shop.phone.replace(/[^\d+]/g, "")}`;
    
    const hours: HTMLParagraphElement = document.createElement("p");
    hours.textContent = `هر روز ${toPersianDigits(shop.hours.open)} تا ${toPersianDigits(shop.hours.close)}`;
    
    getHtmlElement<HTMLElement>(".info").append(hours);
}