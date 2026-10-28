import Fuse from 'fuse.js';
import { Notyf } from 'notyf';
import Swal from 'sweetalert2';
import heroImage from './1.jpg';
import dairyImage from './labaniat.jpg';
import 'notyf/notyf.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const PRODUCTS_URL = "../../api/products.json"
const STOCK_URL = "../../api/stock.json";
const OFFERS_URL = "../../api/offers.json";
const CATEGORIES_URL = "../../api/categories.json";
const SHOP_URL = "../../api/shop.json";

const priceFormatter = new Intl.NumberFormat("fa-IR")

const HOME_URL = "../../api/home.json";
const CART_KEY = "tdd:w2:cart-count";
let cartCount = 0;
const notyf = new Notyf({ duration: 2000, position: { x: "left", y: "top" } });
const brandStory = {"paragraphs": ["سام مارکت، سوپرمارکت سام در پروژه بوتکمپ است؛ با یک سبد برای نیازهای روزمره و یک داستان از دنیای برنامه‌نویسی. نام پروژه، TDD، یادآور هدف سام است: تسلط بر توسعه آزمون‌محور تا پایان بوتکمپ.", "در توسعه آزمون‌محور، اول یک تست ناموفق می‌نویسیم، بعد کد لازم برای پاس‌شدن آن را می‌سازیم و در پایان ساختار کد را بهبود می‌دهیم. سام از این نگاه برای ایده ارزیابی تازگی الهام گرفته: اول معیار مشخص، بعد بررسی محصول و در ادامه بهبود شیوه انتخاب. این فرایند، طرح پیشنهادی برند در پروژه بوتکمپ فرانت اند است؛ چرخه نرم‌افزاری TDD الهام آن است."], "steps": [{"title": "قرمز؛ اول معیار، بعد انتخاب", "text": "در TDD، تست پیش از راه‌حل نوشته می‌شود. در ایده سام، معیار تازگی را پیش از انتخاب مشخص می‌کنیم؛ محصولی که با معیار هماهنگ نیست، نیاز به بررسی دارد."}, {"title": "سبز؛ انتخاب پس از ارزیابی", "text": "همان‌طور که کد باید تست را پاس کند، در فرایند پیشنهادی سام هم انتخاب محصول باید با معیارهای تعریف‌شده هماهنگ باشد؛ تازگی، پشتوانه انتخاب است."}, {"title": "آبی؛ بهترشدن فرایند", "text": "در بازآرایی، ساختار کد بهتر می‌شود و تست‌ها همچنان موفق می‌مانند. در ایده فروشگاه هم بازخوردها به بهترشدن ارزیابی و نگهداری کمک می‌کنند؛ با حفظ معیار تازگی."}]};

type CarouselElements = {
    prefix: string;
    track: HTMLElement;
    controls: HTMLElement;
    status: HTMLParagraphElement;
};

type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};

type Stock = {
    updatedAt: string;
    items: Record<number, number>;
};

type Offer = {
    productId: number;
    percent: number;
    label: string;
};

type Category = {
    id: number;
    slug: string;
    name: string;
    emoji: string;
    color: string;
};

type ShopLink = { label: string; href: string };

type Shop = {
    name: string;
    slogan: string;
    owner: string;
    city: string;
    phone: string;
    hours: { open: string; close: string };
    deliveryFee: number;
    freeDeliveryOver: number;
    currency: string;
    notice: string;
    about: string;
    address: string;
    schedule: { days: string; time: string }[];
    menu: ShopLink[];
    help: ShopLink[];
    copyright: string;
};

type HomeBanner = {
    title: string;
    text: string;
    emoji: string;
    cta: ShopLink;
};

type HomePromo = {
    text: string;
    emoji: string;
    color: string;
    href: string;
};

type CarouselConfig = {
    id: string;
    title: string;
    emoji: string;
    source?: "offers";
    categoryId?: number;
};

type Home = {
    hero: HomeBanner;
    side: HomeBanner;
    promos: HomePromo[];
    carousels: CarouselConfig[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value);
}

