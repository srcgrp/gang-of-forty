import confetti from "canvas-confetti";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
//import type { Product, Category, Offer, StockData, MenuEntry, Shop } from "./types.ts";
import { VIEW_ALL_LABELS } from "./types.ts";
import type { ViewAllLabel } from "./types.ts";
  
import type { Category, LoadedState, LoadState, MenuEntry, Offer, Product } from "./types.ts";
import { loadShopData } from "./api/client.ts";

const SNACKS_SLUG: string = "snacks";

function getEl<T extends HTMLElement>(selector: string, root: ParentNode = document): T {
    const element: T | null = root.querySelector<T>(selector);
    if (!element) {
        throw new Error("index.html is missing an element: " + selector);
    }
    return element;
}

function getNth<T extends HTMLElement>(selector: string, index: number): T {
    const element: T | undefined = document.querySelectorAll<T>(selector)[index];
    if (!element) {
        throw new Error("index.html is missing element number " + index + " of: " + selector);
    }
    return element;
}

function getClosest<T extends HTMLElement>(start: Element, selector: string): T {
    const element: T | null = start.closest<T>(selector);
    if (!element) {
        throw new Error("index.html is missing a parent element: " + selector);
    }
    return element;
}

const offerContainer: HTMLDivElement = getNth<HTMLDivElement>(".special-offer-items", 0);
const snacksContainer: HTMLDivElement = getNth<HTMLDivElement>(".special-offer-items", 1);
const snacksArticle: HTMLElement = getClosest<HTMLElement>(snacksContainer, "article");

const snacksHeading: HTMLElement = getEl<HTMLElement>(".items-header", snacksArticle);
const noticeBar: HTMLElement = getEl<HTMLElement>("#notice");
const addressBar: HTMLElement = getEl<HTMLElement>(".address");
const about: HTMLElement = getEl<HTMLElement>(".footer-top-info-text");
const slogan: HTMLElement = getEl<HTMLElement>(".footer-top-info-header");
const phoneLink: HTMLElement = getEl<HTMLElement>("#phonenumber");
const menuList: HTMLUListElement = getEl<HTMLUListElement>("#menu-categories");
const footerList: HTMLUListElement = getEl<HTMLUListElement>("#footer-categories");
const categoriesGrid: HTMLDivElement = getEl<HTMLDivElement>("#categories-grid");
const nav: HTMLElement = getEl<HTMLElement>(".nav");

const notyf: Notyf = new Notyf({
    duration: 2000,
    position: { x: "left", y: "bottom" },
});

function showMessage(container: HTMLElement, text: string): void {
    const p: HTMLParagraphElement = document.createElement("p");
    p.textContent = text;
    container.replaceChildren(p);
}

function formatNumber(value: number): string {
    return new Intl.NumberFormat("fa-IR").format(value);
}

function formatPrice(value: number): string {
    return formatNumber(value) + " تومان";
}
function finalPrice(product: Pick<Product, "price">, offer: Pick<Offer, "percent">): number {
    return Math.round((product.price * (100 - offer.percent)) / 100);
}
function createProductCard(
    product: Product,
    offer: Offer | undefined,
    stockCount: number | undefined
): HTMLDivElement {
    const isUnavailable: boolean = stockCount === 0;

    const card: HTMLDivElement = document.createElement("div");
    card.className = "special-offer-item";
    if (isUnavailable) {
        card.classList.add("unavailable");
    }

    const imageBox: HTMLDivElement = document.createElement("div");
    imageBox.className = "special-offer-image";

    const emoji: HTMLSpanElement = document.createElement("span");
    emoji.className = "special-offer-emoji";
    emoji.textContent = product.emoji;
    imageBox.append(emoji);

    if (isUnavailable) {
        const badge: HTMLSpanElement = document.createElement("span");
        badge.className = "unavailable-badge";
        badge.textContent = "ناموجود";
        imageBox.append(badge);
    } else if (offer) {
        const badge: HTMLSpanElement = document.createElement("span");
        badge.className = "discount-badge";
        badge.textContent = formatNumber(offer.percent) + "٪";
        imageBox.append(badge);
    }

    const name: HTMLHeadingElement = document.createElement("h3");
    name.className = "special-offer-name";
    name.textContent = product.name;

    const unit: HTMLParagraphElement = document.createElement("p");
    unit.className = "special-offer-unit";
    unit.textContent = product.unit;

    const details: HTMLDivElement = document.createElement("div");
    details.className = "special-offer-item-details";

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.className = "add-button";
    button.textContent = "+";
    button.dataset.name = product.name;

    if (isUnavailable) {
        button.disabled = true;
        button.setAttribute("aria-label", product.name + " ناموجود است");
    } else {
        button.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید");
    }

    if (offer) {
        const prices: HTMLDivElement = document.createElement("div");
        prices.className = "special-offer-item-prices";

        const oldPrice: HTMLModElement = document.createElement("del");
        oldPrice.className = "price-old";
        oldPrice.textContent = formatNumber(product.price);

        const newPrice: HTMLParagraphElement = document.createElement("p");
        newPrice.className = "special-offer-price";
        newPrice.textContent = formatPrice(finalPrice(product, offer));
        prices.append(oldPrice, newPrice);
        details.append(prices, button);
    } else {
        const price: HTMLParagraphElement = document.createElement("p");
        price.className = "special-offer-price";
        price.textContent = formatPrice(product.price);
        details.append(price, button);
    }

    card.append(imageBox, name, unit, details);
    return card;
}

