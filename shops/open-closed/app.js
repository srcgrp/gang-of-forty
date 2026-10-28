'use strict';

// ---------- تنظیمات ----------
const API_URL = '../../api/products.json';
const DAIRY_CATEGORY_ID = 2; // لبنیات (categories.json)
const SKELETON_COUNT = 5;

const track = document.querySelector('#dairy-track');
const statusBox = document.querySelector('#dairy-status');
const prevBtn = document.querySelector('#dairy-prev');
const nextBtn = document.querySelector('#dairy-next');

// ---------- ابزارها ----------
const priceFormatter = new Intl.NumberFormat('fa-IR');

function formatPrice(price) {
    return `${priceFormatter.format(price)} تومان`;
}

function showStatus(message) {
    statusBox.textContent = message;
    statusBox.hidden = false;
}

function hideStatus() {
    statusBox.textContent = '';
    statusBox.hidden = true;
}

// ---------- ساخت کارت‌ها (فقط با createElement و textContent) ----------
function createCard(product) {
    const card = document.createElement('article');
    card.className = 'card';

    const img = document.createElement('div');
    img.className = 'card-img';
    img.setAttribute('aria-hidden', 'true');
    img.textContent = product.emoji;

    const name = document.createElement('h3');
    name.className = 'card-name';
    name.textContent = product.name;

    const unit = document.createElement('span');
    unit.className = 'card-unit';
    unit.textContent = product.unit;

    const price = document.createElement('span');
    price.className = 'card-price';
    price.textContent = formatPrice(product.price);

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-btn';
    addBtn.textContent = '+';
    addBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد`);
    addBtn.addEventListener('click', () => {
        addBtn.textContent = '✓';
        setTimeout(() => {
            addBtn.textContent = '+';
        }, 800);
    });

    const foot = document.createElement('div');
    foot.className = 'card-foot';
    foot.append(price, addBtn);

    card.append(img, name, unit, foot);
    return card;
}

function createSkeletonCard() {
    const card = document.createElement('div');
    card.className = 'card skeleton';
    card.setAttribute('aria-hidden', 'true');

    const parts = ['sk sk-img', 'sk sk-line', 'sk sk-line short', 'sk sk-line'];
    for (const cls of parts) {
        const el = document.createElement('div');
        el.className = cls;
        card.append(el);
    }
    return card;
}

function renderSkeleton() {
    const cards = [];
    for (let i = 0; i < SKELETON_COUNT; i++) {
        cards.push(createSkeletonCard());
    }
    track.replaceChildren(...cards);
}

function renderProducts(products) {
    track.replaceChildren(...products.map(createCard));
}

// ---------- دریافت داده ----------
async function fetchProducts() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    return res.json(); // اگر JSON خراب باشد اینجا خطا می‌دهد
}

async function loadDairy() {
    hideStatus();
    track.setAttribute('aria-busy', 'true');
    renderSkeleton();

    try {
        const products = await fetchProducts();
        const dairy = products.filter((p) => p.categoryId === DAIRY_CATEGORY_ID);

        if (dairy.length === 0) {
            track.replaceChildren();
            showStatus('فعلاً محصولی در این دسته نیست.');
            return;
        }
        renderProducts(dairy);
    } catch (err) {
        track.replaceChildren(); // به‌جای کاروسل خالی، پیام خطا
        showStatus('بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.');
        console.warn('Failed to load products:', err);
    } finally {
        track.removeAttribute('aria-busy');
    }
}

// ---------- پیمایش کاروسل (سازگار با RTL) ----------
function scrollTrack(direction) {
    // direction: +1 = بعدی (به سمت چپ در RTL)، -1 = قبلی
    const isRtl = getComputedStyle(track).direction === 'rtl';
    const step = Math.max(track.clientWidth * 0.8, 180);
    const sign = isRtl ? -1 : 1;
    track.scrollBy({ left: direction * sign * step });
}

prevBtn.addEventListener('click', () => scrollTrack(-1));
nextBtn.addEventListener('click', () => scrollTrack(1));

track.addEventListener('keydown', (e) => {
    // در RTL فلش چپ = بعدی
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollTrack(getComputedStyle(track).direction === 'rtl' ? 1 : -1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollTrack(getComputedStyle(track).direction === 'rtl' ? -1 : 1);
    }
});

loadDairy();