function isPositiveId(value: unknown): value is number {
    return isNumber(value) && Number.isInteger(value) && value > 0;
}

function isNonNegativeInteger(value: unknown): value is number {
    return isNumber(value) && Number.isInteger(value) && value >= 0;
}

function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
    return Array.isArray(value) && value.every(guard);
}

function isProduct(value: unknown): value is Product {
    return isRecord(value) &&
        isPositiveId(value.id) && isPositiveId(value.categoryId) &&
        isString(value.name) && isString(value.emoji) && isString(value.unit) &&
        isNumber(value.price) && value.price >= 0 &&
        isArrayOf(value.tags, isString);
}

function isStock(value: unknown): value is Stock {
    return isRecord(value) && isString(value.updatedAt) &&
        isRecord(value.items) &&
        Object.entries(value.items).every(([id, count]) =>
            isPositiveId(Number(id)) && isNonNegativeInteger(count));
}

function isOffer(value: unknown): value is Offer {
    return isRecord(value) && isPositiveId(value.productId) &&
        isNumber(value.percent) && value.percent >= 0 && value.percent <= 100 &&
        isString(value.label);
}

function isCategory(value: unknown): value is Category {
    return isRecord(value) && isPositiveId(value.id) &&
        isString(value.slug) && isString(value.name) &&
        isString(value.emoji) && isString(value.color);
}

function isShopLink(value: unknown): value is ShopLink {
    return isRecord(value) && isString(value.label) && isString(value.href);
}

function isShop(value: unknown): value is Shop {
    return isRecord(value) &&
        isString(value.name) && isString(value.slogan) &&
        isString(value.owner) && isString(value.city) && isString(value.phone) &&
        isRecord(value.hours) && isString(value.hours.open) && isString(value.hours.close) &&
        isNumber(value.deliveryFee) && isNumber(value.freeDeliveryOver) &&
        isString(value.currency) && isString(value.notice) &&
        isString(value.about) && isString(value.address) &&
        isArrayOf(value.schedule, (entry): entry is { days: string; time: string } =>
            isRecord(entry) && isString(entry.days) && isString(entry.time)) &&
        isArrayOf(value.menu, isShopLink) && isArrayOf(value.help, isShopLink) &&
        isString(value.copyright);
}

function isHomeBanner(value: unknown): value is HomeBanner {
    return isRecord(value) &&
        isString(value.title) && isString(value.text) &&
        isString(value.emoji) && isShopLink(value.cta);
}

function isHomePromo(value: unknown): value is HomePromo {
    return isRecord(value) &&
        isString(value.text) && isString(value.emoji) &&
        isString(value.color) && isString(value.href);
}

function isCarouselConfig(value: unknown): value is CarouselConfig {
    return isRecord(value) &&
        isString(value.id) && isString(value.title) && isString(value.emoji) &&
        (value.source === "offers" || (value.source === undefined && isPositiveId(value.categoryId)));
}

function isHome(value: unknown): value is Home {
    return isRecord(value) && isHomeBanner(value.hero) &&
        isHomeBanner(value.side) &&
        isArrayOf(value.promos, isHomePromo) &&
        isArrayOf(value.carousels, isCarouselConfig);
}

