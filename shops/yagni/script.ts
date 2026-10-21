//canvas-confetti

import confetti from "canvas-confetti";

//notyf

import { Notyf } from "notyf";

//Create an instance of Notyf

const notyf = new Notyf();

//types

interface CartItem {

    productId: number;

    name: string;

    price: number;

    quantity: number;

}

type Cart = CartItem[];

interface Product {

    id: number;

    categoryId: number;

    name: string;

    emoji: string;

    unit: string;

    price: number;

    tags: string[];

}

type Products = Product[];

interface Stock {

    updatedAt: string;

    items: Record<string, number>;

}

interface Shop {

    name: string;

    slogan: string;

    owner: string;

    city: string;

    phone: string;

    hours: {

        open: string;

        close: string;

    };

    deliveryFee: number;

    freeDeliveryOver: number;

    currency: string;

    notice: string;

    about: string;

    address: string;

    schedule: Schedule[];

    menu: MenuItem[];

    help: HelpItem[];

    copyright: string;

}

interface Schedule {

    days: string;

    time: string;

}

interface MenuItem {

    label: string;

    href: string;

}

interface HelpItem {

    label: string;

    href: string;

}

interface Category {

    id: number;

    slug: string;

    name: string;

    emoji: string;

    color: string;

}

type Categories = Category[];

interface Offer {

    productId: number;

    percent: number;

    label: string;

}

type Offers = Offer[];

interface ProductData {

    products: Products;

    offers: Offers;

}

interface SuggestionsData {

    products: Products;

    stock: Stock;

    offers: Offers;

}

interface ShopData {

    shop: Shop;

    categories: Categories;

}

interface HomeSlide {

    emoji: string;

    title: string;

    text: string;

    cta: {

        href: string;

        label: string;

    };

}

interface Promo {

    href: string;

    color: string;

    emoji: string;

    text: string;

}

interface HomeCarousel {

    id: string;

    title: string;

    emoji: string;

    source?: "offers";

    categoryId?: number;

}

interface Home {

    hero: HomeSlide;

    side: HomeSlide;

    promos: Promo[];

    carousels: HomeCarousel[];

}


function isRecord(value: unknown): value is Record<string, unknown> {

    return typeof value === "object" && value !== null && !Array.isArray(value);

}


const jsonCache = new Map<string, Promise<unknown>>();

function clearJsonCache(...urls: string[]): void {
    urls.forEach((url) => jsonCache.delete(url));
}

function getJson(url: string): Promise<unknown> {
    const cachedRequest = jsonCache.get(url);
    if (cachedRequest) return cachedRequest;

    const request = fetch(url).then(async (response): Promise<unknown> => {
        if (!response.ok) {
            throw new Error(`Request failed (${response.status}): ${url}`);
        }
        return response.json() as Promise<unknown>;
    });

    jsonCache.set(url, request);
    // Remove failed requests so a later retry performs a fresh network request.
    void request.catch(() => {
        if (jsonCache.get(url) === request) jsonCache.delete(url);
    });

    return request;
}

