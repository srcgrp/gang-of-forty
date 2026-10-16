'use strict';

/* ---------- تنظیمات ---------- */

const API_BASE = '../../api/';

const SHOP_NAME = 'سوپرمارکت شایان';

const CART_KEY = 'cart';
const SKELETON_CARD_COUNT = 5;
const SKELETON_CATEGORY_COUNT = 7;
const ROUND_TO = 1000; // قیمت بعد از تخفیف به نزدیک‌ترین هزار تومان گرد می‌شود
const ICON_URL = 'https://api.iconify.design/mdi/';
const ERROR_TEXT =
    'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.';

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const faNumber = new Intl.NumberFormat('fa-IR'); // ۱۶۵٬۰۰۰
const toFaDigits = (text) => text.replace(/\d/g, (digit) => FA_DIGITS[digit]);

/* ---------- ابزارهای کوچک برای ساخت عنصر ---------- */

const $ = (selector) => document.querySelector(selector);

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function createLink(href, text, className) {
    const link = el('a', className, text);
    link.href = href;
    return link;
}

function createIcon(name, color) {
    const img = el('img', 'icon');
    img.src = `${ICON_URL}${name}.svg${color ? `?color=${color}` : ''}`;
    img.alt = '';
    return img;
}

function createEmoji(emoji, className) {
    const span = el('span', className, emoji);
    span.setAttribute('aria-hidden', 'true');
    return span;
}

/* ---------- گرفتن داده ---------- */

async function fetchJSON(fileName) {
    const response = await fetch(`${API_BASE}${fileName}`);
    // fetch does not reject on 404; we must check response.ok ourselves.
    if (!response.ok) {
        throw new Error(`${fileName}: HTTP ${response.status}`);
    }
    return response.json(); // If the JSON is invalid, the promise is rejected here.}
}

// All 6 files are read simultaneously using a single Promise.all.
async function loadData() {
    const [shop, categories, home, products, stock, offers] = await Promise.all(
        [
            fetchJSON('shop.json'),
            fetchJSON('categories.json'),
            fetchJSON('home.json'),
            fetchJSON('products.json'),
            fetchJSON('stock.json'),
            fetchJSON('offers.json'),
        ],
    );
    return {shop, categories, home, products, stock, offers};
}

// Fast lookup tables by ID (instead of using find inside a loop)

function buildContext({categories, products, stock, offers}) {
    return {
        products,
        offers,
        categoryById: new Map(categories.map((c) => [c.id, c])),
        productById: new Map(products.map((p) => [p.id, p])),
        stockById: stock.items,
        offerByProductId: new Map(offers.map((o) => [o.productId, o])),
    };
}

/* ---------- سبد خرید (localStorage) ---------- */

// Stored format: { "201": 2, "104": 1 } means product ID → quantity.
function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        return saved && typeof saved === 'object' && !Array.isArray(saved)
            ? saved
            : {};
    } catch {
        return {}; // Invalid value or localStorage is unavailable
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        // اگر ذخیره ممکن نبود، سبد فقط تا بستن صفحه می‌ماند
    }
}

let cart = loadCart();

function cartCount() {
    return Object.values(cart).reduce(
        (sum, qty) => sum + (Number(qty) || 0),
        0,
    );
}

function renderCartCount() {
    const count = cartCount();
    $('#cart-count').textContent = faNumber.format(count);
    $('#cart').setAttribute(
        'aria-label',
        `سبد خرید، ${faNumber.format(count)} کالا`,
    );
}

function addToCart(productId) {
    cart[productId] = (Number(cart[productId]) || 0) + 1;
    saveCart(cart);
    renderCartCount();
}

// A single event listener on the carousel container (event delegation), instead of inline onclick in HTML
function handleCartClick(event) {
    const button = event.target.closest('button[data-product-id]');
    if (button && !button.disabled) addToCart(button.dataset.productId);
}

/* ---------- قیمت ---------- */

function discountedPrice(price, percent) {
    const raw = (price * (100 - percent)) / 100;
    return Math.round(raw / ROUND_TO) * ROUND_TO;
}

/* ---------- Header و Footer ---------- */

function renderShop(shop) {
    $('#top-bar-text').textContent = shop.notice;

    // Main Menu
    $('#main-menu').append(
        ...shop.menu.map((item) => {
            const li = el('li');
            li.append(createLink(item.href, item.label, 'categories-links'));
            return li;
        }),
    );

    // Footer: درباره، آدرس، تلفن
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

    $('#footer-about').append(
        el('h2', '', SHOP_NAME),
        el('p', '', shop.about),
        address,
        phone,
    );

    // Footer: راهنما و ساعت کاری
    $('#footer-help').append(
        ...shop.help.map((item) => createLink(item.href, item.label)),
    );
    $('#footer-schedule').append(
        ...shop.schedule.map((s) => el('p', '', `${s.days}: ${s.time}`)),
    );

    // نام نمونهٔ «مینا» با نام فروشگاه خودم عوض می‌شود
    $('#copyright').textContent = shop.copyright.replace(shop.name, SHOP_NAME);
}

/* ---------- Cetegories ---------- */

