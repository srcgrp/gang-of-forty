import type { Shop, ScheduleRow } from "../types";

export function renderShopTexts(shop: Shop): void {
    const notice = document.querySelector<HTMLParagraphElement>("header .notice");
    const address = document.querySelector<HTMLParagraphElement>("footer .address");
    const about = document.querySelector<HTMLParagraphElement>("footer .about");
    const phoneLink = document.querySelector<HTMLAnchorElement>("footer .phone a");
    const slogan = document.querySelector<HTMLElement>("header .logo-text .slogan");

    if (!notice || !address || !about || !phoneLink || !slogan) {
        throw new Error("missing elements");
    }

    notice.textContent = shop.notice;
    address.textContent = shop.address;
    about.textContent = shop.about;
    phoneLink.textContent = shop.phone;
    phoneLink.href = `tel:${shop.phone}`;
    slogan.textContent = shop.slogan;
}

export function renderSchedule(
    section: HTMLElement,
    schedule: ScheduleRow[]
): void {
    section.querySelectorAll(".schedule-row").forEach(row => row.remove());

    for (const row of schedule) {
        const paragraph = document.createElement("p");
        paragraph.classList.add("schedule-row");
        paragraph.textContent = `${row.days}: ${row.time}`;
        section.append(paragraph);
    }
}