async function loadJSON<T>(
    url: string,
    isValid: (value: unknown) => value is T
): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${url}`);
    }

    const data: unknown = await response.json();
    if (!isValid(data)) {
        throw new Error(`Invalid API data: ${url}`);
    }
    return data;
}


function showStatus(carousel: CarouselElements, message: string, isError: boolean = false): void {
    carousel.status.textContent = message;
    carousel.status.classList.toggle("is-error", isError);
}

function createProductCard(product: Product, cardId: string, quantity: number, offer?: Offer): HTMLElement {
    const titleId = `${cardId}-name`
    const statusId = `${cardId}-status`;

    const isUnavailable = quantity === 0

    let finalPrice = product.price
    if (offer) {
        finalPrice = Math.round(product.price * (1 - offer.percent / 100))
    }

    const card = document.createElement("article")
    card.className = "product-card"
    card.id = cardId
    card.setAttribute("aria-labelledby", titleId)
    card.classList.toggle("is-unavailable", isUnavailable);

    const imageContainer = document.createElement("div")
    imageContainer.className = "product-image"

    const icon = document.createElement("span")
    icon.className = "product-icon"
    icon.setAttribute("aria-hidden", "true")
    icon.textContent = product.emoji

    imageContainer.append(icon)

    //discount badge
    if (offer) {
        const discountBadge = document.createElement("span")
        discountBadge.className = "discount-badge"
        discountBadge.textContent = `${priceFormatter.format(offer.percent)}٪ تخفیف`
        imageContainer.append(discountBadge)
    }

    //unavailable badge
    if (isUnavailable) {
        const stockBadge = document.createElement("span")
        stockBadge.className = "stock-badge"
        stockBadge.textContent = "ناموجود"
        stockBadge.setAttribute("aria-hidden", "true");
        imageContainer.append(stockBadge)
    }

    const title = document.createElement("h3")
    title.id = titleId
    title.textContent = product.name
    
    //price
    const prices = document.createElement("div")
    prices.className = "product-prices"

    if(offer) {
        const previousPrice = document.createElement("p")
        previousPrice.className = "previous-price";

        const oldPriceValue = document.createElement("del");
        oldPriceValue.textContent =`${priceFormatter.format(product.price)} تومان`;

        previousPrice.append("قیمت قبلی: ", oldPriceValue);
        prices.append(previousPrice);
    }
    const currentPrice = document.createElement("p")
    currentPrice.className = "current-price"

    const priceValue = document.createElement("strong")
    priceValue.textContent = priceFormatter.format(finalPrice)
    
    const priceLabel = offer ? "قیمت با تخفیف: " : "قیمت: ";

    currentPrice.append(priceLabel, priceValue, " تومان")
    prices.append(currentPrice)


    //amount
    const amount = document.createElement("p")
    amount.className = "product-amount"
    amount.textContent = product.unit

    if(isUnavailable) {
        const stockStatus = document.createElement("p")
        stockStatus.className = "stock-status"
        stockStatus.id = statusId
        stockStatus.textContent = "ناموجود"

        prices.append(stockStatus);
        card.setAttribute("aria-describedby", statusId);
    }

    const addButton = document.createElement("button")
    addButton.className = "add-button"
    addButton.type = "button"
    addButton.setAttribute("aria-label", `افزودن ${product.name} به سبد خرید`)
    addButton.disabled = isUnavailable;
    addButton.addEventListener("click", addToCart);

    const buttonIcon = document.createElement("span");
    buttonIcon.setAttribute("aria-hidden", "true");
    buttonIcon.textContent = isUnavailable ? "×" : "+";

    addButton.append("افزودن به سبد ", buttonIcon);


    card.append(imageContainer, title, amount, prices, addButton)
    
    return card
}

function renderProducts(carousel: CarouselElements, products: Product[], stock: Stock, offers: Map<number, Offer>): void {
    carousel.track.replaceChildren()
    carousel.controls.hidden = true

    if (products.length === 0) {
        showStatus(carousel, "محصولی برای نمایش وجود ندارد.")
    } else {
        products.forEach((product, index) => {
            let cardId = `${carousel.prefix}-product-${product.id}`
            if (index === 0) {
                cardId = `${carousel.prefix}-first`
            } else if (index === products.length - 1) {
                cardId = `${carousel.prefix}-last`
            }

            const quantity = stock.items[product.id]
            const offer = offers.get(product.id)
            carousel.track.append(createProductCard(product, cardId, quantity, offer))
        })

        const firstLink = carousel.controls.querySelector<HTMLAnchorElement>("a:first-child");
        const lastLink = carousel.controls.querySelector<HTMLAnchorElement>("a:last-child");
        if (!firstLink || !lastLink) throw new Error("Missing carousel links");

        firstLink.href = `#${carousel.prefix}-first`;
        lastLink.href = products.length === 1
            ? `#${carousel.prefix}-first`
            : `#${carousel.prefix}-last`;

        showStatus(carousel, "");
        carousel.controls.hidden = false;
    }
}