// Allow only local links and explicitly safe URL protocols.
function isSafeHref(value: unknown): value is string {
    if (!isNonEmptyString(value)) return false;

    const href = value.trim();
    if (href.startsWith('#')) return true;
    if (href.startsWith('//') || href.includes('\\')) return false;

    // Relative paths (e.g. ./help.html, ../index.html, /products) are allowed.
    if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href)) return true;

    try {
        const parsed = new URL(href);
        return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

function isString(value: unknown): value is string {

    return typeof value === "string";

}

function isNonEmptyString(value: unknown): value is string {

    return isString(value) && value.trim().length > 0;

}

function isFiniteNumber(value: unknown): value is number {

    return typeof value === "number" && Number.isFinite(value);

}

function isNonNegativeNumber(value: unknown): value is number {

    return isFiniteNumber(value) && value >= 0;

}

function isPositiveInteger(value: unknown): value is number {

    return typeof value === "number" && Number.isInteger(value) && value > 0;

}

function isStringArray(value: unknown): value is string[] {

    return Array.isArray(value) && value.every(isString);

}

function isSchedule(value: unknown): value is Schedule {

    return isRecord(value) && isString(value.days) && isString(value.time);

}

function isMenuItem(value: unknown): value is MenuItem {

    return isRecord(value) && isNonEmptyString(value.label) && isSafeHref(value.href);

}

function isHelpItem(value: unknown): value is HelpItem {

    return isRecord(value) && isNonEmptyString(value.label) && isSafeHref(value.href);

}

function isProduct(value: unknown): value is Product {

    return isRecord(value) &&

        isPositiveInteger(value.id) &&

        isPositiveInteger(value.categoryId) &&

        isNonEmptyString(value.name) &&

        isString(value.emoji) &&

        isNonEmptyString(value.unit) &&

        isNonNegativeNumber(value.price) &&

        isStringArray(value.tags);

}

function isProducts(value: unknown): value is Products {

    return Array.isArray(value) && value.every(isProduct);

}

function isCategory(value: unknown): value is Category {

    return isRecord(value) &&

        isPositiveInteger(value.id) &&

        isNonEmptyString(value.slug) &&

        isNonEmptyString(value.name) &&

        isString(value.emoji) &&

        isString(value.color);

}

function isCategories(value: unknown): value is Categories {

    return Array.isArray(value) && value.every(isCategory);

}

function isOffer(value: unknown): value is Offer {

    return isRecord(value) &&

        isPositiveInteger(value.productId) &&

        isFiniteNumber(value.percent) &&

        value.percent >= 0 && value.percent <= 100 &&

        isNonEmptyString(value.label);

}

function isOffers(value: unknown): value is Offers {

    return Array.isArray(value) && value.every(isOffer);

}

function isStock(value: unknown): value is Stock {

    if (!isRecord(value) || !isString(value.updatedAt) || !isRecord(value.items)) {

        return false;

    }

    return Object.entries(value.items).every(([productId, quantity]) =>

        isPositiveInteger(Number(productId)) &&

        isFiniteNumber(quantity) &&

        Number.isInteger(quantity) &&

        quantity >= 0

    );

}

function isShop(value: unknown): value is Shop {

    if (!isRecord(value) || !isRecord(value.hours)) {



        return false;

    }


    return isString(value.name) &&

        isString(value.slogan) &&

        isString(value.owner) &&

        isString(value.city) &&

        isString(value.phone) &&

        isString(value.hours.open) &&

        isString(value.hours.close) &&

        isNonNegativeNumber(value.deliveryFee) &&

        isNonNegativeNumber(value.freeDeliveryOver) &&

        isString(value.currency) &&

        isString(value.notice) &&

        isString(value.about) &&

        isString(value.address) &&

        Array.isArray(value.schedule) && value.schedule.every(isSchedule) &&

        Array.isArray(value.menu) && value.menu.every(isMenuItem) &&

        Array.isArray(value.help) && value.help.every(isHelpItem) &&

        isString(value.copyright);

}

function isHomeSlide(value: unknown): value is HomeSlide {
    return (
        isRecord(value) &&
        isString(value.emoji) &&
        isString(value.title) &&
        isString(value.text) &&
        isRecord(value.cta) &&
        isSafeHref(value.cta.href) &&
        isNonEmptyString(value.cta.label)
    );
}

function isPromo(value: unknown): value is Promo {
    return (
        isRecord(value) &&
        isSafeHref(value.href) &&
        isString(value.color) &&
        isString(value.emoji) &&
        isString(value.text)
    );
}

function isHomeCarousel(value: unknown): value is HomeCarousel {

    if (!isRecord(value) ||

        !isString(value.id) ||

        !isString(value.title) ||

        !isString(value.emoji)) {

        return false;

    }

    if (value.source !== undefined && value.source !== "offers") {

        return false;

    }

    return value.categoryId === undefined || isPositiveInteger(value.categoryId);

}

function isHome(value: unknown): value is Home {

    return isRecord(value) &&

        isHomeSlide(value.hero) &&

        isHomeSlide(value.side) &&

        Array.isArray(value.promos) && value.promos.every(isPromo) &&

        Array.isArray(value.carousels) && value.carousels.every(isHomeCarousel);

}

function isProductData(value: unknown): value is ProductData {

    return isRecord(value) && isProducts(value.products) && isOffers(value.offers);

}

function isSuggestionsData(value: unknown): value is SuggestionsData {

    return isRecord(value) &&

        isProducts(value.products) &&

        isStock(value.stock) &&

        isOffers(value.offers);

}

function isShopData(value: unknown): value is ShopData {

    return isRecord(value) && isShop(value.shop) && isCategories(value.categories);

}

/** Validates one value read from an untrusted source, such as localStorage. */

function isCartItem(value: unknown): value is CartItem {
    return (
        isRecord(value) &&
        isPositiveInteger(value.productId) &&
        isString(value.name) &&
        isNonNegativeNumber(value.price) &&
        isPositiveInteger(value.quantity)
    );
}

function isCart(value: unknown): value is Cart {

    return Array.isArray(value) && value.every(isCartItem);

}


//update Cart on loading page

document.addEventListener("DOMContentLoaded", () => {

    updateCartUI();

});

//render error

function renderError(container: HTMLElement, retryFunction: () => void, messageText: string): void {

    const errorMessage = document.createElement("div");

    errorMessage.classList.add("product-error");

    const icon = document.createElement("span");

    icon.classList.add("product-error__icon");

    icon.textContent = "⚠️";

    icon.setAttribute("aria-hidden", "true");

    const message = document.createElement("p");

    message.classList.add("product-error__message");

    message.textContent = messageText;

    const retryButton = document.createElement("button");

    retryButton.classList.add("product-error__retry");

    retryButton.type = "button";

    retryButton.textContent = "تلاش مجدد";

    retryButton.addEventListener("click", retryFunction);

    errorMessage.append(icon, message, retryButton);

    container.replaceChildren(errorMessage);

}

//skeletons

function renderSkeletons(container: HTMLElement, count: number = 6): void {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {

        const card = document.createElement("div");

        card.classList.add("product-skeleton");

        card.setAttribute("aria-hidden", "true");

        const thumb = document.createElement("div");

        thumb.classList.add("product-skeleton__thumb");

        const thumbShimmer = document.createElement("div");

        thumbShimmer.classList.add("product-skeleton__shimmer");

        thumb.append(thumbShimmer);

        const info = document.createElement("div");

        info.classList.add("product-skeleton__info");

        const name = document.createElement("div");

        name.classList.add("product-skeleton__shimmer", "product-skeleton__name");

        const unit = document.createElement("div");

        unit.classList.add("product-skeleton__shimmer", "product-skeleton__unit");

        info.append(name, unit);

        const footer = document.createElement("div");

        footer.classList.add("product-skeleton__footer");

        const pricing = document.createElement("div");

        pricing.classList.add("product-skeleton__pricing");

        const oldPrice = document.createElement("div");

        oldPrice.classList.add("product-skeleton__shimmer", "product-skeleton__old-price");

        const currentPrice = document.createElement("div");

        currentPrice.classList.add("product-skeleton__shimmer", "product-skeleton__current-price");

        pricing.append(oldPrice, currentPrice);

        const button = document.createElement("div");

        button.classList.add("product-skeleton__shimmer", "product-skeleton__button");

        footer.append(pricing, button);

        card.append(thumb, info, footer);

        fragment.append(card);

    }

    container.replaceChildren(fragment);

}

function renderCategorySkeletons(container: HTMLElement, count: number = 7): void {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {

        const card = document.createElement("div");

        card.classList.add("category-skeleton");

        card.setAttribute("aria-hidden", "true");

        const image = document.createElement("div");

        image.classList.add("category-skeleton__shimmer", "category-skeleton__image");

        const title = document.createElement("div");

        title.classList.add("category-skeleton__shimmer", "category-skeleton__title");

        card.append(image, title);

        fragment.append(card);

    }

    container.replaceChildren(fragment);

}

function renderBannerSkeleton(count: number = 2): void {

    const banner = document.querySelector("#banner");

    if (!banner)

        return;

    const bannerTrack = banner.querySelector(".banner__track");

    if (!bannerTrack)

        return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {

        const slide = document.createElement("div");

        slide.classList.add("banner-skeleton");

        slide.setAttribute("aria-hidden", "true");

        const emoji = document.createElement("div");

        emoji.classList.add("banner-skeleton__shimmer", "banner-skeleton__emoji");

        const content = document.createElement("div");

        content.classList.add("banner-skeleton__content");

        const title = document.createElement("div");

        title.classList.add("banner-skeleton__shimmer", "banner-skeleton__title");

        const text = document.createElement("div");

        text.classList.add("banner-skeleton__shimmer", "banner-skeleton__text");

        const cta = document.createElement("div");

        cta.classList.add("banner-skeleton__shimmer", "banner-skeleton__cta");

        content.append(title, text, cta);

        slide.append(emoji, content);

        fragment.append(slide);

    }

    bannerTrack.replaceChildren(fragment);

}

function renderPromoSkeletons(): void {

    const advertisements = document.querySelectorAll(".advertisement");

    advertisements.forEach((advertisement) => {

        const skeleton = document.createElement("div");

        skeleton.classList.add("advertisement-skeleton");

        skeleton.setAttribute("aria-hidden", "true");

        advertisement.replaceChildren(skeleton);

    });

}



//task 1- fetch and show  products in carousel



async function getProducts(): Promise<ProductData> {
    const productsUrl = "../../api/products.json";
    const offersUrl = "../../api/offers.json";

    const [products, offers] = await Promise.all([
        getJson(productsUrl),
        getJson(offersUrl),
    ]);

    const data: unknown = { products, offers };
    if (!isProductData(data)) {
        clearJsonCache(productsUrl, offersUrl);
        throw new Error("Invalid products or offers API response");
    }

    return data;
}

async function renderProducts(categoryId: number, containerSelector: string): Promise<void> {

    const container = document.querySelector<HTMLElement>(containerSelector);

    if (!container)

        return;

    renderSkeletons(container);

    try {

        const { products, offers } = await getProducts();

        const filteredProducts = products.filter((product: Product) => product.categoryId === categoryId);

        container.replaceChildren();



 //Carousel start anchor



        const startAnchor = document.createElement("span");

        startAnchor.id = `products-${categoryId}-start`;

        startAnchor.classList.add("anchor-section");

        container.append(startAnchor);

        filteredProducts.forEach((product: Product) => {

            const offer = offers.find((item) => item.productId === product.id);

            const discountedPrice = offer

                ? Math.round(product.price * (1 - offer.percent / 100))

                : product.price;

            const card = document.createElement("div");

            card.classList.add("product-card");

            const badges = document.createElement("div");

            badges.classList.add("product-badges");

            if (offer) {

                const discount = document.createElement("span");

                discount.classList.add("badge-discount");

                discount.textContent =

                    `${offer.percent.toLocaleString("fa-IR")}٪`;

                badges.append(discount);

            }

            if (product.tags?.length) {

                const tags = document.createElement("div");

                tags.classList.add("product-tags");

                product.tags.forEach((tag) => {

                    const tagBadge = document.createElement("span");

                    tagBadge.classList.add("badge-offer-label");

                    tagBadge.textContent = tag;

                    tags.append(tagBadge);

                });

                badges.append(tags);

            }

            card.append(badges);

            const thumb = document.createElement("div");

            thumb.classList.add("product-thumb");

            const emoji = document.createElement("span");

            emoji.classList.add("product-emoji");

            emoji.textContent = product.emoji;

            emoji.setAttribute("role", "img");

            emoji.setAttribute("aria-label", product.name);

            thumb.append(emoji);

            const info = document.createElement("div");

            info.classList.add("product-info");

            const name = document.createElement("span");

            name.classList.add("product-name");

            name.textContent = product.name;

            const unit = document.createElement("span");

            unit.classList.add("product-unit");

            unit.textContent = product.unit;

            info.append(name, unit);

            const footer = document.createElement("div");

            footer.classList.add("product-footer");

            const pricing = document.createElement("div");

            pricing.classList.add("product-pricing");

            if (offer) {

                const oldPrice = document.createElement("span");

                oldPrice.classList.add("old-price");

                oldPrice.textContent =

                    `${product.price.toLocaleString("fa-IR")} تومان`;

                pricing.append(oldPrice);

            }

            const currentPrice = document.createElement("span");

            currentPrice.classList.add("current-price");

            currentPrice.textContent =

                `${discountedPrice.toLocaleString("fa-IR")} تومان`;

            pricing.append(currentPrice);

            const button = document.createElement("button");

            button.classList.add("add-btn");

            button.type = "button";

            button.setAttribute("aria-label", `افزودن ${product.name} به سبد`);

            button.textContent = "+";

            button.addEventListener("click", () => {

                addToCart(product, discountedPrice);

            });

            footer.append(pricing, button);

            card.append(thumb, info, footer);

            container.append(card);

        });

        const endAnchor = document.createElement("span");

        endAnchor.id = `products-${categoryId}-end`;

        endAnchor.classList.add("anchor-section");

        container.append(endAnchor);

    }

    catch {

        renderError(container, () => renderProducts(categoryId, containerSelector), "دریافت محصولات با خطا مواجه شد");

    }

}

renderProducts(1, ".fruitsVegetablesProducts");

renderProducts(2, ".dairyProducts");

renderProducts(3, ".bakeryPastriesProducts");

renderProducts(4, ".staplesGroceriesProducts");

renderProducts(5, ".beveragesProducts");

renderProducts(6, ".meatProteinProducts");

renderProducts(7, ".snacksProducts");


//task 2 -fetch and show products in suggestions + search input placeholder count

async function getSuggestions(): Promise<SuggestionsData> {
    const productsUrl = "../../api/products.json";
    const stockUrl = "../../api/stock.json";
    const offersUrl = "../../api/offers.json";

    const [products, stock, offers] = await Promise.all([
        getJson(productsUrl),
        getJson(stockUrl),
        getJson(offersUrl),
    ]);

    const data: unknown = { products, stock, offers };
    if (!isSuggestionsData(data)) {
        clearJsonCache(productsUrl, stockUrl, offersUrl);
        throw new Error("Invalid suggestions API response");
    }

    return data;
}

async function renderSuggestions(): Promise<void> {

    const suggestions = document.querySelector<HTMLElement>(".suggestions");

    if (!suggestions)

        return;

    renderSkeletons(suggestions);

    try {

        const { products, stock, offers } = await getSuggestions();

        suggestions.replaceChildren();

        const formatNumber = (number: number): string => number.toLocaleString("fa-IR");

 //Search placeholder

        const searchInput = document.querySelector<HTMLInputElement>(".header__search input");

        if (searchInput) {

            searchInput.placeholder =

                `می‌تونی بین ${formatNumber(products.length)} محصول جستجو کنی`;

        }

 //Carousel start anchor

        const startAnchor = document.createElement("span");

        startAnchor.id = "offers-start";

        startAnchor.classList.add("anchor-section");

        suggestions.append(startAnchor);

 //Products with offers

        const suggestedProducts = products.filter((product) => offers.some((offer) => offer.productId === product.id));

        suggestedProducts.forEach((product) => {

            const offer = offers.find((item) => item.productId === product.id);

            if (!offer)

                return;

            const discountedPrice = Math.round(product.price * (1 - offer.percent / 100));

            const quantity = stock.items[String(product.id)] ?? 0;

            const isOutOfStock = quantity <= 0;

            const card = document.createElement("div");

            card.classList.add("product-card");

            if (isOutOfStock) {

                card.classList.add("product-card--out-of-stock");

            }

            const badges = document.createElement("div");

            badges.classList.add("product-badges");

            const discount = document.createElement("span");

            discount.classList.add("badge-discount");

            discount.textContent = `${formatNumber(offer.percent)}٪`;

            badges.append(discount);

            if (product.tags?.length) {

                const tags = document.createElement("div");

                tags.classList.add("product-tags");

                product.tags.forEach((tag) => {

                    const tagBadge = document.createElement("span");

                    tagBadge.classList.add("badge-offer-label");

                    tagBadge.textContent = tag;

                    tags.append(tagBadge);

                });

                badges.append(tags);

            }

            card.append(badges);

            const thumb = document.createElement("div");

            thumb.classList.add("product-thumb");

            const emoji = document.createElement("span");

            emoji.classList.add("product-emoji");

            emoji.textContent = product.emoji;

            emoji.setAttribute("role", "img");

            emoji.setAttribute("aria-label", product.name);

            thumb.append(emoji);

//Product info

            const info = document.createElement("div");

            info.classList.add("product-info");

            const name = document.createElement("span");

            name.classList.add("product-name");

            name.textContent = product.name;

            const unit = document.createElement("span");

            unit.classList.add("product-unit");

            unit.textContent = product.unit;

            info.append(name, unit);

            if (isOutOfStock) {

                const stockMessage = document.createElement("span");

                stockMessage.classList.add("stock-message");

                stockMessage.textContent = "ناموجود";

                info.append(stockMessage);

            }

            const footer = document.createElement("div");

            footer.classList.add("product-footer");

            const pricing = document.createElement("div");

            pricing.classList.add("product-pricing");

 //Original price

            const oldPrice = document.createElement("span");

            oldPrice.classList.add("old-price");

            oldPrice.textContent =

                `${formatNumber(product.price)} تومان`;

            pricing.append(oldPrice);

            const currentPrice = document.createElement("span");

            currentPrice.classList.add("current-price");

            currentPrice.textContent =

                `${formatNumber(discountedPrice)} تومان`;

            pricing.append(currentPrice);

            const button = document.createElement("button");

            button.classList.add("add-btn");

            button.type = "button";

            button.setAttribute("aria-label", `افزودن ${product.name} به سبد`);

            button.textContent = "+";

            button.disabled = isOutOfStock;

            button.addEventListener("click", () => {

                addToCart(product, discountedPrice);

            });

            footer.append(pricing, button);

//Assemble card

            card.append(thumb, info, footer);

            suggestions.append(card);

        });

        const endAnchor = document.createElement("span");

        endAnchor.id = "offers-end";

        endAnchor.classList.add("anchor-section");

        suggestions.append(endAnchor);

    }

    catch {

        renderError(suggestions, renderSuggestions, "دریافت محصولات با خطا مواجه شد");

    }

}

renderSuggestions();

///////////////////////////////////////////

//task 3-fetch data from categories and show in homepage-navBar-footer  && footer and header info

///////////////////////////////////////////////

async function getCategories(): Promise<Categories> {
    const url = "../../api/categories.json";
    const data: unknown = await getJson(url);

    if (!isCategories(data)) {
        clearJsonCache(url);
        throw new Error("Invalid categories API response");
    }

    return data;
}

async function renderCategories(): Promise<void> {

    const categoriesGrid = document.querySelector<HTMLElement>("#categories-grid");

    if (!categoriesGrid)

        return;

    renderCategorySkeletons(categoriesGrid);

    try {

        const categories = await getCategories();

        const fragment = document.createDocumentFragment();

        categories.forEach((category) => {

            const card = document.createElement("a");

            card.classList.add("category-card");

            card.href = `#${category.slug}`;

            const image = document.createElement("span");

            image.classList.add("category-card__image");

            image.textContent = category.emoji;

            image.style.backgroundColor = category.color;

            const title = document.createElement("span");

            title.classList.add("category-card__title");

            title.textContent = category.name;

            card.append(image, title);

            fragment.append(card);

        });

        categoriesGrid.replaceChildren(fragment);

    }

    catch {

        renderError(categoriesGrid, renderCategories, "دریافت دسته‌بندی‌ها با خطا مواجه شد");

    }

}

renderCategories();

//footer navbar and header info

async function getShop(): Promise<ShopData> {
    const shopUrl = "../../api/shop.json";
    const categoriesUrl = "../../api/categories.json";

    const [shop, categories] = await Promise.all([
        getJson(shopUrl),
        getJson(categoriesUrl),
    ]);

    const data: unknown = { shop, categories };
    if (!isShopData(data)) {
        clearJsonCache(shopUrl, categoriesUrl);
        throw new Error("Invalid shop or categories API response");
    }

    return data;
}

async function renderShop(): Promise<void> {

    try {

        const { shop, categories } = await getShop();


 //Header brand


        const headerBrand = document.querySelector("#shop-header-brand");

        if (headerBrand) {

            headerBrand.replaceChildren();

            if (shop.name) {

                const heading = document.createElement("h1");

                heading.id = "shop-header-name";

                heading.textContent = shop.name;

                headerBrand.append(heading);

            }

            if (shop.slogan) {

                const slogan = document.createElement("small");

                slogan.id = "shop-header-slogan";

                slogan.textContent = shop.slogan;

                headerBrand.append(slogan);

            }

        }



 //Shop information



        const shopNameContainer = document.querySelector("#shop-name");

        if (shopNameContainer && shop.name) {

            const heading = document.createElement("h3");

            heading.classList.add("footer-heading", "brand-title");

            heading.textContent = shop.name;

            shopNameContainer.replaceChildren(heading);

        }

        const shopAbout = document.querySelector<HTMLElement>("#shop-about");

        const shopAddress = document.querySelector<HTMLElement>("#shop-address");

        const shopPhone = document.querySelector<HTMLElement>("#shop-phone");

        if (shopAbout)

            shopAbout.textContent = shop.about;

        if (shopAddress)

            shopAddress.textContent = shop.address;

        if (shopPhone)

            shopPhone.textContent = shop.phone;


 //Navbar categories



        const navbarCategories = document.querySelector<HTMLElement>("#navbar-categories");

        const navbarCategoriesFragment = document.createDocumentFragment();

        categories.forEach((category) => {

            const li = document.createElement("li");

            const link = document.createElement("a");

            link.classList.add("dropdown-item");

            link.href = `#${category.slug}`;

            const emoji = document.createElement("span");

            emoji.classList.add("emoji");

            emoji.textContent = category.emoji;

            emoji.setAttribute("aria-hidden", "true");

            link.append(emoji, category.name);

            li.append(link);

            navbarCategoriesFragment.append(li);

        });

        if (navbarCategories) {

            navbarCategories.replaceChildren(navbarCategoriesFragment);

        }


 //Navbar menu



        const navbarList = document.querySelector<HTMLElement>("#navbar-list");

        const navbarMenuFragment = document.createDocumentFragment();

        shop.menu.forEach((item) => {

            const li = document.createElement("li");

            li.classList.add("navbar-menu-item");

            const link = document.createElement("a");

            link.classList.add("nav-link");

            link.href = item.href;

            link.textContent = item.label;

            li.append(link);

            navbarMenuFragment.append(li);

        });

        if (navbarList) {

            navbarList

                .querySelectorAll(".navbar-menu-item")

                .forEach((item) => item.remove());

            navbarList.append(navbarMenuFragment);

        }



 //Footer categories



        const footerCategories = document.querySelector<HTMLElement>("#footer-categories");

        const categoriesFragment = document.createDocumentFragment();

        categories.forEach((category) => {

            const li = document.createElement("li");

            const link = document.createElement("a");

            link.href = `#${category.slug}`;

            link.textContent = category.name;

            li.append(link);

            categoriesFragment.append(li);

        });

        if (footerCategories) {

            footerCategories.replaceChildren(categoriesFragment);

        }

 //Footer help

        const helpList = document.querySelector<HTMLElement>("#footer-help");

        const helpFragment = document.createDocumentFragment();

        shop.help.forEach((item) => {

            const li = document.createElement("li");

            const link = document.createElement("a");

            link.href = item.href;

            link.textContent = item.label;

            li.append(link);

            helpFragment.append(li);

        });

        if (helpList) {

            helpList.replaceChildren(helpFragment);

        }



 //Shop schedule



        const schedule = document.querySelector<HTMLElement>("#shop-schedule");

        const scheduleFragment = document.createDocumentFragment();

        shop.schedule.forEach((item) => {

            const p = document.createElement("p");

            const strong = document.createElement("strong");

            const time = document.createElement("span");

            strong.textContent = `${item.days}:`;

            time.textContent = item.time;

            p.append(strong, " ", time);

            scheduleFragment.append(p);

        });

        if (schedule) {

            schedule.replaceChildren(scheduleFragment);

        }



//Copyright



        const copyright = document.querySelector<HTMLElement>("#shop-copyright");

        if (copyright) {

            copyright.textContent = shop.copyright;

        }

    }

    catch {

        const footer = document.querySelector<HTMLElement>("#footer");

        if (footer) {

            renderError(footer, renderShop, "بارگذاری اطلاعات فروشگاه ناموفق بود");

        }

    }


}

renderShop();



//fetch from home.json create banners and promos && add button+Cart and localSorage



async function getHome(): Promise<Home> {
    const url = "../../api/home.json";
    const data: unknown = await getJson(url);

    if (!isHome(data)) {
        clearJsonCache(url);
        throw new Error("Invalid home API response");
    }

    return data;
}

async function renderHome(): Promise<void> {

    renderBannerSkeleton();

    renderPromoSkeletons();

    try {

        const home = await getHome();

        const banner = document.querySelector<HTMLElement>("#banner");

        if (!banner)

            return;

        const bannerTrack = banner.querySelector<HTMLElement>(".banner__track");

        if (!bannerTrack)

            return;

        const slides: HomeSlide[] = [home.hero, home.side];

        const createSlide = (slide: HomeSlide, isDuplicate = false): HTMLAnchorElement => {

            const link = document.createElement("a");

            link.classList.add("banner__slide");

            link.href = slide.cta.href;

            if (isDuplicate) {

                link.setAttribute("aria-hidden", "true");

            }

            const emoji = document.createElement("span");

            emoji.classList.add("banner__slide-emoji");

            emoji.textContent = slide.emoji;

            emoji.setAttribute("aria-hidden", "true");

            const content = document.createElement("div");

            content.classList.add("banner__slide-content");

            const title = document.createElement("h2");

            title.classList.add("banner__slide-title");

            title.textContent = slide.title;

            const text = document.createElement("p");

            text.classList.add("banner__slide-text");

            text.textContent = slide.text;

            const cta = document.createElement("span");

            cta.classList.add("banner__slide-cta");

            cta.textContent = slide.cta.label;

            content.append(title, text, cta);

            link.append(emoji, content);

            return link;

        };

        const bannerFragment = document.createDocumentFragment();

 //Original slides

        slides.forEach((slide) => {

            bannerFragment.append(createSlide(slide));

        });

 //Duplicate slides

        slides.forEach((slide) => {

            bannerFragment.append(createSlide(slide, true));

        });

        bannerTrack.replaceChildren(bannerFragment);

 //Promotions

        home.promos.forEach((promo, index) => {

            const advertisement = document.querySelector<HTMLElement>(`#advertisement-${index + 1}`);

            if (!advertisement)

                return;

            const link = document.createElement("a");

            link.href = promo.href;

            link.style.backgroundColor = promo.color;

            const emoji = document.createElement("span");

            emoji.classList.add("advertisement__emoji");

            emoji.textContent = promo.emoji;

            emoji.setAttribute("aria-hidden", "true");

            const text = document.createElement("span");

            text.classList.add("advertisement__text");

            text.textContent = promo.text;

            link.append(emoji, text);

            advertisement.replaceChildren(link);

        });

    }

    catch {

        const banner = document.querySelector<HTMLElement>("#banner");

        if (banner) {

            renderError(banner, renderHome, "بارگذاری اطلاعات صفحه اصلی ناموفق بود");

        }

    }

}

renderHome();

//Cart + localStorage

const CART_KEY = "yagni-cart";

function getCart(): Cart {

    try {

        const storedCart = localStorage.getItem(CART_KEY);

        if (!storedCart) {

            return [];

        }

        const cart: unknown = JSON.parse(storedCart);

        return isCart(cart) ? cart : [];

    } catch {



        return [];

    }

}

function saveCart(cart: Cart): void {

    try {

        localStorage.setItem(CART_KEY, JSON.stringify(cart));

    } catch {



        notyf.error("ذخیره سبد خرید در این مرورگر امکان‌پذیر نیست");

    }

}

function updateCartUI(): void {

    const cart = getCart();

    const count = cart.reduce((total, item) => total + item.quantity, 0);

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const cartCount = document.querySelector<HTMLElement>(".header__cart-count");

    const cartTotal = document.querySelector<HTMLElement>(".header__cart-content strong");

    if (cartCount) {

        cartCount.textContent = count.toLocaleString("fa-IR");

    }

    if (cartTotal) {

        cartTotal.textContent = `${total.toLocaleString("fa-IR")} تومان`;

    }

}

function addToCart(product: Product, price: number): void {

    const cart = getCart();

    const existingItem = cart.find((item) => item.productId === product.id);

    if (existingItem) {

        existingItem.quantity += 1;

    }

    else {

        cart.push({

            productId: product.id,

            name: product.name,

            price,

            quantity: 1,

        });

    }

    saveCart(cart);

    updateCartUI();

    notyf.success("محصول به سبد خرید اضافه شد");

    confetti();

}
