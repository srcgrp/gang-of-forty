import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import confetti from 'canvas-confetti';
import { FetchError } from './api/http.ts';
import { fetchProducts } from './api/products.ts';
import type { LoadState, Product, ProductPreview, ReadonlyProduct } from './types.ts';

const DAIRY_CATEGORY_ID = 2;
const SKELETON_COUNT = 6;
const TINTS = ['t-blue', 't-yellow', 't-green', 't-pink', 't-purple', 't-orange'];

function getDom() {
    const list = document.querySelector<HTMLUListElement>('#dairy-list');
    const carousel = document.querySelector<HTMLElement>('#dairy-carousel');
    const statusBox = document.querySelector<HTMLElement>('#dairy-status');
    const firstBtn = document.querySelector<HTMLAnchorElement>('#dairy-first');
    const lastBtn = document.querySelector<HTMLAnchorElement>('#dairy-last');

    if (!list || !carousel || !statusBox || !firstBtn || !lastBtn) {
        throw new Error('index.html is missing an element');
    }
    return { list, carousel, statusBox, firstBtn, lastBtn };
}

const { list, carousel, statusBox, firstBtn, lastBtn } = getDom();

const priceFormat = new Intl.NumberFormat('fa-IR');

const notyf = new Notyf({
    duration: 2200,
    position: { x: 'left', y: 'bottom' },
    dismissible: true,
});

function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string | null,
    text?: string
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function setStatus(message: string): void {
    statusBox.replaceChildren();
    if (message) statusBox.append(message);
}

function describeProduct({ name, price }: ProductPreview): string {
    return `${name}، ${priceFormat.format(price)} تومان`;
}

function celebrate(button: HTMLButtonElement, productName: string): void {
    notyf.success(`${productName} به سبد اضافه شد`);

    const rect = button.getBoundingClientRect();
    confetti({
        particleCount: 60,
        spread: 70,
        disableForReducedMotion: true,
        origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
        },
    });
}

function createCard(product: ReadonlyProduct, index: number): HTMLLIElement {
    const li = el('li', 'card');
    li.id = `d-${product.id}`;

    const article = el('article', TINTS[index % TINTS.length]);
    const nameId = `d-${product.id}-n`;
    article.setAttribute('aria-labelledby', nameId);

    const icon = el('span', 'ico', product.emoji);
    icon.setAttribute('aria-hidden', 'true');
    const media = el('div', 'media');
    media.append(icon);

    const name = el('h3', 'name', product.name);
    name.id = nameId;
    const amount = el('p', 'amount', product.unit);

    const now = el('strong', 'now', `${priceFormat.format(product.price)} تومان`);
    const price = el('p', 'price');
    price.append(now);

    const add = el('button', 'add');
    add.type = 'button';
    add.setAttribute('aria-label', `افزودن ${describeProduct(product)} به سبد خرید`);
    const plus = el('span', null, '+');
    plus.setAttribute('aria-hidden', 'true');
    add.append(plus);
    add.addEventListener('click', (e: MouseEvent) => {
        if (!(e.currentTarget instanceof HTMLButtonElement)) return;
        celebrate(e.currentTarget, product.name);
        plus.textContent = '✓';
        setTimeout(() => { plus.textContent = '+'; }, 800);
    });

    const buy = el('div', 'buy');
    buy.append(price, add);

    article.append(media, name, amount, buy);
    li.append(article);
    return li;
}

function createSkeleton(): HTMLLIElement {
    const li = el('li', 'card skeleton');
    li.setAttribute('aria-hidden', 'true');
    const article = el('article');
    const buy = el('div', 'buy');
    buy.append(el('div', 'sk sk-line w-50'), el('div', 'sk sk-btn'));
    article.append(
        el('div', 'media sk'),
        el('div', 'sk sk-line w-80'),
        el('div', 'sk sk-line w-50'),
        buy
    );
    li.append(article);
    return li;
}

function linkEdges(cards: HTMLLIElement[]): void {
    const first = cards[0];
    const last = cards[cards.length - 1];
    if (!first || !last) return;
    firstBtn.href = `#${first.id}`;
    lastBtn.href = `#${last.id}`;
}


function showLoading(): void {
    carousel.setAttribute('aria-busy', 'true');
    setStatus('در حال بارگذاری محصولات…');
    list.replaceChildren(...Array.from({ length: SKELETON_COUNT }, createSkeleton));
}

function showProducts(products: Product[]): void {
    const cards = products.map(createCard);
    list.replaceChildren(...cards);
    linkEdges(cards);
    setStatus('');
    carousel.setAttribute('aria-busy', 'false');
}

function showEmpty(): void {
    carousel.setAttribute('aria-busy', 'false');
    list.replaceChildren();
    setStatus('فعلاً محصولی در این دسته نیست.');
}

function showError(message: string): void {
    carousel.setAttribute('aria-busy', 'false');
    list.replaceChildren();
    const retry = el('button', 'btn', 'تلاش دوباره');
    retry.type = 'button';
    retry.addEventListener('click', () => { void loadDairy(); });
    statusBox.replaceChildren(message, retry);
}

function assertNever(value: never): never {
    throw new Error(`Unhandled state: ${JSON.stringify(value)}`);
}

function render(state: LoadState): void {
    switch (state.status) {
        case 'loading':
            showLoading();
            break;
        case 'success':
            showProducts(state.products);
            break;
        case 'empty':
            showEmpty();
            break;
        case 'error':
            showError(state.message);
            break;
        default:
            assertNever(state);
    }
}


function errorMessage(err: unknown): string {
    if (err instanceof TypeError) {
        return 'ارتباط با سرور برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.';
    }
    if (err instanceof FetchError && err.kind === 'http') {
        return 'فهرست محصولات پیدا نشد. کمی بعد دوباره تلاش کنید.';
    }
    return 'اطلاعات محصولات درست دریافت نشد. کمی بعد دوباره تلاش کنید.';
}

async function loadDairy(): Promise<void> {
    render({ status: 'loading' });
    try {
        const products = await fetchProducts();
        const dairy = products.filter((p: Product) => p.categoryId === DAIRY_CATEGORY_ID);

        if (dairy.length === 0) {
            render({ status: 'empty' });
            return;
        }
        render({ status: 'success', products: dairy });
    } catch (err: unknown) {
        console.warn('بارگذاری لبنیات ناموفق بود:', err);
        render({ status: 'error', message: errorMessage(err) });
    }
}

void loadDairy();