// Level 3: one category dataset supplies all navigation and destinations.
function createTextElement<K extends keyof HTMLElementTagNameMap>(
    tag: K, text: string, className?: string
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
}

function createLink(label: string, href: string): HTMLAnchorElement {
    const link = createTextElement("a", label);
    link.setAttribute("href", href);
    return link;
}

function renderCategories(categories: Category[], products: Product[] = []): void {
    const grid = document.querySelector<HTMLDivElement>("#category-grid");
    const sections = document.querySelector<HTMLElement>("#category-sections");
    const desktopMenu = document.querySelector<HTMLDivElement>("#desktop-categories");
    const mobileMenu = document.querySelector<HTMLDivElement>("#mobile-categories");
    const footerMenu = document.querySelector<HTMLElement>("#footer-categories");

    if (!grid || !sections || !desktopMenu || !mobileMenu || !footerMenu) {
        throw new Error("Missing category elements");
    }
    const menus = [desktopMenu, mobileMenu, footerMenu];

    grid.replaceChildren();
    sections.replaceChildren();
    menus.forEach(menu => menu.replaceChildren());

    categories.forEach(category => {
        const href = `#${category.slug}`;
        const link = createLink("", href);
        const icon = createTextElement("span", category.emoji);
        icon.setAttribute("aria-hidden", "true");
        icon.style.background = category.color;
        link.append(icon, createTextElement("strong", category.name));
        grid.append(link);

        menus.forEach(menu => menu.append(createLink(category.name, href)));

        if (!document.getElementById(category.slug)) {
            const section = document.createElement("article");
            section.id = category.slug;
            section.setAttribute("aria-labelledby", `category-${category.id}-title`);
            const sectionIcon = createTextElement("span", category.emoji);
            sectionIcon.setAttribute("aria-hidden", "true");
            sectionIcon.style.background = category.color;
            const copy = document.createElement("div");
            const heading = createTextElement("h2", category.name);
            heading.id = `category-${category.id}-title`;
            const categoryProducts = products.filter(product => product.categoryId === category.id);
            copy.append(heading);
            if (categoryProducts.length) {
                copy.append(createTextElement("p", categoryProducts.map(product => product.name).join("، ")));
            }
            section.append(sectionIcon, copy);
            sections.append(section);
        }
    });
}

function renderShop(shop: Shop): void {
    const notice = document.querySelector<HTMLParagraphElement>("#shop-notice");
    const slogan = document.querySelector<HTMLElement>("#shop-slogan");
    const footerAbout = document.querySelector<HTMLParagraphElement>("#footer-about-text");
    const address = document.querySelector<HTMLElement>("#shop-address");
    if (!notice || !slogan || !footerAbout || !address) {
        throw new Error("Missing shop elements");
    }

    notice.textContent = shop.notice;
    slogan.textContent = shop.slogan;
    renderAbout(shop.about);
    footerAbout.textContent = shop.about;

    const phone = createLink(shop.phone, `tel:${shop.phone.replace(/[^+0-9]/g, "")}`);
    phone.dir = "ltr";
    address.replaceChildren(
        document.createTextNode(shop.address),
        document.createElement("br"),
        phone
    );

    const schedule = document.querySelector<HTMLDivElement>("#shop-schedule");
    if (!schedule) throw new Error("Missing shop schedule");
    schedule.replaceChildren(createTextElement("h3", "ساعت کاری"));
    shop.schedule.forEach(entry => {
        schedule.append(createTextElement("p", `${entry.days}: ${entry.time}`));
    });

    // Keep our own brand while using the API's copyright text.
    const brandName = document.querySelector<HTMLElement>(".brand strong");
    const copyright = document.querySelector<HTMLParagraphElement>("#shop-copyright");
    if (!brandName || !copyright) throw new Error("Missing shop footer elements");
    copyright.textContent = shop.copyright.replaceAll(shop.name, brandName.textContent);

    [".desktop-navigation", ".mobile-navigation"].forEach(selector => {
        const menu = document.querySelector<HTMLElement>(selector);
        if (!menu) throw new Error(`Missing navigation: ${selector}`);
        menu.querySelectorAll<HTMLAnchorElement>("[data-shop-link]").forEach(link => link.remove());
        shop.menu.forEach(item => {
            const link = createLink(item.label, item.href);
            link.dataset.shopLink = "";
            menu.append(link);
        });
    });
}

