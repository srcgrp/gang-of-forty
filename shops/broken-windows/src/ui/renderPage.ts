import type { PageView } from "../types.ts";
import { renderCategories } from "./categories.ts";
import type { PageElements } from "./page.ts";
import { createProductCard } from "./productCard.ts";
import { renderShop } from "./renderShop.ts";
import { showMessage } from "./status.ts";

export function renderPage(view: PageView, els: PageElements): void {
    els.offers.replaceChildren(...view.offerCards.map(createProductCard));

    if (view.snacks) {
        els.snacks.replaceChildren(...view.snacks.cards.map(createProductCard));
        els.snacksHeading.textContent = "خشکبار و تنقلات";
        els.snacksArticle.id = view.snacks.slug;
    } else {
        showMessage(els.snacks, "دسته‌ی تنقلات پیدا نشد");
    }

    renderCategories(view.categories, els);
    renderShop(view.shop, els);
}