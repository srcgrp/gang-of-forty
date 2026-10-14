'use strict';


const API_URL = '../../api/products.json';
const DAIRY_CATEGORY_ID = 2; 
const SKELETON_COUNT = 6;
const TINTS = ['t-blue', 't-yellow', 't-green', 't-pink', 't-purple', 't-orange'];

const list = document.querySelector('#dairy-list');
const carousel = document.querySelector('#dairy-carousel');
const statusBox = document.querySelector('#dairy-status');
const firstBtn = document.querySelector('#dairy-first');
const lastBtn = document.querySelector('#dairy-last');

const priceFormat = new Intl.NumberFormat('fa-IR');


function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text; 
    return node;
}

function setStatus(message) {
    statusBox.replaceChildren();
    if (message) statusBox.append(message);
}


function createCard(product, index) {
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
    add.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);
    const plus = el('span', null, '+');
    plus.setAttribute('aria-hidden', 'true');
    add.append(plus);
    add.addEventListener('click', () => {
        plus.textContent = '✓';
        setTimeout(() => { plus.textContent = '+'; }, 800);
    });

    const buy = el('div', 'buy');
    buy.append(price, add);

    article.append(media, name, amount, buy);
    li.append(article);
    return li;
}


function createSkeleton() {
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

function showLoading() {
    carousel.setAttribute('aria-busy', 'true');
    setStatus('در حال بارگذاری محصولات…');
    list.replaceChildren(...Array.from({ length: SKELETON_COUNT }, createSkeleton));
}

/* ---------- خطا ---------- */
function showError(message) {
    carousel.setAttribute('aria-busy', 'false');
    list.replaceChildren(); // به‌جای کاروسل خالی، پیام قابل‌فهم
    const retry = el('button', 'btn', 'تلاش دوباره');
    retry.type = 'button';
    retry.addEventListener('click', loadDairy);
    statusBox.replaceChildren(message, retry);
}


async function fetchProducts() {
    const res = await fetch(API_URL);

    if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.kind = 'http';
        throw err;
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
        const err = new Error('products.json is not an array');
        err.kind = 'shape';
        throw err;
    }
    return data;
}

function errorMessage(err) {
    if (err instanceof TypeError) return 'ارتباط با سرور برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.';
    if (err.kind === 'http') return 'فهرست محصولات پیدا نشد. کمی بعد دوباره تلاش کنید.';
    return 'اطلاعات محصولات درست دریافت نشد. کمی بعد دوباره تلاش کنید.';
}


function linkEdges(cards) {
    firstBtn.href = `#${cards[0].id}`;
    lastBtn.href = `#${cards[cards.length - 1].id}`;
}


async function loadDairy() {
    showLoading();
    try {
        const products = await fetchProducts();
        const dairy = products.filter((p) => p.categoryId === DAIRY_CATEGORY_ID);

        if (dairy.length === 0) {
            showError('فعلاً محصولی در این دسته نیست.');
            return;
        }

        const cards = dairy.map(createCard);
        list.replaceChildren(...cards);
        linkEdges(cards);
        setStatus('');
        carousel.setAttribute('aria-busy', 'false');
    } catch (err) {
        console.warn('بارگذاری لبنیات ناموفق بود:', err);
        showError(errorMessage(err));
    }
}

loadDairy();