// Measure the actual sticky header rather than adding two fixed CSS offsets.
function fragmentTarget(hash: string): HTMLElement | null {
    let id;
    try {
        id = decodeURIComponent(hash.slice(1));
    } catch {
        return null;
    }
    return document.getElementById(id);
}

function scrollToFragment(animate: boolean = true): void {
    const target = fragmentTarget(location.hash);
    document.querySelectorAll<HTMLElement>(".is-fragment-target").forEach(element => {
        element.classList.remove("is-fragment-target");
    });
    if (!target) return;
    target.classList.add("is-fragment-target");
    const behavior = animate && !matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "smooth" : "instant";
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) throw new Error("Missing site header");
    const headerHeight = header.getBoundingClientRect().height;
    const track = target.closest<HTMLElement>(".product-track");
    const section = (track && target.closest<HTMLElement>(".product-carousel")) || target;

    if (track) {
        // Move the RTL track horizontally without letting it move the page vertically.
        const padding = parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0;
        track.scrollBy({
            left: target.getBoundingClientRect().right - track.getBoundingClientRect().right + padding,
            behavior
        });
    }

    window.scrollTo({
        top: Math.max(0, scrollY + section.getBoundingClientRect().top - headerHeight - 12),
        behavior
    });
}

document.addEventListener("click", (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname ||
        url.search !== location.search || !url.hash || !fragmentTarget(url.hash)) return;

    event.preventDefault();
    const mobileMenu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
    if (!mobileMenu) throw new Error("Missing mobile menu");
    mobileMenu.open = false;
    if (location.hash !== url.hash) history.pushState(null, "", url.hash);
    requestAnimationFrame(() => scrollToFragment());
});

window.addEventListener("hashchange", () => scrollToFragment());

// Keep native fragment offsets correct too, including when the viewport changes.
const siteHeader = document.querySelector<HTMLElement>(".site-header");
if (!siteHeader) throw new Error("Missing site header");
const headerObserver = new ResizeObserver(() => {
    const height = siteHeader.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--header-offset", `${height + 12}px`);
});
headerObserver.observe(siteHeader);

function renderCartCount(): void {
    const formatted = priceFormatter.format(cartCount);
    const count = document.querySelector<HTMLElement>("#cart-count");
    const cart = document.querySelector<HTMLAnchorElement>(".cart");
    const clearButton = document.querySelector<HTMLButtonElement>("#clear-cart");
    if (!count || !cart || !clearButton) throw new Error("Missing cart elements");
    count.textContent = formatted;
    cart.setAttribute("aria-label", `سبد خرید، ${formatted} کالا`);
    clearButton.disabled = cartCount === 0;
}

function restoreCart(): void {
    try {
        const saved = Number(localStorage.getItem(CART_KEY));
        cartCount = Number.isSafeInteger(saved) && saved >= 0 ? saved : 0;
    } catch {
        cartCount = 0;
    }
    renderCartCount();
}

