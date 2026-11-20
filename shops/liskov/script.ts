import 'notyf/notyf.min.css';

import confetti from 'canvas-confetti';
import {Notyf} from 'notyf';

import {loadData} from './api';

import type {
    AppData,
    Banner,
    CarouselConfig,
    Cart,
    Category,
    Home,
    Link,
    Offer,
    Product,
    Promo,
    ScheduleEntry,
    Shop,
} from './types';

/* ---------- Settings ---------- */

const SHOP_NAME = 'سوپرمارکت شایان';

const CART_KEY = 'cart';
const SKELETON_CARD_COUNT = 5;
const SKELETON_CATEGORY_COUNT = 7;
const ROUND_TO = 1000; // Discounted prices are rounded to the nearest 1,000 tomans.
const ICON_URL = 'https://api.iconify.design/mdi/';
const ERROR_TEXT =
    'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.';

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const faNumber = new Intl.NumberFormat('fa-IR');

const toFaDigits = (text: string): string =>
    text.replace(/\d/g, (digit: string): string =>
        FA_DIGITS.charAt(Number(digit)),
    );

/* ---------- Types used only in this file ---------- */

// Fast lookup tables by ID (instead of calling find() inside a loop).
type Context = {
    products: Product[];
    offers: Offer[];
    categoryById: Map<number, Category>;
    productById: Map<number, Product>;
    stockById: Record<number, number>;
    offerByProductId: Map<number, Offer>;
};

type BannerOptions = {
    id: string;
    titleTag: 'h1' | 'h2';
    buttonClass: string;
};

/* ---------- Page elements ---------- */

// Looks up an element once and fails loudly if index.html does not contain it.
function getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) {
        throw new Error(`index.html is missing an element: ${selector}`);
    }
    return element;
}

const dom = {
    main: getElement<HTMLElement>('#main'),
    topBarText: getElement<HTMLParagraphElement>('#top-bar-text'),
    mainMenu: getElement<HTMLUListElement>('#main-menu'),
    navCategories: getElement<HTMLUListElement>('#nav-categories'),
    search: getElement<HTMLInputElement>('#search'),
    cart: getElement<HTMLButtonElement>('#cart'),
    cartCount: getElement<HTMLSpanElement>('#cart-count'),
    banners: getElement<HTMLDivElement>('#banners'),
    categories: getElement<HTMLDivElement>('#categories'),
    carousels: getElement<HTMLDivElement>('#carousels'),
    footerAbout: getElement<HTMLDivElement>('#footer-about'),
    footerCategories: getElement<HTMLElement>('#footer-categories'),
    footerHelp: getElement<HTMLElement>('#footer-help'),
    footerSchedule: getElement<HTMLDivElement>('#footer-schedule'),
    copyright: getElement<HTMLParagraphElement>('#copyright'),
};

/* ---------- Small helpers for building elements ---------- */

function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string,
    text?: string,
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function createLink(
    href: string,
    text?: string,
    className?: string,
): HTMLAnchorElement {
    const link = el('a', className, text);
    link.href = href;
    return link;
}

function createIcon(name: string, color?: string): HTMLImageElement {
    const img = el('img', 'icon');
    img.src = `${ICON_URL}${name}.svg${color ? `?color=${color}` : ''}`;
    img.alt = '';
    return img;
}

function createEmoji(emoji: string, className: string): HTMLSpanElement {
    const span = el('span', className, emoji);
    span.setAttribute('aria-hidden', 'true');
    return span;
}

// Type guard that removes undefined, e.g. from Map.get() results.
function isDefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

function indexBy<Item, Key>(
    items: Item[],
    getKey: (item: Item) => Key,
): Map<Key, Item> {
    return new Map(
        items.map((item: Item): [Key, Item] => [getKey(item), item]),
    );
}

function buildContext({categories, products, stock, offers}: AppData): Context {
    return {
        products,
        offers,
        categoryById: indexBy(categories, (category: Category) => category.id),
        productById: indexBy(products, (product: Product) => product.id),
        stockById: stock.items,
        offerByProductId: indexBy(offers, (offer: Offer) => offer.productId),
    };
}

/* ---------- Cart (localStorage) ---------- */

// Checks the parsed localStorage value before we trust it as a Cart.
function isCart(value: unknown): value is Cart {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }
    return Object.values(value).every(
        (quantity: unknown): boolean => typeof quantity === 'number',
    );
}

