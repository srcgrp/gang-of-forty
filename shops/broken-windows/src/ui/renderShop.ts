import type { MenuEntry, Shop } from "../types.ts";
import type { PageElements } from "./page.ts";

function renderMenu(menu: MenuEntry[], els: PageElements): void {
    const items: HTMLLIElement[] = menu.map((entry: MenuEntry): HTMLLIElement => {
        const li: HTMLLIElement = document.createElement("li");
        const a: HTMLAnchorElement = document.createElement("a");
        a.href = entry.href;
        a.textContent = entry.label;
        li.append(a);
        return li;
    });
    els.nav.replaceChildren(els.allCategory, ...items);
}

export function renderShop(shop: Shop, els: PageElements): void {
    els.notice.textContent = shop.notice;
    els.phone.textContent = shop.phone;
    els.address.textContent = shop.address;
    els.about.textContent = shop.about;
    els.slogan.textContent = shop.slogan;
    renderMenu(shop.menu, els);
}