function addToCart(): void {
    if (cartCount < Number.MAX_SAFE_INTEGER) {
        cartCount += 1;
        renderCartCount();
        const status = document.querySelector<HTMLParagraphElement>("#cart-status");
        if (!status) throw new Error("Missing cart status");
        try {
            localStorage.setItem(CART_KEY, String(cartCount));
            status.textContent = "";
        } catch {
            status.textContent = "کالا اضافه شد؛ ذخیره سبد برای مراجعه بعدی در این مرورگر ممکن نیست.";
        }
        notyf.success("به سبد خرید اضافه شد");
    }
}

function enableClearCart(): void {
    const button = document.querySelector<HTMLButtonElement>("#clear-cart");
    const status = document.querySelector<HTMLParagraphElement>("#cart-status");
    if (!button || !status) throw new Error("Missing cart controls");

    button.addEventListener("click", async () => {
        if (cartCount > 0) {
            const result = await Swal.fire({
                title: "سبد خرید خالی شود؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "بله، خالی شود",
                cancelButtonText: "انصراف",
                focusCancel: true
            });

            if (result.isConfirmed) {
                cartCount = 0;
                renderCartCount();
                try {
                    localStorage.removeItem(CART_KEY);
                    status.textContent = "";
                } catch {
                    status.textContent = "سبد خالی شد؛ ذخیره تغییر در این مرورگر ممکن نیست.";
                }
            }
        }
    });
}

window.addEventListener("storage", (event: StorageEvent) => {
    if (event.key === CART_KEY || event.key === null) restoreCart();
});

function renderAbout(about: string): void {
    const section = document.querySelector<HTMLElement>("#about");
    if (!section) throw new Error("Missing about section");
    const heading = createTextElement("h2", "داستان سام مارکت");
    heading.id = "about-title";
    const prose = document.createElement("div");
    prose.className = "about-columns";
    const introduction = document.createElement("div");
    introduction.append(
        createTextElement("p", about),
        createTextElement("p", brandStory.paragraphs[0])
    );
    const explanation = document.createElement("div");
    brandStory.paragraphs.slice(1).forEach(text => {
        explanation.append(createTextElement("p", text));
    });
    prose.append(introduction, explanation);
    section.replaceChildren(heading, prose);
    const steps = document.createElement("div");
    steps.className = "store-sections";
    brandStory.steps.forEach((step, index) => {
        const article = document.createElement("article");
        const icon = createTextElement("span", ["🔴", "🟢", "🔵"][index]);
        icon.setAttribute("aria-hidden", "true");
        const copy = document.createElement("div");
        copy.append(createTextElement("h3", step.title), createTextElement("p", step.text));
        article.append(icon, copy);
        steps.append(article);
    });
    section.append(steps);
}

function renderHero(heroData: HomeBanner): void {
    const banners = document.querySelector<HTMLDivElement>("#home-banners");
    if (!banners) throw new Error("Missing home banners");
    const hero = document.createElement("section");
    hero.className = "hero";
    hero.setAttribute("aria-labelledby", "hero-title");
    const copy = document.createElement("div");
    copy.className = "hero-copy";
    const eyebrow = createTextElement("p", "تازگی، از ارزیابی تا انتخاب", "eyebrow");
    eyebrow.prepend(document.createElement("span"));
    const title = createTextElement("h1", heroData.title);
    title.id = "hero-title";
    const actions = document.createElement("div");
    actions.className = "hero-actions";
    const primary = createLink(heroData.cta.label, heroData.cta.href);
    primary.className = "hero-primary-action";
    const secondary = createLink("داستان سام مارکت", "#about");
    secondary.className = "hero-secondary-action";
    actions.append(primary, secondary);
    const benefits = document.createElement("ul");
    benefits.className = "hero-benefits";
    ["قیمت‌های روشن", "انتخاب روز", "سبد به‌صرفه"].forEach(text => {
        benefits.append(createTextElement("li", text));
    });
    copy.append(eyebrow, title, createTextElement("p", heroData.text), actions, benefits);

    const visual = document.createElement("div");
    visual.className = "hero-visual";
    const frame = document.createElement("div");
    frame.className = "hero-image-frame";
    const image = document.createElement("img");
    image.src = heroImage;
    image.alt = "نارنگی‌های تازه و رسیده در سبد محصول";
    frame.append(image);
    const freshness = createTextElement("p", "", "freshness-card");
    freshness.append(
        createTextElement("strong", "انتخاب امروز سام"),
        createTextElement("span", "تازه، خوش‌رنگ و آماده برای سبد تو")
    );
    const orbit = document.createElement("div");
    orbit.className = "tdd-orbit";
    orbit.setAttribute("aria-hidden", "true");
    [["معیار", "orbit-red"], ["انتخاب", "orbit-green"], ["بهبود", "orbit-blue"]]
        .forEach(([text, className]) => orbit.append(createTextElement("span", text, className)));
    visual.append(frame, freshness, orbit);
    hero.append(copy, visual);
    banners.replaceChildren(hero);
}