function renderCategories(categories) {
    // کارت‌های بخش «دسته‌بندی‌ها»
    $('#categories').replaceChildren(
        ...categories.map((category) => {
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

    // منوی همه دسته‌ها
    $('#nav-categories').replaceChildren(
        ...categories.map((category) => {
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
    $('#footer-categories').append(
        ...categories.map((c) => createLink(`#${c.slug}`, c.name)),
    );
}

/* ----------  Banners ---------- */

function createBanner(data, {id, titleTag, buttonClass}) {
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

function renderBanners(home) {
    $('#banners').replaceChildren(
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

function createPromos(promos) {
    const wrapper = el('div', 's-banners-container');
    wrapper.append(
        ...promos.map((promo) => {
            const link = createLink(promo.href, '', 's-banners');
            link.style.backgroundColor = promo.color;
            link.append(createEmoji(promo.emoji, 'promo-emoji'), promo.text);
            return link;
        }),
    );
    return wrapper;
}

/* ---------- Card  ---------- */

function createCard(product, context) {
    const inStock = (context.stockById[product.id] ?? 0) > 0; // نبودنِ کلید یعنی ناموجود
    const offer = context.offerByProductId.get(product.id);

    const card = el('article', 'item');
    if (!inStock) card.classList.add('item-out-of-stock');

    // عکس (ایموجی) با رنگ دسته
    const image = createEmoji(product.emoji, 'item-emoji');
    const imageBox = el('div', 'item-image');
    imageBox.setAttribute('aria-hidden', 'true');
    imageBox.style.backgroundColor =
        context.categoryById.get(product.categoryId)?.color ?? '';
    imageBox.append(image);
    card.append(imageBox);

    // برچسب: ناموجود از تخفیف مهم‌تر است
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

    // قیمت
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

    // دکمهٔ افزودن
    const button = el('button', '', '+');
    button.type = 'button';
    if (inStock) {
        button.dataset.productId = product.id;
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

/* ----------  Carousels ---------- */

// Products for each carousel: either from offers.json or filtered by categoryId
function getCarouselProducts(carousel, context) {
    if (carousel.source === 'offers') {
        return context.offers
            .map((offer) => context.productById.get(offer.productId))
            .filter(Boolean); // تخفیفی که محصولش پیدا نشد حذف می‌شود
    }
    return context.products.filter((p) => p.categoryId === carousel.categoryId);
}

function createNavButton(href, label, iconName) {
    const link = createLink(href);
    link.setAttribute('aria-label', label);
    link.append(createIcon(iconName, '%231f2a1c'));
    return link;
}

function createCarouselSection(carousel, context) {
    const products = getCarouselProducts(carousel, context);

    const section = el('section', 'page-section');
    section.id = carousel.id; //  Fragment، ex: #dairy

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
        const cards = products.map((product) => createCard(product, context));
        cards[0].id = firstId; // هدف دکمه‌های ابتدا/انتها
        cards[cards.length - 1].id = lastId;
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

function renderCarousels(carousels, context, promos) {
    const sections = carousels.map((c) => createCarouselSection(c, context));
    // بنرهای تبلیغاتی بین کاروسل اول و دوم قرار می‌گیرند
    sections.splice(1, 0, promos);
    $('#carousels').replaceChildren(...sections);
}

/* ---------- Search ---------- */

function renderSearch(productCount) {
    const search = $('#search');
    const count = faNumber.format(productCount);
    search.placeholder = `جستجو در میان ${count} کالا...`;
    search.setAttribute('aria-label', `جستجو در میان ${count} کالا`);
}

/* ---------- Loading and Error States ---------- */
function createSkeletonCards(count) {
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

function showLoading() {
    $('#main').setAttribute('aria-busy', 'true');

    const wide = el('div', 'banner banner-skeleton banner-skeleton-wide');
    const narrow = el('div', 'banner banner-skeleton');
    $('#banners').replaceChildren(wide, narrow);

    const status = el('p', 'visually-hidden', 'در حال بارگذاری…');
    status.setAttribute('role', 'status');
    const tiles = Array.from({length: SKELETON_CATEGORY_COUNT}, () =>
        el('div', 'skeleton-tile'),
    );
    $('#categories').replaceChildren(status, ...tiles);

    const section = el('section', 'page-section');
    section.setAttribute('aria-hidden', 'true');
    const items = el('div', 'carousel-items');
    items.append(...createSkeletonCards(SKELETON_CARD_COUNT));
    const carousel = el('div', 'carousel');
    carousel.append(items);
    section.append(el('div', 'skeleton-line skeleton-title'), carousel);
    $('#carousels').replaceChildren(section);
}

function showError() {
    $('#main').setAttribute('aria-busy', 'false');
    $('#banners').replaceChildren();
    $('#carousels').replaceChildren();

    const message = el('p', 'carousel-message', ERROR_TEXT);
    message.setAttribute('role', 'alert');
    $('#categories').replaceChildren(message);
}

/* ---------- App Initialization ---------- */

// After rendering, sections are scrolled into view again based on the URL fragment (ex: #dairy).

function scrollToHash() {
    if (!location.hash) return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

function renderPage(data) {
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

    $('#main').setAttribute('aria-busy', 'false');
    scrollToHash();
}

async function init() {
    renderCartCount(); // Cart count from localStorage, without requiring an API
    $('#carousels').addEventListener('click', handleCartClick);
    showLoading();

    try {
        renderPage(await loadData());
    } catch (error) {
        console.warn('Loading page data failed:', error);
        showError();
    }
}

init();
