import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import Fuse from 'fuse.js'

type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
}

type Offer = {
    productId: number;
    percent: number;
    label: string;
}

type Link = {
    label: string;
    href: string;
}

type ScheduleRow = {
    days: string;
    time: string;
}

type Category = {
    id: number;
    slug: string;
    name: string;
    emoji: string;
    color: string;
}

type Stock = {
    updatedAt: string;
    items: Record<number, number>;
}

type Promo = {
    text: string;
    emoji: string;
    color: string;
    href: string;
}

type Banner = {
    title: string;
    text: string;
    emoji: string;
    cta: Link;
}

type Shop = {
    slogan: string;
    phone: string;
    notice: string;
    about: string;
    address: string;
    schedule: ScheduleRow[];
    menu: Link[];
    help: Link[];
}

type OffersCarousel = {
    id: string;
    title: string;
    emoji: string;
    source: string;
}

type CategoryCarousel = {
    id: string;
    title: string;
    emoji: string;
    categoryId: number;
}

type Carousel = OffersCarousel | CategoryCarousel;

type Home = {
    hero: Banner;
    side: Banner;
    promos: Promo[];
    carousels: Carousel[];
}

type Data = {
    products: Product[];
    offers: Offer[];
    stock: Stock;
    categories: Category[];
    shop: Shop;
    home: Home;
}

type CardProduct = {
    id: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    stock: number;
    newPrice?: number;
    percent?: number;
    label?: string;
}

function formatNumber(n: number): string {
    return new Intl.NumberFormat('fa-IR').format(n);
}
function formatPrice(price: number): string {
    return `${formatNumber(price)} تومان`;
}
function renderSchedule(section: HTMLElement, schedule: ScheduleRow[]): void {
    schedule.forEach(row => {
        const p: HTMLParagraphElement = document.createElement("p");
        p.textContent = `${row.days}: ${row.time}`;
        section.append(p);
    });
}

/* land on the right section */
function scrollToHash(): void {
    if (!location.hash) {
        return;
    }
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
        target.scrollIntoView();
    }
}

function createCard(product: CardProduct): HTMLLIElement {
    const outOfStock = product.stock === 0;
    const li: HTMLLIElement = document.createElement("li");

    if (outOfStock) {
        li.classList.add("out-of-stock");
    }

    const icon: HTMLElement = document.createElement("span");
    icon.classList.add("emoji");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = product.emoji;

    const name: HTMLElement = document.createElement("h3");
    name.textContent = product.name;

    const meta: HTMLParagraphElement = document.createElement("p");
    meta.classList.add("meta");
    meta.textContent = product.unit;

    const price: HTMLParagraphElement = document.createElement("p");
    price.classList.add("price");

    if (product.newPrice) {
        const del: HTMLElement = document.createElement("del");
        const oldPriceLabel: HTMLElement = document.createElement("span");
        oldPriceLabel.classList.add("visually-hidden");
        oldPriceLabel.textContent = "قیمت قبلی";
        del.append(oldPriceLabel, " ", formatNumber(product.price));

        const newPriceLabel: HTMLElement = document.createElement("span");
        newPriceLabel.classList.add("visually-hidden");
        newPriceLabel.textContent = "قیمت با تخفیف";
        price.append(del, newPriceLabel, " ", formatPrice(product.newPrice));
    } else {
        price.textContent = formatPrice(product.price);
    }

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "+";
    button.dataset.name = product.name;
    button.disabled = outOfStock;
    button.setAttribute("aria-label", outOfStock ? `${product.name}: ناموجود` : `افزودن ${product.name} به سبد خرید`);
    button.addEventListener("click", addToCart);

    li.append(icon);

    if (outOfStock) {
        const stockBadge: HTMLParagraphElement = document.createElement("p");
        stockBadge.classList.add("badge");
        stockBadge.textContent = "ناموجود";
        li.append(stockBadge);
    } else if (product.percent) {
        const badge: HTMLParagraphElement = document.createElement("p");
        badge.classList.add("badge");

        const hidden: HTMLElement = document.createElement("span");
        hidden.classList.add("visually-hidden");
        hidden.textContent = "تخفیف";
        badge.append(hidden, " ", `${formatNumber(product.percent)}٪`);
        li.append(badge);
    }

    li.append(name, meta, price, button);
    return li;
}