function loadCart(): Cart {
    try {
        const saved = localStorage.getItem(CART_KEY);
        if (saved === null) return {};

        const parsed: unknown = JSON.parse(saved);
        return isCart(parsed) ? parsed : {};
    } catch {
        return {}; // Invalid JSON, or localStorage is unavailable.
    }
}

function saveCart(cart: Cart): void {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        // If saving fails, the cart only lives until the page is closed.
    }
}

const cart: Cart = loadCart();

function countCartItems(): number {
    return Object.values(cart).reduce(
        (sum: number, quantity: number): number => sum + quantity,
        0,
    );
}

function renderCartCount(): void {
    const count = faNumber.format(countCartItems());
    dom.cartCount.textContent = count;
    dom.cart.setAttribute('aria-label', `سبد خرید، ${count} کالا`);
}

function addToCart(productId: string): void {
    cart[productId] = (cart[productId] ?? 0) + 1;
    saveCart(cart);
    renderCartCount();
}

/* ---------- Add-to-cart feedback (notyf + canvas-confetti) ---------- */

const notyf = new Notyf({
    duration: 2500,
    dismissible: true,
    position: {x: 'center', y: 'bottom'},
});

// Notyf renders its message as HTML and does not sanitize it,
// so text that comes from the API must be escaped first.
function escapeHtml(text: string): string {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

// Shows a toast and a small confetti burst that starts at the clicked button.
function showAddedFeedback(
    button: HTMLButtonElement,
    productName: string,
): void {
    notyf.success(`${escapeHtml(productName)} به سبد خرید اضافه شد`);

    const {left, top, width, height} = button.getBoundingClientRect();
    void confetti({
        particleCount: 60,
        spread: 70,
        origin: {
            x: (left + width / 2) / window.innerWidth,
            y: (top + height / 2) / window.innerHeight,
        },
        disableForReducedMotion: true,
    });
}

// A single listener on the carousels container (event delegation)
// instead of one inline onclick per button.
function handleCartClick(event: MouseEvent): void {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>(
        'button[data-product-id]',
    );
    if (!button || button.disabled) return;

    // createCard() always sets both attributes; the check only narrows the types.
    const {productId, productName} = button.dataset;
    if (productId === undefined || productName === undefined) return;

    addToCart(productId);
    showAddedFeedback(button, productName);
}

/* ---------- Price ---------- */

function discountedPrice(price: number, percent: number): number {
    const raw = (price * (100 - percent)) / 100;
    return Math.round(raw / ROUND_TO) * ROUND_TO;
}

/* ---------- Header and Footer ---------- */

function renderShop(shop: Shop): void {
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

    // The API returns a sample shop name; replace it with our own shop name.
    dom.copyright.textContent = shop.copyright.replace(shop.name, SHOP_NAME);
}

/* ---------- Categories ---------- */

function renderCategories(categories: Category[]): void {
    // Cards of the "Categories" section
    dom.categories.replaceChildren(
        ...categories.map((category: Category) => {
            const icon = createEmoji(category.emoji, 'category-icon');
            icon.style.backgroundColor = category.color;

            const link = createLink(
                `#${category.slug}`,
                '',
                'categories-items',
            );
            link.append(icon, category.name);
            return link;
        }),
    );

    // "All categories" dropdown menu
    dom.navCategories.replaceChildren(
        ...categories.map((category: Category) => {
            const li = el('li');
            const link = createLink(`#${category.slug}`);
            link.append(
                createEmoji(category.emoji, 'menu-emoji'),
                category.name,
            );
            li.append(link);
            return li;
        }),
    );

    // Footer links
    dom.footerCategories.append(
        ...categories.map((category: Category) =>
            createLink(`#${category.slug}`, category.name),
        ),
    );
}

/* ---------- Banners ---------- */

function createBanner(
    data: Banner,
    {id, titleTag, buttonClass}: BannerOptions,
): HTMLElement {
    const banner = el('section', 'banner');
    banner.id = id;

    const title = el(titleTag, '', data.title);
    title.id = `${id}-title`;
    banner.setAttribute('aria-labelledby', title.id);

    banner.append(
        title,
        el('p', '', data.text),
        createEmoji(data.emoji, 'banner-emoji'),
        createLink(
            data.cta.href,
            data.cta.label,
            `banner-button ${buttonClass}`,
        ),
    );
    return banner;
}

function renderBanners(home: Home): void {
    dom.banners.replaceChildren(
        createBanner(home.hero, {
            id: 'banner-1',
            titleTag: 'h1',
            buttonClass: 'banner-button-right',
        }),
        createBanner(home.side, {
            id: 'banner-2',
            titleTag: 'h2',
            buttonClass: 'banner-button-left',
        }),
    );
}

function createPromos(promos: Promo[]): HTMLDivElement {
    const wrapper = el('div', 's-banners-container');
    wrapper.append(
        ...promos.map((promo: Promo) => {
            const link = createLink(promo.href, '', 's-banners');
            link.style.backgroundColor = promo.color;
            link.append(createEmoji(promo.emoji, 'promo-emoji'), promo.text);
            return link;
        }),
    );
    return wrapper;
}

/* ---------- Product card ---------- */

function createCard(product: Product, context: Context): HTMLElement {
    // A missing key in the stock list means the product is out of stock.
    const inStock = (context.stockById[product.id] ?? 0) > 0;
    const offer = context.offerByProductId.get(product.id);

    const card = el('article', 'item');
    if (!inStock) card.classList.add('item-out-of-stock');

    // Image (an emoji) on the category's color
    const image = createEmoji(product.emoji, 'item-emoji');
    const imageBox = el('div', 'item-image');
    imageBox.setAttribute('aria-hidden', 'true');
    imageBox.style.backgroundColor =
        context.categoryById.get(product.categoryId)?.color ?? '';
    imageBox.append(image);
    card.append(imageBox);

    // Badge: "out of stock" is more important than "discount".
    if (!inStock) {
        card.append(
            el('span', 'item-badge item-badge-out-of-stock', 'ناموجود'),
        );
    } else if (offer) {
        card.append(
            el(
                'span',
                'item-badge',
                `${faNumber.format(offer.percent)}٪ تخفیف`,
            ),
        );
    }

    card.append(
        el('h3', '', product.name),
        el('p', 'item-weight', product.unit),
    );

    // Price
    const price = el('p', 'item-price');
    if (offer) {
        const newPrice = discountedPrice(product.price, offer.percent);
        price.append(
            el('del', '', faNumber.format(product.price)),
            ` ${faNumber.format(newPrice)} تومان`,
        );
    } else {
        price.textContent = `${faNumber.format(product.price)} تومان`;
    }

    // "Add to cart" button
    const button = el('button', '', '+');
    button.type = 'button';
    if (inStock) {
        button.dataset.productId = String(product.id);
        button.dataset.productName = product.name;
        button.setAttribute('aria-label', `افزودن ${product.name} به سبد`);
    } else {
        button.disabled = true;
        button.setAttribute('aria-label', `${product.name} ناموجود است`);
    }

    const purchase = el('div', 'item-purchase');
    purchase.append(price, button);
    card.append(purchase);
    return card;
}

/* ---------- Carousels ---------- */

// Products of one carousel: either the products from offers.json
// or the products filtered by categoryId.
function getCarouselProducts(
    carousel: CarouselConfig,
    context: Context,
): Product[] {
    if (carousel.source === 'offers') {
        return context.offers
            .map((offer: Offer) => context.productById.get(offer.productId))
            .filter(isDefined); // An offer whose product was not found is dropped.
    }
    return context.products.filter(
        (product: Product): boolean =>
            product.categoryId === carousel.categoryId,
    );
}

function createNavButton(
    href: string,
    label: string,
    iconName: string,
): HTMLAnchorElement {
    const link = createLink(href);
    link.setAttribute('aria-label', label);
    link.append(createIcon(iconName, '%231f2a1c'));
    return link;
}

function createCarouselSection(
    carousel: CarouselConfig,
    context: Context,
): HTMLElement {
    const products = getCarouselProducts(carousel, context);

    const section = el('section', 'page-section');
    section.id = carousel.id; // Used as the URL fragment, e.g. #dairy

    const title = el('h2', 'titles');
    title.id = `${carousel.id}-title`;
    title.append(createEmoji(carousel.emoji, 'title-emoji'), carousel.title);
    section.setAttribute('aria-labelledby', title.id);

    const items = el('div', 'carousel-items');
    items.tabIndex = 0;
    items.setAttribute('role', 'group');
    items.setAttribute(
        'aria-label',
        `${carousel.title}، با کلیدهای جهت‌نما حرکت کنید`,
    );

    const firstId = `${carousel.id}-first-item`;
    const lastId = `${carousel.id}-last-item`;

    if (products.length === 0) {
        items.append(
            el(
                'p',
                'carousel-message carousel-message-info',
                'فعلاً محصولی برای نمایش وجود ندارد.',
            ),
        );
    } else {
        const cards = products.map((product: Product) =>
            createCard(product, context),
        );

        const firstCard = cards[0];
        const lastCard = cards[cards.length - 1];

        if (firstCard && lastCard) {
            firstCard.id = firstId;
            lastCard.id = lastId;
        }
        items.append(...cards);
    }

    const buttons = el('div', 'carousel-buttons');
    buttons.append(
        createNavButton(`#${firstId}`, 'رفتن به ابتدای فهرست', 'chevron-right'),
        createNavButton(`#${lastId}`, 'رفتن به انتهای فهرست', 'chevron-left'),
    );

    const carouselBox = el('div', 'carousel');
    carouselBox.append(items, buttons);
    section.append(title, carouselBox);
    return section;
}

function renderCarousels(
    carousels: CarouselConfig[],
    context: Context,
    promos: HTMLElement,
): void {
    const sections: HTMLElement[] = carousels.map((carousel: CarouselConfig) =>
        createCarouselSection(carousel, context),
    );
    // The promo banners go between the first and the second carousel.
    sections.splice(1, 0, promos);
    dom.carousels.replaceChildren(...sections);
}

/* ---------- Search ---------- */

function renderSearch(productCount: number): void {
    const count = faNumber.format(productCount);
    dom.search.placeholder = `جستجو در میان ${count} کالا...`;
    dom.search.setAttribute('aria-label', `جستجو در میان ${count} کالا`);
}

/* ---------- Loading and error states ---------- */

function createSkeletonCards(count: number): HTMLDivElement[] {
    return Array.from({length: count}, () => {
        const card = el('div', 'item item-skeleton');
        card.setAttribute('aria-hidden', 'true');
        card.append(
            el('div', 'skeleton-block'),
            el('div', 'skeleton-line'),
            el('div', 'skeleton-line skeleton-line-short'),
        );
        return card;
    });
}

function showLoading(): void {
    dom.main.setAttribute('aria-busy', 'true');

    const wide = el('div', 'banner banner-skeleton banner-skeleton-wide');
    const narrow = el('div', 'banner banner-skeleton');
    dom.banners.replaceChildren(wide, narrow);

    const status = el('p', 'visually-hidden', 'در حال بارگذاری…');
    status.setAttribute('role', 'status');
    const tiles = Array.from({length: SKELETON_CATEGORY_COUNT}, () =>
        el('div', 'skeleton-tile'),
    );
    dom.categories.replaceChildren(status, ...tiles);

    const section = el('section', 'page-section');
    section.setAttribute('aria-hidden', 'true');
    const items = el('div', 'carousel-items');
    items.append(...createSkeletonCards(SKELETON_CARD_COUNT));
    const carousel = el('div', 'carousel');
    carousel.append(items);
    section.append(el('div', 'skeleton-line skeleton-title'), carousel);
    dom.carousels.replaceChildren(section);
}

function showError(): void {
    dom.main.setAttribute('aria-busy', 'false');
    dom.banners.replaceChildren();
    dom.carousels.replaceChildren();

    const message = el('p', 'carousel-message', ERROR_TEXT);
    message.setAttribute('role', 'alert');
    dom.categories.replaceChildren(message);
}

/* ---------- App initialization ---------- */

// The sections only exist after rendering, so we scroll to the one named
// in the URL fragment (e.g. #dairy) once the page is ready.
function scrollToHash(): void {
    if (!location.hash) return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

function renderPage(data: AppData): void {
    const context = buildContext(data);

    renderShop(data.shop);
    renderCategories(data.categories);
    renderBanners(data.home);
    renderCarousels(
        data.home.carousels,
        context,
        createPromos(data.home.promos),
    );
    renderSearch(data.products.length);

    dom.main.setAttribute('aria-busy', 'false');
    scrollToHash();
}

async function init(): Promise<void> {
    renderCartCount(); // The cart count comes from localStorage, not from the API.
    dom.carousels.addEventListener('click', handleCartClick);
    showLoading();

    try {
        renderPage(await loadData());
    } catch (error: unknown) {
        console.warn('Loading page data failed:', error);
        showError();
    }
}

void init();
