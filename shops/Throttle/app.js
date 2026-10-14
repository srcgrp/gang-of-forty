'use strict';

const API = '../../api/';
const nf = new Intl.NumberFormat('fa-IR');
const $ = (sel) => document.querySelector(sel);

/* ---------- ابزارها ---------- */

async function getJSON(name) {
  const res = await fetch(API + name);
  // fetch برای 404 خطا نمی‌دهد؛ باید res.ok را خودمان چک کنیم
  if (!res.ok) throw new Error(name + ' → ' + res.status);
  return res.json();
}

// ساخت المان فقط با createElement و textContent (بدون innerHTML)
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'style') Object.entries(value).forEach(([k, v]) => node.style.setProperty(k, v));
    else node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

// فایل ممکن است آرایه باشد یا شیء با یک کلید آرایه
const asList = (data, key) => (Array.isArray(data) ? data : data?.[key] ?? []);
const price = (n) => nf.format(n) + ' تومان';

/* ---------- حالت بارگذاری و خطا ---------- */

function showLoading(container) {
  container.replaceChildren(
    el('div', { class: 'state', text: 'در حال بارگذاری...' }),
    el('div', { class: 'track' }, ...Array.from({ length: 5 }, () => el('div', { class: 'skeleton' })))
  );
}

function showError(container) {
  container.replaceChildren(
    el('div', {
      class: 'state error',
      role: 'alert',
      text: 'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید.',
    })
  );
}

/* ---------- کارت و کاروسل ---------- */

function buildCard(product, ctx) {
  const offer = ctx.offerById.get(product.id);
  const qty = ctx.stock?.items?.[product.id];
  const inStock = qty === undefined ? true : qty > 0;
  const color = ctx.categoryById.get(product.categoryId)?.color ?? '#cccccc';
  const finalPrice = offer ? Math.round((product.price * (100 - offer.percent)) / 100) : product.price;

  const pic = el('div', { class: 'pic', style: { background: color + '33' }, text: product.emoji ?? '' });
  if (offer && inStock) {
    pic.append(el('span', { class: 'tag', text: nf.format(offer.percent) + '٪' }));
  }
  if (!inStock) {
    pic.append(el('span', { class: 'tag out-tag', text: 'ناموجود' }));
  }

  const add = el('button', { class: 'add', type: 'button', 'aria-label': 'افزودن ' + product.name, text: '+' });
  if (!inStock) add.disabled = true;

  return el('article', { class: 'card' + (inStock ? '' : ' out') },
    pic,
    el('h3', { text: product.name }),
    el('span', { class: 'unit', text: product.unit ?? '' }),
    el('span', { class: 'old', text: offer ? price(product.price) : '' }),
    el('div', { class: 'row' }, el('span', { class: 'price', text: price(finalPrice) }), add)
  );
}

function renderCarousel(container, products, ctx) {
  if (!products.length) {
    container.replaceChildren(el('div', { class: 'state', text: 'محصولی برای نمایش نیست.' }));
    return;
  }

  const track = el('div', { class: 'track' }, ...products.map((p) => buildCard(p, ctx)));

  // در RTL «بعدی» یعنی اسکرول به سمت چپ (مقدار منفی)
  const dir = () => (getComputedStyle(track).direction === 'rtl' ? -1 : 1);
  const step = () => track.clientWidth * 0.8;
  const prev = el('button', { class: 'arrow', type: 'button', 'aria-label': 'قبلی', text: '›' });
  const next = el('button', { class: 'arrow', type: 'button', 'aria-label': 'بعدی', text: '‹' });
  prev.addEventListener('click', () => track.scrollBy({ left: -dir() * step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: dir() * step(), behavior: 'smooth' }));

  container.replaceChildren(el('div', { class: 'carousel-head' }, prev, next), track);
}

/* ---------- شروع ---------- */

async function init() {
  const specialBox = $('#special-carousel');
  const dairyBox = $('#dairy-carousel');
  showLoading(specialBox);
  showLoading(dairyBox);

  try {
    // همه فایل‌ها هم‌زمان خوانده می‌شوند، نه پشت سر هم
    const [pData, sData, oData, cData] = await Promise.all([
      getJSON('products.json'),
      getJSON('stock.json'),
      getJSON('offers.json'),
      getJSON('categories.json'),
    ]);

    const products = asList(pData, 'products');
    const offers = asList(oData, 'offers');
    const categories = asList(cData, 'categories');

    const ctx = {
      stock: sData,
      offerById: new Map(offers.map((o) => [o.productId, o])),
      categoryById: new Map(categories.map((c) => [c.id, c])),
    };

    // سطح ۲: فقط محصولاتی که تخفیف دارند
    const discounted = products.filter((p) => ctx.offerById.has(p.id));
    renderCarousel(specialBox, discounted, ctx);

    // سطح ۱: محصولات یک دسته با filter روی categoryId
    const dairy = categories.find((c) => c.slug === 'dairy');
    const dairyProducts = dairy ? products.filter((p) => p.categoryId === dairy.id) : [];
    renderCarousel(dairyBox, dairyProducts, ctx);
  } catch (err) {
    console.warn(err.message);
    showError(specialBox);
    showError(dairyBox);
  }
}

init();