/* replace everything in the carousel with one message */
function showMessage(carousel: HTMLElement, text: string): void {
    carousel.replaceChildren();
    const li: HTMLLIElement = document.createElement("li");
    li.textContent = text;
    li.classList.add("message");
    carousel.append(li);
}

/* drawing functions */
function renderCategoryCarousel(carousel: HTMLUListElement, data: Data, categoryId: number, idPrefix: string): void {
    const { products, offers, stock } = data;
    const items = products
        .filter(p => p.categoryId === categoryId)
        .map(p => withOfferAndStock(p, offers, stock));
    carousel.replaceChildren();
    items.forEach((product, index) => {
        const card = createCard(product);
        if (index === 0) {
            card.id = `${idPrefix}-first`;
        }
        if (index === items.length - 1) {
            card.id = `${idPrefix}-last`;
        }
        carousel.append(card);
    });
}

function renderSpecialOffers(carousel: HTMLUListElement, data: Data, idPrefix: string): void {
    const { products, offers, stock } = data;
    const specialProducts = offers.map(offer => {
        const product = products.find(p => p.id === offer.productId);
        if (!product) {
            return null;
        }
        const productStock = stock.items[product.id];
        const newPrice = Math.round(product.price * (100 - offer.percent) / 100);

        return {
            name: product.name,
            emoji: product.emoji,
            unit: product.unit,
            id: product.id,
            price: product.price,
            newPrice: newPrice,
            percent: offer.percent,
            label: offer.label,
            stock: productStock,
        };
    }).filter(item => item !== null);

    carousel.replaceChildren();
    specialProducts.forEach((item, index) => {
        const card = createCard(item);
        if (index === 0) {
            card.id = `${idPrefix}-first`;
        }
        if (index === specialProducts.length - 1) {
            card.id = `${idPrefix}-last`;
        }
        carousel.append(card);
    });
}

/* cart */
let cartCount: number = Number(localStorage.getItem("cartCount")) || 0;
const notyf: Notyf = new Notyf();

function renderCartCount(): void {
    const cartCountEl = document.querySelector<HTMLElement>(".cartCount");
    const cartCountTextEl = document.querySelector<HTMLElement>(".cartCountText");
    if (!cartCountEl || !cartCountTextEl) throw new Error("missing cart elements");
    cartCountEl.textContent = formatNumber(cartCount);
    cartCountTextEl.textContent = `${formatNumber(cartCount)} کالا در سبد`;
}

function addToCart(e: MouseEvent): void {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    const name = e.currentTarget.dataset.name ?? "محصول";

    cartCount++;
    localStorage.setItem("cartCount", String(cartCount));
    renderCartCount();
    notyf.success(`${name} به سبد خرید اضافه شد`);
}