function createCategoryTile(category: Category): HTMLDivElement {
    const tile: HTMLDivElement = document.createElement("div");
    tile.className = "items";

    const link: HTMLAnchorElement = document.createElement("a");
    link.className = "items-link";
    link.href = "#" + category.slug;

    const icon: HTMLSpanElement = document.createElement("span");
    icon.className = "items-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = category.emoji;
    icon.style.backgroundColor = category.color;

    const title: HTMLParagraphElement = document.createElement("p");
    title.className = "items-title";
    title.textContent = category.name;

    link.append(icon, title);
    tile.append(link);
    return tile;
}

function createCategoryListItem(
    category: Category,
    withEmoji: boolean,
    className?: string
): HTMLLIElement {
    const item: HTMLLIElement = document.createElement("li");
    if (className) {
        item.className = className;
    }

    const link: HTMLAnchorElement = document.createElement("a");
    link.href = "#" + category.slug;

    if (withEmoji) {
        const emoji: HTMLSpanElement = document.createElement("span");
        emoji.className = "dropdown-emoji";
        emoji.textContent = category.emoji;
        link.append(emoji, " " + category.name);
    } else {
        link.textContent = category.name;
    }

    item.append(link);
    return item;
}

function renderCategories(categories: Category[]): void {
    categoriesGrid.replaceChildren(...categories.map(createCategoryTile));
    menuList.replaceChildren(
        ...categories.map((category: Category): HTMLLIElement => createCategoryListItem(category, true))
    );
    footerList.replaceChildren(
        ...categories.map(
            (category: Category): HTMLLIElement =>
                createCategoryListItem(category, false, "footer-top-categories-list-item")
        )
    );
}

function renderMenu(menu: MenuEntry[]): void {
    const items: HTMLLIElement[] = menu.map((entry: MenuEntry): HTMLLIElement => {
        const li: HTMLLIElement = document.createElement("li");
        const a: HTMLAnchorElement = document.createElement("a");
        a.href = entry.href;
        a.textContent = entry.label;
        li.append(a);
        return li;
    });
    const allCategory: HTMLElement = getEl<HTMLElement>("#allcategory");
    nav.replaceChildren(allCategory, ...items);
}

function scrollToHash(): void {
    if (!location.hash) return;
    const target: HTMLElement | null = document.getElementById(location.hash.slice(1));
    if (target) {
        target.scrollIntoView();
    }
}
function assertNever(x: never): never {
    throw new Error("حالتی رندر نشده: " + JSON.stringify(x));
}