function renderPromos(promoData: HomePromo[]): void {
    const promos = document.querySelector<HTMLElement>("#home-promos");
    if (!promos) throw new Error("Missing home promos");
    promos.replaceChildren();
    promoData.forEach((promo, index) => {
        const article = document.createElement("article");
        article.className = index % 2 === 0 ? "promo promo-primary" : "promo promo-secondary";
        const content = document.createElement("div");
        content.append(
            createTextElement("h2", promo.text),
            createLink("مشاهده محصولات", promo.href)
        );
        const emoji = createTextElement("span", promo.emoji);
        emoji.setAttribute("aria-hidden", "true");
        article.append(content, emoji);
        promos.append(article);
    });
}

function renderSideBanner(side: HomeBanner): void {
    const story = document.querySelector<HTMLElement>("#home-side");
    if (!story) throw new Error("Missing home side section");
    story.setAttribute("aria-labelledby", "side-title");
    const photo = document.createElement("div");
    photo.className = "story-image";
    const sideImage = document.createElement("img");
    sideImage.src = dairyImage;
    sideImage.alt = "لبنیات تازه";
    photo.append(sideImage, createTextElement("span", side.title));
    const sideCopy = document.createElement("div");
    const sideTitle = createTextElement("h2", side.title);
    sideTitle.id = "side-title";
    sideCopy.append(
        sideTitle,
        createTextElement("p", side.text),
        createLink(side.cta.label, side.cta.href)
    );
    story.replaceChildren(photo, sideCopy);
}

function renderBanners(home: Home): void {
    renderHero(home.hero);
    renderPromos(home.promos);
    renderSideBanner(home.side);
}

function renderHomeCarousels(configurations: CarouselConfig[], products: Product[], stock: Stock, offers: Map<number, Offer>): void {
    const container = document.querySelector<HTMLDivElement>("#home-carousels");
    if (!container) throw new Error("Missing home carousels");
    container.replaceChildren();
    configurations.forEach(config => {
        const section = document.createElement("section");
        section.className = "product-carousel";
        section.id = config.id;
        const headingId = `${config.id}-title`;
        section.setAttribute("aria-labelledby", headingId);
        const header = document.createElement("header");
        header.className = "section-heading";
        const heading = createTextElement("h2", `${config.emoji} ${config.title}`);
        heading.id = headingId;
        header.append(heading);

        const controls = document.createElement("nav");
        controls.className = "carousel-controls";
        controls.id = `${config.id}-controls`;
        controls.setAttribute("aria-label", `کنترل‌های ${config.title}`);
        controls.append(
            createLink("اولین محصول →", `#${config.id}-first`),
            createLink("آخرین محصول ←", `#${config.id}-last`)
        );
        const status = createTextElement("p", "", "carousel-status");
        status.setAttribute("role", "status");
        const track = document.createElement("section");
        track.id = `${config.id}-track`;
        track.className = "product-track";
        track.tabIndex = 0;
        track.setAttribute("aria-label", `محصولات ${config.title}`);
        section.append(header, controls, status, track);
        container.append(section);

        const selected = config.source === "offers"
            ? products.filter(product => offers.has(product.id))
            : products.filter(product => product.categoryId === config.categoryId);
        renderProducts({ prefix: config.id, track, controls, status }, selected, stock, offers);
    });
}

