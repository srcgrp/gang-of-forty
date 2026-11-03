import type { Data } from "../types";
import type { PageElements } from "./page-elements";

import { renderCategories, renderCategoryLinks } from "./categories";
import { renderShopTexts, renderSchedule } from "./shop-info";
import { renderLinks } from "./links";
import { renderBanner, renderPromos } from "./banners";

export function renderPage(
    elements: PageElements,
    data: Data
): void {
    const {
        categoryList,
        dropDown,
        footerCategories,
        mainMenu,
        helpList,
        hoursSection,
        hero,
        promo,
        banners
    } = elements;

    renderCategories(categoryList, data.categories);

    renderCategoryLinks(dropDown, data.categories);
    renderCategoryLinks(footerCategories, data.categories);

    renderShopTexts(data.shop);

    renderLinks(mainMenu, data.shop.menu);
    renderLinks(helpList, data.shop.help);

    renderSchedule(hoursSection, data.shop.schedule);

    renderBanner(hero, data.home.hero);
    renderBanner(promo, data.home.side);

    renderPromos(banners, data.home.promos);
}