/* loading, show the messages, call drawing functions */
async function init(): Promise<void> {

    const categoryList = document.querySelector<HTMLUListElement>("#categories .category-list");
    const dropDown = document.querySelector<HTMLUListElement>(".dropdown-menu");
    const footerCategories = document.querySelector<HTMLUListElement>("footer .footer-categories");
    const mainMenu = document.querySelector<HTMLUListElement>(".main-nav > ul");
    const helpList = document.querySelector<HTMLUListElement>(".footer-help");
    const hoursSection = document.querySelector<HTMLElement>("#working-hours");
    const hero = document.querySelector<HTMLElement>('#hero');
    const promo = document.querySelector<HTMLElement>('#promo');
    const banners = document.querySelector<HTMLElement>('#banners');
    const carouselsContainer = document.querySelector<HTMLElement>("#carousels");
    const searchInput = document.querySelector<HTMLInputElement>("#search");
    const errorText = "دسترسی به اینترنت را بررسی و صفحه را دوباره بارگذاری کنید";
    if (!categoryList || !dropDown || !footerCategories || !mainMenu || !helpList || !hoursSection || !hero || !promo || !banners || !carouselsContainer || !searchInput) throw new Error("index.html is missing an element");
    const resultsList: HTMLUListElement = document.createElement("ul");
    resultsList.classList.add("search-results");
    searchInput.insertAdjacentElement("afterend", resultsList);

    const searchForm = searchInput.closest<HTMLFormElement>("form");
    if (!searchForm) throw new Error("search form is missing");
    searchForm.addEventListener("submit", (e: SubmitEvent) => {
        e.preventDefault();
    });

    showMessage(categoryList, "در حال بارگذاری");
    showBlockMessage(carouselsContainer, "در حال بارگذاری");

    try {
        const data = await loadData();
        renderCartCount();
        renderCarousels(carouselsContainer, data);
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
        scrollToHash();
        const fuse = new Fuse<Product>(data.products, { keys: ["name"], threshold: 0.3 });

        searchInput.addEventListener("input", (e: Event) => {
            const query = searchInput.value.trim();

            if (query === "") {
                resultsList.replaceChildren();
                return;
            }

            const results = fuse.search(query);

            if (results.length === 0) {
                showMessage(resultsList, "محصول یافت نشد");
            } else {
                resultsList.replaceChildren();
                results.forEach(result => {
                    const li: HTMLLIElement = document.createElement("li");
                    li.textContent = result.item.name;
                    resultsList.append(li);
                });
            }
        });
        renderSearchPlaceholder(searchInput, data.products.length);

    } catch (error: unknown) {
        console.error(error);
        showMessage(categoryList, errorText);
        showBlockMessage(carouselsContainer, errorText);
    }
}
init();

function showBlockMessage(container: HTMLElement, text: string): void {
    container.replaceChildren();
    const p: HTMLParagraphElement = document.createElement("p");
    p.textContent = text;
    p.classList.add("message");
    container.append(p);
}

/* share the data */

async function loadData(): Promise<Data> {
    const [productsRes, offersRes, stockRes, categoriesRes, shopRes, homeRes] = await Promise.all([
        fetch("../../api/products.json"),
        fetch("../../api/offers.json"),
        fetch("../../api/stock.json"),
        fetch("../../api/categories.json"),
        fetch("../../api/shop.json"),
        fetch("../../api/home.json"),
    ]);
    if (!productsRes.ok || !offersRes.ok || !stockRes.ok || !categoriesRes.ok || !shopRes.ok || !homeRes.ok) {
        throw new Error("Request failed");
    }
    const [products, offers, stock, categories, shop, home]: [Product[], Offer[], Stock, Category[], Shop, Home] = await Promise.all([
        productsRes.json(),
        offersRes.json(),
        stockRes.json(),
        categoriesRes.json(),
        shopRes.json(),
        homeRes.json(),
    ]);

    return { products, offers, stock, categories, shop, home };
}


function withOfferAndStock(product: Product, offers: Offer[], stock: Stock): CardProduct {
    const offer = offers.find(o => o.productId === product.id);
    const result: CardProduct = { ...product, stock: stock.items[product.id] };
    if (offer) {
        result.percent = offer.percent;
        result.label = offer.label;
        result.newPrice = Math.round(product.price * (100 - offer.percent) / 100);
    }
    return result;
}

/* categories */

function createCategoryItem(category: Category): HTMLLIElement {
    const li: HTMLLIElement = document.createElement("li");

    const link: HTMLAnchorElement = document.createElement("a");
    link.href = `#${category.slug}`;

    const icon: HTMLElement = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.emoji;
    icon.style.background = category.color;

    link.append(icon, " ", category.name);
    li.append(link);
    return li;
}

function renderCategories(list: HTMLElement, categories: Category[]): void {
    list.replaceChildren();
    categories.forEach(category => {
        list.append(createCategoryItem(category));
    });
}

function createCategoryLink(category: Category): HTMLLIElement {
    const li: HTMLLIElement = document.createElement("li");
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    li.append(link);
    return li;
}

function renderCategoryLinks(list: HTMLElement, categories: Category[]): void {
    categories.forEach(category => {
        list.append(createCategoryLink(category));
    });
}