function enableSearch(products: Product[], stock: Stock, offers: Map<number, Offer>): void {
    const form = document.querySelector<HTMLFormElement>(".search");
    const input = document.querySelector<HTMLInputElement>("#site-search");
    const section = document.querySelector<HTMLElement>("#search-results");
    const controls = document.querySelector<HTMLElement>("#search-results-controls");
    const track = document.querySelector<HTMLDivElement>("#search-results-track");
    const status = document.querySelector<HTMLParagraphElement>("#search-results-status");
    if (!form || !input || !section || !controls || !track || !status) {
        throw new Error("Missing search elements");
    }

    const fuse = new Fuse(products, { keys: ["name"], threshold: 0.4, ignoreLocation: true });

    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) {
            section.hidden = true;
            return;
        }

        const matches: Product[] = fuse.search(query).map(result => result.item);
        renderProducts({ prefix: "search-results", track, controls, status }, matches, stock, offers);
        status.textContent = matches.length
            ? `${priceFormatter.format(matches.length)} محصول پیدا شد.`
            : `نتیجه‌ای برای «${query}» پیدا نشد.`;
        section.hidden = false;
        section.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start"
        });
    });
}

async function initPage(): Promise<void> {
    enableClearCart();
    restoreCart();
    const main = document.querySelector<HTMLElement>("main");
    const status = document.querySelector<HTMLParagraphElement>("#page-status");
    if (!main || !status) throw new Error("Missing page elements");
    main.setAttribute("aria-busy", "true");
    status.textContent = "در حال بارگذاری فروشگاه...";

    try {
        // All six independent requests start together and are awaited once.
        const [products, stock, offers, categories, shop, home] = await Promise.all([
            loadJSON<Product[]>(PRODUCTS_URL, (value): value is Product[] => isArrayOf(value, isProduct)),
            loadJSON<Stock>(STOCK_URL, isStock),
            loadJSON<Offer[]>(OFFERS_URL, (value): value is Offer[] => isArrayOf(value, isOffer)),
            loadJSON<Category[]>(CATEGORIES_URL, (value): value is Category[] => isArrayOf(value, isCategory)),
            loadJSON<Shop>(SHOP_URL, isShop),
            loadJSON<Home>(HOME_URL, isHome)
        ]);

        const offersByProduct = new Map<number, Offer>(
            offers.map(offer => [offer.productId, offer])
        );

        renderBanners(home);
        renderHomeCarousels(home.carousels, products, stock, offersByProduct);
        renderCategories(categories, products);
        renderShop(shop);
        enableSearch(products, stock, offersByProduct);
        const search = document.querySelector<HTMLInputElement>("#site-search");
        if (!search) throw new Error("Missing search input");
        search.placeholder = `جست‌وجو در میان ${priceFormatter.format(products.length)} کالا...`;
        status.textContent = "";
        // Images and fonts can move the section after API rendering finishes.
        await document.fonts.ready;
        if (document.readyState !== "complete") {
            await new Promise(resolve => window.addEventListener("load", resolve, { once: true }));
        }
        requestAnimationFrame(() => scrollToFragment(false));
    } catch (err: unknown) {
        console.error("Storefront loading failed:", err instanceof Error ? err.message : String(err));
        ["home-banners", "home-side", "home-promos", "home-carousels", "category-grid",
            "category-sections", "about"].forEach(id => {
            const element = document.querySelector<HTMLElement>(`#${id}`);
            if (!element) throw new Error(`Missing section: ${id}`);
            element.replaceChildren();
        });
        status.textContent = "بارگذاری فروشگاه انجام نشد. اتصال را بررسی کنید و صفحه را دوباره بارگذاری کنید.";
        status.classList.add("is-error");
    } finally {
        main.setAttribute("aria-busy", "false");
    }
}

initPage();