function renderSuccess(state: LoadedState): void {
    const { products, offers, stock, categories, shop } = state;

    const offerByProductId: Map<number, Offer> = new Map<number, Offer>(
        offers.map((offer: Offer): [number, Offer] => [offer.productId, offer])
    );
    const makeCard = (product: Product): HTMLDivElement =>
        createProductCard(product, offerByProductId.get(product.id), stock.items[product.id]);

    const offerProducts: Product[] = products.filter((product: Product): boolean =>
        offerByProductId.has(product.id)
    );
    offerContainer.replaceChildren(...offerProducts.map(makeCard));

    const snacks: Category | undefined = categories.find(
        (category: Category): boolean => category.slug === SNACKS_SLUG
    );
    if (snacks) {
        const snackProducts: Product[] = products.filter(
            (product: Product): boolean => product.categoryId === snacks.id
        );
        snacksContainer.replaceChildren(...snackProducts.map(makeCard));
        snacksHeading.textContent = "خشکبار و تنقلات";
        snacksArticle.id = snacks.slug;
    } else {
        showMessage(snacksContainer, "دسته‌ی تنقلات پیدا نشد");
    }

    renderCategories(categories);

    noticeBar.textContent = shop.notice;
    phoneLink.textContent = shop.phone;
    addressBar.textContent = shop.address;
    renderMenu(shop.menu);
    about.textContent = shop.about;
    slogan.textContent = shop.slogan;

    scrollToHash();
}

function renderState(state: LoadState): void {
    switch (state.status) {
        case "loading":
            showMessage(offerContainer, "در حال بارگذاری...");
            showMessage(snacksContainer, "در حال بارگذاری...");
            showMessage(categoriesGrid, "در حال بارگذاری...");
            break;
        case "empty":
            showMessage(offerContainer, "فعلاً محصولی نداریم.");
            showMessage(snacksContainer, "فعلاً محصولی نداریم.");
            showMessage(categoriesGrid, "فعلاً محصولی نداریم.");
            break;
        case "error":
            console.error("خطا در بارگذاری:", state.message);
            showMessage(offerContainer, "متأسفیم، محصولات بارگذاری نشدند. لطفاً دوباره تلاش کنید.");
            showMessage(snacksContainer, "متأسفیم، محصولات بارگذاری نشدند. لطفاً دوباره تلاش کنید.");
            showMessage(categoriesGrid, "متأسفیم، دسته‌بندی‌ها بارگذاری نشدند.");
            break;
        case "success":
            renderSuccess(state);
            break;
        default:
            assertNever(state);
    }
}

async function start(): Promise<void> {
    renderState({ status: "loading" });
    renderState(await loadShopData());
}
function setupViewAll(): void {
    document.querySelectorAll<HTMLAnchorElement>(".items-header-link").forEach((link: HTMLAnchorElement): void => {
        const article: HTMLElement | null = link.closest("article");
        if (!article) return;

        const items: HTMLDivElement = getEl<HTMLDivElement>(".special-offer-items", article);
        const label: HTMLSpanElement = getEl<HTMLSpanElement>("span", link);
        const isRtl: boolean = getComputedStyle(items).direction === "rtl";
        const [LABEL_MORE, LABEL_BACK] = VIEW_ALL_LABELS;

        function atEnd(): boolean {
            return Math.abs(items.scrollLeft) + items.clientWidth >= items.scrollWidth - 2;
        }
        function updateLabel(): void {
            const next: ViewAllLabel = atEnd() ? LABEL_BACK : LABEL_MORE;
            label.textContent = next;
        }
        link.addEventListener("click", (event: MouseEvent): void => {
            event.preventDefault();

            if (atEnd()) {
                items.scrollTo({ left: 0, behavior: "smooth" });
                return;
            }

            const gap: number = parseFloat(getComputedStyle(items).columnGap) || 0;
            const page: number = items.clientWidth + gap;
            items.scrollBy({ left: isRtl ? -page : page, behavior: "smooth" });
        });

        items.addEventListener("scroll", updateLabel, { passive: true });
    });
}

document.addEventListener("click", (e: MouseEvent): void => {
    if (!(e.target instanceof Element)) return;

    const button: HTMLButtonElement | null = e.target.closest<HTMLButtonElement>(".add-button");
    if (!button || button.disabled) return;

    const productName: string = button.dataset.name ?? "کالا";
    notyf.success(productName + " به سبد اضافه شد");
    confetti({ particleCount: 60, spread: 70 });
});

setupViewAll();
void start();
