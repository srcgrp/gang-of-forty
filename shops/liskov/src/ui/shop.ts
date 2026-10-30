import {createIcon, createLink, dom, el} from './dom';

import type {ReadonlyShop, Link, ScheduleEntry} from '../types';
const SHOP_NAME = 'سوپرمارکت شایان';

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

const toFaDigits = (text: string): string =>
    text.replace(/\d/g, (digit: string): string =>
        FA_DIGITS.charAt(Number(digit)),
    );

export function renderShop(shop: ReadonlyShop): void {
    dom.topBarText.textContent = shop.notice;

    // Main menu
    dom.mainMenu.append(
        ...shop.menu.map((item: Link) => {
            const li = el('li');
            li.append(createLink(item.href, item.label, 'categories-links'));
            return li;
        }),
    );

    // Footer: about, address, phone
    const phone = el('p');
    const phoneLink = createLink(
        `tel:+98${shop.phone.replace(/\D/g, '').slice(1)}`,
    );
    const phoneText = el('bdi', '', toFaDigits(shop.phone));
    phoneText.dir = 'ltr';
    phoneLink.append(phoneText);
    phone.append(createIcon('phone', '%23d5d5d5'), ' ', phoneLink);

    const address = el('p');
    address.append(createIcon('map-marker', '%23d5d5d5'), ` ${shop.address}`);

    dom.footerAbout.append(
        el('h2', '', SHOP_NAME),
        el('p', '', shop.about),
        address,
        phone,
    );

    // Footer: help links and opening hours
    dom.footerHelp.append(
        ...shop.help.map((item: Link) => createLink(item.href, item.label)),
    );

    dom.footerSchedule.append(
        ...shop.schedule.map((entry: ScheduleEntry) =>
            el('p', '', `${entry.days}: ${entry.time}`),
        ),
    );

    // Replace the sample shop name with our own shop name.
    dom.copyright.textContent = shop.copyright.replace(shop.name, SHOP_NAME);
}

export function renderSearch(productCount: number): void {
    const count = faNumber.format(productCount);
    dom.search.placeholder = `جستجو در میان ${count} کالا...`;
    dom.search.setAttribute('aria-label', `جستجو در میان ${count} کالا`);
}

const faNumber = new Intl.NumberFormat('fa-IR');