/* read shop.json */
function renderShopTexts(shop: Shop): void {
    const notice = document.querySelector<HTMLParagraphElement>("header .notice");
    const address = document.querySelector<HTMLParagraphElement>("footer .address");
    const about = document.querySelector<HTMLParagraphElement>("footer .about");
    const phoneLink = document.querySelector<HTMLAnchorElement>("footer .phone a");
    const slogan = document.querySelector<HTMLElement>("header .logo-text .slogan");

    if (!notice || !address || !about || !phoneLink || !slogan) throw new Error("missing elements");
    notice.textContent = shop.notice;
    address.textContent = shop.address;
    about.textContent = shop.about;
    phoneLink.textContent = shop.phone;
    phoneLink.href = `tel:${shop.phone}`;
    slogan.textContent = shop.slogan;
}

function createLinkItem(label: string, href: string): HTMLLIElement {
    const li: HTMLLIElement = document.createElement("li");
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = href;
    link.textContent = label;
    li.append(link);
    return li;
}

function renderLinks(list: HTMLElement, items: Link[]): void {
    items.forEach(item => {
        list.append(createLinkItem(item.label, item.href));
    });
}

/* promos */
function renderPromos(container: HTMLElement, promos: Promo[]): void {
    container.replaceChildren();
    promos.forEach(promo => {
        const link: HTMLAnchorElement = document.createElement("a");
        link.href = promo.href;

        const emoji: HTMLElement = document.createElement("span");
        emoji.setAttribute("aria-hidden", "true");
        emoji.textContent = promo.emoji;

        link.append(promo.text, " ", emoji);
        container.append(link);
    });
}

/* hero and side banner */
function renderBanner(section: HTMLElement, banner: Banner): void {
    const title = section.querySelector<HTMLElement>("h2");
    const text = section.querySelector<HTMLParagraphElement>("p");
    const link = section.querySelector<HTMLAnchorElement>("a");

    if (!title || !text || !link) throw new Error("missing elements");

    const emoji: HTMLElement = document.createElement("span");
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = banner.emoji;

    title.textContent = banner.title;
    title.append(" ", emoji);
    text.textContent = banner.text;
    link.textContent = banner.cta.label;
    link.href = banner.cta.href;
}

/* build carousels */
/* arrow link */
function createArrowLink(href: string, arrow: string, hiddenText: string): HTMLAnchorElement {
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = href;

    const arrowSpan: HTMLElement = document.createElement("span");
    arrowSpan.setAttribute("aria-hidden", "true");
    arrowSpan.textContent = arrow;

    const textSpan: HTMLElement = document.createElement("span");
    textSpan.classList.add("visually-hidden");
    textSpan.textContent = hiddenText;

    link.append(arrowSpan, " ", textSpan);
    return link;
}

function createCarouselSection(def: Carousel): { section: HTMLElement; list: HTMLUListElement } {
    const section: HTMLElement = document.createElement("section");
    section.id = def.id;
    section.setAttribute("aria-labelledby", `${def.id}-title`);

    const head: HTMLElement = document.createElement("div");
    head.classList.add("section-head");

    const heading: HTMLElement = document.createElement("h2");
    heading.id = `${def.id}-title`;
    const emoji: HTMLElement = document.createElement("span");
    emoji.setAttribute("aria-hidden", "true");
    emoji.textContent = def.emoji;
    heading.append(emoji, " ", def.title);

    const nav: HTMLElement = document.createElement("div");
    nav.classList.add("carousel-nav");
    nav.append(
        createArrowLink(`#${def.id}-first`, "→", `رفتن به ابتدای ${def.title}`),
        createArrowLink(`#${def.id}-last`, "←", `رفتن به انتهای ${def.title}`)
    );
    const list: HTMLUListElement = document.createElement("ul");
    list.classList.add("carousel");

    head.append(heading, nav);
    section.append(head, list);
    return { section, list };
}

function renderCarousels(container: HTMLElement, data: Data): void {
    container.replaceChildren();
    data.home.carousels.forEach(def => {
        const { section, list } = createCarouselSection(def);
        container.append(section);

        if ("source" in def) {
            renderSpecialOffers(list, data, def.id);
        } else {
            renderCategoryCarousel(list, data, def.categoryId, def.id);
        }
    });
}

/* render search placeholder */
function renderSearchPlaceholder(input: HTMLInputElement, count: number): void {
    input.placeholder = `جستجو در میان ${formatNumber(count)} کالا…`;
}
