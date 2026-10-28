import { getClosest, getEl, getNth } from "./dom.ts";

export type PageElements = {
    offers: HTMLDivElement;
    snacks: HTMLDivElement;
    snacksArticle: HTMLElement;
    snacksHeading: HTMLElement;
    categoriesGrid: HTMLDivElement;
    menuList: HTMLUListElement;
    footerList: HTMLUListElement;
    nav: HTMLElement;
    allCategory: HTMLElement;
    notice: HTMLElement;
    phone: HTMLElement;
    address: HTMLElement;
    about: HTMLElement;
    slogan: HTMLElement;
};

export function findPageElements(): PageElements {
    const snacks: HTMLDivElement = getNth<HTMLDivElement>(".special-offer-items", 1);
    const snacksArticle: HTMLElement = getClosest<HTMLElement>(snacks, "article");
    return {
        offers: getNth<HTMLDivElement>(".special-offer-items", 0),
        snacks,
        snacksArticle,
        snacksHeading: getEl<HTMLElement>(".items-header", snacksArticle),
        categoriesGrid: getEl<HTMLDivElement>("#categories-grid"),
        menuList: getEl<HTMLUListElement>("#menu-categories"),
        footerList: getEl<HTMLUListElement>("#footer-categories"),
        nav: getEl<HTMLElement>(".nav"),
        allCategory: getEl<HTMLElement>("#allcategory"),
        notice: getEl<HTMLElement>("#notice"),
        phone: getEl<HTMLElement>("#phonenumber"),
        address: getEl<HTMLElement>(".address"),
        about: getEl<HTMLElement>(".footer-top-info-text"),
        slogan: getEl<HTMLElement>(".footer-top-info-header"),
    };
}