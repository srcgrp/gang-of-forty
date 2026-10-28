import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import confetti from 'canvas-confetti';
import type { Product, ProductPreview, ReadonlyProduct } from './types.ts';

const API_URL = '../../api/products.json';
const DAIRY_CATEGORY_ID = 2;
const SKELETON_COUNT = 6;
const TINTS = ['t-blue', 't-yellow', 't-green', 't-pink', 't-purple', 't-orange'];

class FetchError extends Error {
    kind: 'http' | 'shape';

    constructor(kind: 'http' | 'shape', message: string) {
        super(message);
        this.kind = kind;
    }
}

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

function isProduct(value: unknown): value is Product {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value && typeof value.id === 'number' &&
        'categoryId' in value && typeof value.categoryId === 'number' &&
        'name' in value && typeof value.name === 'string' &&
        'emoji' in value && typeof value.emoji === 'string' &&
        'unit' in value && typeof value.unit === 'string' &&
        'price' in value && typeof value.price === 'number'
    );
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

function showLoading(): void {
    carousel.setAttribute('aria-busy', 'true');
    setStatus('در حال بارگذاری محصولات…');
    list.replaceChildren(...Array.from({ length: SKELETON_COUNT }, createSkeleton));
}

function showError(message: string): void {
    carousel.setAttribute('aria-busy', 'false');
    list.replaceChildren();
    const retry = el('button', 'btn', 'تلاش دوباره');
    retry.type = 'button';
    retry.addEventListener('click', loadDairy);
    statusBox.replaceChildren(message, retry);
}

async function fetchProducts(): Promise<Product[]> {
    const res: Response = await fetch(API_URL);

    if (!res.ok) {
        throw new FetchError('http', `HTTP ${res.status}`);
    }

    const data: unknown = await res.json();
    if (!Array.isArray(data) || !data.every(isProduct)) {
        throw new FetchError('shape', 'products.json is not a list of products');
    }
    return data;
}

function errorMessage(err: unknown): string {
    if (err instanceof TypeError) return 'ارتباط با سرور برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.';
    if (err instanceof FetchError && err.kind === 'http') return 'فهرست محصولات پیدا نشد. کمی بعد دوباره تلاش کنید.';
    return 'اطلاعات محصولات درست دریافت نشد. کمی بعد دوباره تلاش کنید.';
}

function linkEdges(cards: HTMLLIElement[]): void {
    const first = cards[0];
    const last = cards[cards.length - 1];
    if (!first || !last) return;
    firstBtn.href = `#${first.id}`;
    lastBtn.href = `#${last.id}`;
}

async function loadDairy(): Promise<void> {
    showLoading();
    try {
        const products = await fetchProducts();
        const dairy = products.filter((p: Product) => p.categoryId === DAIRY_CATEGORY_ID);

        if (dairy.length === 0) {
            showError('فعلاً محصولی در این دسته نیست.');
            return;
        }

        const cards = dairy.map(createCard);
        list.replaceChildren(...cards);
        linkEdges(cards);
        setStatus('');
        carousel.setAttribute('aria-busy', 'false');
    } catch (err: unknown) {
        console.warn('بارگذاری لبنیات ناموفق بود:', err);
        showError(errorMessage(err));
    }
}

loadDairy();