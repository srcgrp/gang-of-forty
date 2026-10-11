/* Amirhossein (Armin) Panahi */
/* Week 2 - Strategic Supermarket - Live Supermarket (fetch + DOM) */


// ===== Apply Strict Mode =====
"use strict";


// ===== Config =====
const API_BASE = '../../api/';
const API_FILES = ['products', 'categories', 'stock', 'offers', 'shop', 'home'];
const SLOW_AFTER_MS = 3000;
const HARD_TIMEOUT_MS = 30000;
const CART_KEY = 'armin-market:cart';
const OFFERS_VIEW = 'offers'; // ?cat=offers shows every discounted product
const SHOW_REMAINING_CATEGORIES = true; // categories that home.json does not list still get their own shelf

const BRAND = {
  name: 'سوپرمارکت آرمین',
  address: 'تهران، میدان ونک، پلاک 10',
  phones: [
    { label: 'تلفن ثابت', text: '۰۲۱-۱۲۳۴۵۶۷۸', tel: '+982112345678', icon: 'phone' },
    { label: 'پشتیبانی موبایل', text: '۰۹۱۲-۱۲۳-۴۵۶۷', tel: '+989121234567', icon: 'smartphone' },
  ],
  email: 'info@arminmarket.ir',
  social: [
    { label: 'اینستاگرام', href: 'https://instagram.com/arminmarket', icon: 'instagram' },
    { label: 'تلگرام', href: 'https://t.me/arminmarket', icon: 'telegram' },
    { label: 'واتس‌اپ', href: 'https://wa.me/989121234567', icon: 'whatsapp' },
  ],
  copyright: '© ۱۴۰۵ تمامی حقوق برای سوپرمارکت آرمین محفوظ است.',
};


// ===== Artwork (no emoji anywhere: every emoji from the API is replaced by an image) =====
const IMG = './assets/images/';

const HERO_ART = [
  ['broccoli', 'کلم بروکلی', 560, 559],
  ['carrot', 'هویج', 357, 560],
  ['pepper', 'فلفل دلمه‌ای', 502, 560],
  ['tomato', 'گوجه‌فرنگی', 541, 560],
  ['orange', 'پرتقال تامسون', 560, 466],
  ['strawberry', 'توت‌فرنگی', 518, 560],
];

// Product name -> image. The first match wins; `null` means "no image on purpose".
// (names are normalised first: the half-space becomes a normal space)
const PRODUCT_ART = [
  [null, /سیب ?زمینی|کنسرو|تن ماهی/],
  ['strawberry', /چیپس ?توت/],
  ['plain-chips', /چیپس|لواشک/],
  ['popcorn', /پاپ ?کورن/],
  ['butter-biscuit', /بیسکویت|کلوچه/],
  ['croissant', /کروسان/],
  ['chocolate-donut', /دونات/],
  ['vanilla-cupcake', /کاپ ?کیک|کیک/],
  ['dark-chocolate', /شکلات/],
  ['fruit-candy', /آب ?نبات|پاستیل/],
  ['salted-peanuts', /بادام ?زمینی|آجیل/],
  ['orange-juice', /آب ?میوه|آب ?پرتقال/],
  ['mineral-water', /آب ?معدنی/],
  ['cola', /نوشابه|کولا/],
  ['sour-cherry-syrup', /شربت|آلبالو/],
  ['black-tea', /چای/],
  ['instant-coffee', /قهوه|نسکافه/],
  ['vanilla-ice-cream', /بستنی/],
  ['yogurt-drink', /دوغ/],
  ['low-fat-milk', /(^| )شیر( |$)/],
  ['butter', /(^| )کره( |$)/],
  ['cheese', /پنیر/],
  ['yogurt', /ماست/],
  ['eggs', /تخم/],
  ['chicken-thigh', /ران ?مرغ/],
  ['chicken-breast', /سینه|فیله|مرغ/],
  ['veal-striploin', /راسته|گوساله|گوسفند/],
  ['ground-meat', /چرخ ?کرده/],
  ['trout', /ماهی|قزل/],
  ['sausage', /سوسیس|کالباس/],
  ['lavash-bread', /لواش/],
  ['gandomin-bread', /گندمین|سنگک|بربری|تافتون/],
  ['whole-grain-toast', /نان ?تست|تست|سبوس|باگت/],
  ['rice', /برنج/],
  ['sunflower-oil', /روغن/],
  ['saffron', /زعفران/],
  ['honey', /عسل/],
  ['banana', /موز/],
  ['red-apple', /سیب/],
  ['carrot', /هویج/],
  ['orange', /پرتقال|پرتغال|نارنگی/],
  ['tomato', /گوجه/],
  ['cucumber', /خیار/],
];

// Category -> icon image (matched on the slug first, then on the Persian name)
const CATEGORY_ART = [
  ['produce', /fruit|produce|vegetable/i, /میوه|سبزی/],
  ['dairy', /dairy/i, /لبنیات/],
  ['bakery', /bakery|bread/i, /نان|شیرینی/],
  ['grocery', /pantry|grocery/i, /خواربار/],
  ['drinks', /drink|beverage/i, /نوشیدنی/],
  ['protein', /protein|meat/i, /پروتئین|گوشت/],
  ['snacks', /snack/i, /تنقلات/],
];

// Banner text -> image: [file, test, width, height]
const BANNER_ART = [
  ['hero/breakfast-basket.webp', /صبحانه/, 1536, 1024],
  ['hero/hot-bread.webp', /نان|شیرینی/, 1536, 1024],
  ['hero/dairy.webp', /لبنیات|شیر|پنیر|ماست/, 560, 348],
];
const FALLBACK_BANNER = ['hero/offer.webp', null, 1536, 1024];


// ===== Small helpers =====
const $ = (selector, root = document) => root.querySelector(selector);

const SVG_NS = 'http://www.w3.org/2000/svg';

const numberFa = new Intl.NumberFormat('fa-IR');
const formatNumber = (value) => numberFa.format(value);
const formatPrice = (value) => `${numberFa.format(value)} تومان`;

const toFaDigits = (text) => String(text).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

// Build an element. Text is ALWAYS set as plain text (textContent / text nodes), never parsed as HTML.
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value === true ? '' : value);
  }
  node.append(...[].concat(children).filter((child) => child !== null && child !== undefined && child !== false));
  return node;
}

function icon(name, extraClass = '') {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', `icon ${extraClass}`.trim());
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
}

// Image element with the real intrinsic size (prevents layout shift)
function image(src, { alt = '', width, height, className, lazy = true, priority = false } = {}) {
  return el('img', {
    class: className,
    src,
    alt,
    width,
    height,
    loading: lazy && !priority ? 'lazy' : null,
    fetchpriority: priority ? 'high' : null,
    decoding: 'async',
  });
}

// Persian text from the API may carry emoji; the shop never shows emoji
const stripEmoji = (text) =>
  String(text ?? '').replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s+/g, ' ').trim();

// Half-space -> space, so the regular expressions above stay simple
const normalise = (text) => String(text ?? '').replace(/[\u200c\u200f]/g, ' ').replace(/\s+/g, ' ').trim();

// Only http(s), mailto, tel and in-page / relative links are allowed from data
function safeHref(href) {
  try {
    const url = new URL(href, location.href);
    const allowed = [location.protocol, 'http:', 'https:', 'mailto:', 'tel:'];
    return allowed.includes(url.protocol) ? href : '#';
  } catch {
    return '#';
  }
}

const safeColor = (value) => (/^#[0-9a-f]{3,8}$/i.test(String(value)) ? value : null);

const liveRegion = $('#live');
let liveTimer = 0;
function announce(message) {
  clearTimeout(liveTimer);
  liveRegion.textContent = '';
  liveTimer = setTimeout(() => { liveRegion.textContent = message; }, 60);
}


// ===== Cart (kept in localStorage: { productId: quantity }) =====
function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const clean = {};
    for (const [id, quantity] of Object.entries(parsed)) {
      if (Number.isInteger(quantity) && quantity > 0) clean[id] = quantity;
    }
    return clean;
  } catch {
    return {}; // empty, blocked or corrupted storage: start with an empty cart
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* storage is full or blocked: the cart still works until the page closes */
  }
}

let cart = loadCart();

const cartCount = () => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

function renderCartBadge(bump = false) {
  const count = cartCount();
  const badge = $('#cart-count');
  badge.textContent = formatNumber(count);
  $('#cart-btn').setAttribute('aria-label', `سبد خرید، ${formatNumber(count)} کالا`);
  if (bump) {
    badge.classList.remove('is-bump');
    void badge.offsetWidth; // restart the CSS animation
    badge.classList.add('is-bump');
  }
}

function addToCart(productId) {
  const product = model && model.productById.get(productId);
  if (!product) return;
  const have = cart[productId] || 0;
  if (have >= model.stockOf(productId)) {
    announce(`موجودی ${product.name} بیشتر از این نیست؛ همه‌ی موجودی در سبد شما است.`);
    return;
  }
  cart[productId] = have + 1;
  saveCart();
  renderCartBadge(true);
  announce(`${product.name} به سبد خرید اضافه شد. تعداد کالاهای سبد: ${formatNumber(cartCount())}`);
}

// Products that disappeared (or ran out) since the last visit must not stay in the cart
function reconcileCart() {
  let changed = false;
  for (const id of Object.keys(cart)) {
    const limit = model.productById.has(Number(id)) ? model.stockOf(Number(id)) : 0;
    if (limit <= 0) { delete cart[id]; changed = true; }
    else if (cart[id] > limit) { cart[id] = limit; changed = true; }
  }
  if (changed) saveCart();
  renderCartBadge();
}


// ===== Loading data =====
class ApiError extends Error {
  constructor(kind, file, status) {
    super(`${kind}: ${file}${status ? ` (${status})` : ''}`);
    this.kind = kind; // network | http | parse | timeout | shape
    this.file = file;
    this.status = status;
  }
}

// fetch() only rejects when the network fails. A 404 is a *successful* fetch,
// so the status is checked with res.ok. A broken file fails later, in res.json().
async function fetchJson(file, signal) {
  let res;
  try {
    res = await fetch(`${API_BASE}${file}.json`, { signal });
  } catch {
    throw new ApiError(signal.aborted ? 'timeout' : 'network', `${file}.json`);
  }
  if (!res.ok) throw new ApiError('http', `${file}.json`, res.status);
  try {
    return await res.json();
  } catch {
    throw new ApiError('parse', `${file}.json`);
  }
}

// All six files are requested at the same time with ONE Promise.all
async function loadData() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HARD_TIMEOUT_MS);
  try {
    const results = await Promise.all(API_FILES.map((file) => fetchJson(file, controller.signal)));
    return Object.fromEntries(API_FILES.map((file, index) => [file, results[index]]));
  } catch (error) {
    controller.abort(); // stop the requests that are still running
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

// Promise.race: if the answer takes longer than SLOW_AFTER_MS, tell the visitor, then keep waiting
const SLOW = Symbol('slow');
async function loadWithSlowNotice(onSlow) {
  const request = loadData();
  let timerId;
  const slow = new Promise((resolve) => { timerId = setTimeout(resolve, SLOW_AFTER_MS, SLOW); });
  try {
    const first = await Promise.race([request, slow]);
    if (first === SLOW) {
      onSlow();
      return await request;
    }
    return first;
  } finally {
    clearTimeout(timerId);
  }
}

// A file can be valid JSON and still have the wrong shape
function assertShape(raw) {
  const ok =
    Array.isArray(raw.products) &&
    Array.isArray(raw.categories) &&
    Array.isArray(raw.offers) &&
    raw.stock && typeof raw.stock.items === 'object' &&
    raw.shop && typeof raw.shop === 'object' &&
    raw.home && typeof raw.home === 'object';
  if (!ok) throw new ApiError('shape', 'api');
}


// ===== Model: join the files by id with Maps =====
let model = null;

function buildModel(raw) {
  assertShape(raw);
  const products = raw.products;
  const categories = raw.categories;
  const offerByProductId = new Map(raw.offers.map((offer) => [offer.productId, offer]));

  const stockOf = (id) => {
    const value = Number(raw.stock.items[id]);
    return Number.isFinite(value) && value > 0 ? value : 0;
  };

  return {
    products,
    categories,
    shop: raw.shop,
    home: raw.home,
    offers: raw.offers,
    productById: new Map(products.map((product) => [product.id, product])),
    categoryById: new Map(categories.map((category) => [category.id, category])),
    categoryBySlug: new Map(categories.map((category) => [category.slug, category])),
    offerByProductId,
    stockOf,
  };
}

function productArt(product) {
  const name = normalise(product.name);
  const row = PRODUCT_ART.find(([, test]) => test.test(name));
  return row ? row[0] : null;
}

const categoryArt = (category) =>
  CATEGORY_ART.find(([, slugTest, nameTest]) => slugTest.test(category.slug) || nameTest.test(normalise(category.name)))?.[0] ?? null;

// Discounted prices are rounded to the nearest 1,000 Toman (like the sample page)
function salePrice(price, percent) {
  return Math.min(price, Math.round((price * (100 - percent)) / 100 / 1000) * 1000);
}

// Everything a product card needs, joined from the four files
function describe(product) {
  const offer = model.offerByProductId.get(product.id);
  const validOffer = offer && offer.percent > 0 && offer.percent < 100 ? offer : null;
  return {
    product,
    art: productArt(product),
    stock: model.stockOf(product.id),
    soldOut: model.stockOf(product.id) === 0,
    percent: validOffer ? validOffer.percent : 0,
    oldPrice: validOffer ? product.price : 0,
    price: validOffer ? salePrice(product.price, validOffer.percent) : product.price,
  };
}

const offerItems = () =>
  model.offers.map((offer) => model.productById.get(offer.productId)).filter(Boolean).map(describe);

const categoryItems = (categoryId) =>
  model.products.filter((product) => product.categoryId === categoryId).map(describe);


// ===== Rendering: shared pieces =====
const main = $('#main');

const catalogHref = (slug) => `?cat=${encodeURIComponent(slug)}`;

function placeholderPic() {
  return el('span', { class: 'pic__empty' }, [icon('bag')]);
}

// One product card: <li class="card"><article class="card__body"> ... </article></li>
function productCard(item) {
  const { product, art, soldOut, percent, oldPrice, price } = item;

  let badge = null;
  if (soldOut) {
    badge = el('span', { class: 'badge badge--out', text: 'ناموجود' });
  } else if (percent) {
    badge = el('span', { class: 'badge' }, [`${formatNumber(percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]);
  }

  const picture = el('div', { class: 'pic' }, [
    art ? image(`${IMG}products/${art}.webp`, { width: 600, height: 600 }) : placeholderPic(),
    badge,
  ]);

  const priceBox = el('p', { class: 'price' }, percent
    ? [
        el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(oldPrice)]),
        el('strong', { text: formatPrice(price) }),
      ]
    : [el('strong', { text: formatPrice(price) })]);

  const addButton = el('button', {
    class: 'add',
    type: 'button',
    'data-id': product.id,
    'aria-label': soldOut ? `${product.name} ناموجود است` : `افزودن ${product.name} به سبد خرید`,
    disabled: soldOut,
    text: '+',
  });

  return el('li', { class: soldOut ? 'card card--out' : 'card' }, [
    el('article', { class: 'card__body' }, [
      picture,
      el('h3', { text: product.name }),
      el('p', { class: 'unit', text: product.unit }),
      el('div', { class: 'buy' }, [priceBox, addButton]),
    ]),
  ]);
}

// The last card of a carousel: "مشاهده همه" (opens ?cat=<slug>)
function seeAllCard(slug, title) {
  return el('li', { class: 'card card--all' }, [
    el('a', { class: 'offer-all', href: catalogHref(slug), 'data-route': true }, [
      el('span', { class: 'offer-all__circle' }, [icon('arrow-right', 'icon--mirror')]),
      el('span', { class: 'offer-all__text' }, ['مشاهده همه', el('span', { class: 'sr-only', text: ` ${title}` })]),
    ]),
  ]);
}

function arrowButton(direction, label, extraClass) {
  return el('button', { class: `${extraClass} ${direction < 0 ? 'arr--start' : 'arr--end'}`, type: 'button', 'data-dir': direction, 'aria-label': label },
    [icon('arrow-right')]);
}


// ===== Rendering: header =====
function renderNotice(shop) {
  const text = stripEmoji(shop.notice);
  $('#notice').replaceChildren(...(text ? [icon('truck', 'icon--mirror'), el('span', { text })] : []));
}

function renderNav(m) {
  const megaLinks = m.categories.map((category) => {
    const art = categoryArt(category);
    return el('li', {}, [
      el('a', { href: `#${category.slug}` }, [
        art ? image(`${IMG}categories/${art}.webp`, { className: 'cat__icon cat__icon--menu', width: 96, height: 96 }) : null,
        category.name,
      ]),
    ]);
  });

  const menu = (Array.isArray(m.shop.menu) ? m.shop.menu : []).map((item) =>
    el('li', {}, [el('a', { href: safeHref(item.href) , text: stripEmoji(item.label) })]));

  $('#nav-list').replaceChildren(
    el('li', { class: 'mega' }, [
      el('a', { href: '#categories' }, [icon('menu'), ' همه دسته‌ها']),
      el('ul', { class: 'mega-panel' }, megaLinks),
    ]),
    ...menu,
  );

  $('#q').placeholder = `جستجو در میان ${formatNumber(m.products.length)} کالا…`;
}


// ===== Rendering: hero (home.json -> hero + side) =====
function heroTag(m) {
  // the discounted, in-stock product that is also pictured in the hero art
  const pictured = new Set(HERO_ART.map(([name]) => name));
  const candidates = m.offers
    .map((offer) => m.productById.get(offer.productId))
    .filter(Boolean)
    .map(describe)
    .filter((item) => item.percent && !item.soldOut && pictured.has(item.art))
    .sort((a, b) => b.percent - a.percent);
  return candidates[0] ?? null;
}

function bannerArt(text) {
  return BANNER_ART.find(([, test]) => test.test(text)) ?? FALLBACK_BANNER;
}

function renderHero(m) {
  const { hero, side } = m.home;
  const offersCarousel = (m.home.carousels || []).find((carousel) => carousel.source === 'offers');
  const tag = heroTag(m);

  const stage = el('div', { class: 'hero__stage' }, [
    el('span', { class: 'hero__disc', 'aria-hidden': 'true' }),
    ...HERO_ART.map(([name, alt, width, height]) =>
      image(`${IMG}hero/${name}.webp`, { className: `hero__item hero__item--${name}`, alt, width, height, lazy: false, priority: name === 'tomato' })),
    tag
      ? el('a', { class: 'hero__tag', href: offersCarousel ? `#${offersCarousel.id}` : '#categories' }, [
          el('span', { class: 'hero__tag-name', text: `${tag.product.name}، ${tag.product.unit}` }),
          el('span', { class: 'hero__tag-row' }, [
            el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(tag.oldPrice)]),
            el('strong', { text: formatPrice(tag.price) }),
            el('span', { class: 'hero__tag-off' }, [`${formatNumber(tag.percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]),
          ]),
        ])
      : null,
  ]);

  const actions = el('div', { class: 'hero__actions' }, [
    hero.cta ? el('a', { class: 'btn', href: safeHref(hero.cta.href), text: stripEmoji(hero.cta.label) }) : null,
    offersCarousel ? el('a', { class: 'btn btn--outline', href: `#${offersCarousel.id}`, text: stripEmoji(offersCarousel.title) }) : null,
  ]);

  const feature = el('div', { class: 'hero__feature' }, [
    el('div', { class: 'hero__copy' }, [
      el('h1', { class: 'hero__title' }, [
        el('span', { class: 'hero__brand', text: `${BRAND.name}،` }),
        el('span', { class: 'hero__headline', text: stripEmoji(hero.title) }),
      ]),
      el('p', { class: 'hero__lead', text: stripEmoji(hero.text) }),
      actions,
    ]),
    stage,
  ]);

  const [sideFile, , sideWidth, sideHeight] = bannerArt(`${side.title} ${side.text}`);
  const promo = el('div', { class: 'hero__promo' }, [
    el('div', { class: 'hero__promo-copy' }, [
      el('h2', { class: 'hero__promo-title', text: stripEmoji(side.title) }),
      el('p', { class: 'hero__promo-note', text: stripEmoji(side.text) }),
      side.cta ? el('a', { class: 'btn btn--green', href: safeHref(side.cta.href), text: stripEmoji(side.cta.label) }) : null,
    ]),
    image(`${IMG}${sideFile}`, { className: 'hero__promo-art', width: sideWidth, height: sideHeight, lazy: false }),
  ]);

  return el('section', { class: 'hero', 'aria-label': 'پیشنهاد اصلی' }, [feature, promo]);
}


// ===== Rendering: categories grid (categories.json) =====
function renderCategories(m) {
  const tiles = m.categories.map((category) => {
    const art = categoryArt(category);
    const color = safeColor(category.color);
    const iconBox = el('span', { class: 'cat__icon-wrap' }, [
      art ? image(`${IMG}categories/${art}.webp`, { className: 'cat__icon', width: 96, height: 96, lazy: false }) : icon('bag'),
    ]);
    if (color) iconBox.style.setProperty('--cat-bg', color); // CSSOM, not an inline attribute in the HTML
    return el('li', {}, [el('a', { class: 'cat', href: `#${category.slug}` }, [iconBox, category.name])]);
  });

  return el('section', { id: 'categories', 'aria-labelledby': 'categories-t' }, [
    el('div', { class: 'sec-head' }, [el('h2', { id: 'categories-t', text: 'دسته‌بندی‌ها' })]),
    el('ul', { class: 'cats' }, tiles),
  ]);
}


// ===== Rendering: carousels (home.json -> carousels) =====
function offersCarousel(def, items) {
  const title = stripEmoji(def.title);
  const words = title.split(' ').flatMap((word, index) => (index ? [' ', el('span', { text: word })] : [el('span', { text: word })]));
  const [artFile, , artWidth, artHeight] = FALLBACK_BANNER;

  const intro = el('div', { class: 'offers__intro' }, [
    el('h2', { class: 'offers__title', id: `${def.id}-t` }, words),
    image(`${IMG}${artFile}`, { className: 'offers__art', width: artWidth, height: artHeight }),
    el('a', { class: 'offers__all', href: catalogHref(OFFERS_VIEW), 'data-route': true }, ['مشاهده همه ', icon('chevron-right', 'icon--mirror')]),
  ]);

  const list = el('ul', { class: 'offers__list' }, [...items.map(productCard), seeAllCard(OFFERS_VIEW, title)]);

  return el('section', { class: 'shelf offers', id: def.id, 'aria-labelledby': `${def.id}-t` }, [
    el('div', { class: 'offers__box' }, [
      el('div', { class: 'offers__scroller' }, [intro, list]),
      arrowButton(-1, `محصولات قبلی «${title}»`, 'offers__nav offers__nav--prev'),
      arrowButton(1, `محصولات بعدی «${title}»`, 'offers__nav offers__nav--next'),
    ]),
  ]);
}

function categoryCarousel(id, category, title, items) {
  const art = categoryArt(category);
  return el('section', { class: 'shelf', id, 'aria-labelledby': `${id}-t` }, [
    el('div', { class: 'sec-head' }, [
      el('h2', { id: `${id}-t` }, [
        art ? image(`${IMG}categories/${art}.webp`, { className: 'cat__icon cat__icon--head', width: 96, height: 96, lazy: false }) : null,
        title,
      ]),
      el('div', { class: 'arrows' }, [
        arrowButton(-1, `محصولات قبلی «${title}»`, 'arr'),
        arrowButton(1, `محصولات بعدی «${title}»`, 'arr'),
      ]),
    ]),
    el('ul', { class: 'rail' }, [...items.map(productCard), seeAllCard(category.slug, title)]),
  ]);
}

// The order and the content of the carousels come from home.json.
// A new entry in home.json -> a new carousel, with no change in the HTML.
function renderCarousels(m) {
  const sections = [];
  const usedIds = new Set(['categories', 'contact', 'top', 'main']);
  const coveredCategories = new Set();

  for (const def of Array.isArray(m.home.carousels) ? m.home.carousels : []) {
    if (!def || !def.id || usedIds.has(def.id)) continue;
    if (def.source === 'offers') {
      sections.push(offersCarousel(def, offerItems()));
      usedIds.add(def.id);
    } else if (m.categoryById.has(def.categoryId)) {
      const category = m.categoryById.get(def.categoryId);
      sections.push(categoryCarousel(def.id, category, stripEmoji(def.title) || category.name, categoryItems(category.id)));
      coveredCategories.add(category.id);
      usedIds.add(def.id);
    }
  }

  // Every category tile links to #<slug>, so every category needs a section to land on
  if (SHOW_REMAINING_CATEGORIES) {
    for (const category of m.categories) {
      if (coveredCategories.has(category.id) || usedIds.has(category.slug)) continue;
      sections.push(categoryCarousel(category.slug, category, category.name, categoryItems(category.id)));
    }
  }
  return sections;
}

// Promo banners (home.json -> promos) sit after the first carousel, like the sample page
function renderPromos(m) {
  const promos = Array.isArray(m.home.promos) ? m.home.promos : [];
  if (!promos.length) return null;
  const links = promos.map((promo) => {
    const text = stripEmoji(promo.text);
    const [file, , width, height] = bannerArt(text);
    return el('a', { class: 'banner', href: safeHref(promo.href) }, [text, image(`${IMG}${file}`, { width, height })]);
  });
  return el('section', { class: 'banners', 'aria-label': 'پیشنهادهای تبلیغاتی' }, links);
}


// ===== Rendering: catalog view (?cat=<slug>) =====
function renderCatalog(m, slug) {
  let title;
  let items;
  let category = null;

  if (slug === OFFERS_VIEW) {
    const def = (m.home.carousels || []).find((carousel) => carousel.source === 'offers');
    title = (def && stripEmoji(def.title)) || 'پیشنهاد ویژه';
    items = offerItems();
  } else if (m.categoryBySlug.has(slug)) {
    category = m.categoryBySlug.get(slug);
    title = category.name;
    items = categoryItems(category.id);
  } else {
    return { title: 'دسته پیدا نشد', nodes: [notFound(slug)] };
  }

  const art = category && categoryArt(category);
  const crumbs = el('nav', { class: 'crumbs', 'aria-label': 'مسیر صفحه' }, [
    el('a', { href: location.pathname, 'data-route': true, text: 'همه محصولات' }),
    icon('chevron-right', 'icon--mirror'),
    el('span', { 'aria-current': 'page', text: title }),
  ]);

  const section = el('section', { class: 'catalog', 'aria-labelledby': 'catalog-t' }, [
    el('div', { class: 'sec-head' }, [
      el('h1', { id: 'catalog-t', class: 'catalog__title' }, [
        art ? image(`${IMG}categories/${art}.webp`, { className: 'cat__icon cat__icon--head', width: 96, height: 96, lazy: false }) : null,
        title,
      ]),
      el('p', { class: 'catalog__count', text: `${formatNumber(items.length)} کالا` }),
    ]),
    items.length
      ? el('ul', { class: 'grid' }, items.map(productCard))
      : el('p', { class: 'state', text: 'فعلاً کالایی در این بخش نداریم.' }),
  ]);
  return { title, nodes: [crumbs, section] };
}

function notFound(slug) {
  return el('section', { class: 'state', 'aria-labelledby': 'nf-t' }, [
    el('h1', { id: 'nf-t', class: 'state__title', text: 'این دسته را پیدا نکردیم' }),
    el('p', { text: 'آدرسی که باز کردید دسته‌ای با این نام ندارد.' }),
    el('a', { class: 'btn btn--green', href: location.pathname, 'data-route': true, text: 'بازگشت به همه محصولات' }),
  ]);
}


// ===== Rendering: footer (static brand data + categories.json + shop.json) =====
function renderFooterBrand() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`;

  const address = el('a', { href: mapsUrl, target: '_blank', rel: 'noopener noreferrer' }, [
    icon('pin'),
    ` ${BRAND.address}`,
    el('span', { class: 'sr-only', text: ' (نمایش در گوگل مپ، در تب جدید باز می‌شود)' }),
  ]);
  const phones = BRAND.phones.map((phone) =>
    el('a', { href: `tel:${phone.tel}` }, [
      icon(phone.icon),
      ' ',
      el('span', { class: 'sr-only', text: `${phone.label}: ` }),
      el('bdi', { dir: 'ltr', text: phone.text }),
    ]));
  const email = el('a', { href: `mailto:${BRAND.email}` }, [
    icon('mail'),
    ' ',
    el('span', { class: 'sr-only', text: 'ایمیل: ' }),
    el('bdi', { dir: 'ltr', text: BRAND.email }),
  ]);
  $('#foot-contact').replaceChildren(address, ...phones, email);

  $('#foot-social').replaceChildren(...BRAND.social.map((net) =>
    el('li', {}, [el('a', { href: net.href }, [icon(net.icon), ` ${net.label}`])])));

  $('#foot-copy').textContent = BRAND.copyright; // our own line, not the sample shop's
}

function renderFooterData(m) {
  const shop = m.shop;
  $('#foot-about').textContent = stripEmoji(shop.about);

  $('#foot-cats').replaceChildren(...m.categories.map((category) =>
    el('li', {}, [el('a', { href: `#${category.slug}`, text: category.name })])));

  // help links with a real address are links; "#" placeholders stay plain text
  $('#foot-help').replaceChildren(...(Array.isArray(shop.help) ? shop.help : []).map((item) => {
    const label = stripEmoji(item.label);
    return el('li', {}, [item.href && item.href !== '#' ? el('a', { href: safeHref(item.href), text: label }) : label]);
  }));

  $('#foot-hours').replaceChildren(...(Array.isArray(shop.schedule) ? shop.schedule : []).map((row) =>
    el('li', { text: `${row.days}: ${row.time}` })));
}


// ===== Rendering: loading skeleton & error state =====
function skeletonCard() {
  return el('li', { class: 'card card--skeleton' }, [
    el('div', { class: 'card__body' }, [
      el('div', { class: 'pic skeleton' }),
      el('span', { class: 'skeleton skeleton--line' }),
      el('span', { class: 'skeleton skeleton--line skeleton--short' }),
    ]),
  ]);
}

function renderLoading() {
  main.setAttribute('aria-busy', 'true');
  main.replaceChildren(
    el('section', { class: 'hero hero--skeleton', 'aria-hidden': 'true' }, [
      el('div', { class: 'skeleton skeleton--hero' }),
      el('div', { class: 'skeleton skeleton--hero' }),
    ]),
    el('section', { id: 'loading', 'aria-labelledby': 'categories-t' }, [
      el('div', { class: 'sec-head' }, [el('h2', { id: 'categories-t', text: 'دسته‌بندی‌ها' })]),
      el('p', { class: 'state-text', id: 'loading-text', text: 'در حال بارگذاری…' }),
      el('ul', { class: 'cats cats--skeleton', 'aria-hidden': 'true' }, Array.from({ length: 7 }, () => el('li', { class: 'skeleton' }))),
    ]),
    el('section', { 'aria-hidden': 'true' }, [el('ul', { class: 'rail rail--skeleton' }, Array.from({ length: 6 }, skeletonCard))]),
  );
  announce('در حال بارگذاری محصولات…');
}

function showSlowNotice() {
  const text = $('#loading-text');
  if (!text) return;
  text.textContent = 'اتصال کند است؛ هنوز در حال دریافت اطلاعات هستیم…';
  text.classList.add('state-text--slow');
  announce('اتصال کند است؛ هنوز در حال دریافت اطلاعات هستیم.');
}

const ERROR_TEXT = {
  network: 'ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.',
  http: 'سرور فایل مورد نیاز را پیدا نکرد یا پاسخ درستی نداد.',
  parse: 'اطلاعات دریافتی از سرور خراب است و خوانده نمی‌شود.',
  timeout: 'پاسخ سرور بیش از اندازه طول کشید. دوباره تلاش کنید.',
  shape: 'ساختار اطلاعات دریافتی با انتظار ما نمی‌خواند.',
};

function renderError(error) {
  const kind = error instanceof ApiError ? error.kind : 'network';
  const detail = error instanceof ApiError && error.file
    ? el('p', { class: 'state__detail' }, [
        el('bdi', { dir: 'ltr', text: error.file }),
        error.status ? ` · ${toFaDigits(error.status)}` : null,
      ])
    : null;

  main.removeAttribute('aria-busy');
  main.replaceChildren(
    el('section', { class: 'state state--error', role: 'alert' }, [
      icon('alert', 'state__icon'),
      el('h2', { class: 'state__title', text: 'بارگذاری محصولات ممکن نشد' }),
      el('p', { text: ERROR_TEXT[kind] ?? ERROR_TEXT.network }),
      detail,
      el('button', { class: 'btn btn--green', type: 'button', 'data-action': 'retry' }, [icon('refresh'), ' تلاش دوباره']),
    ]),
  );
}


// ===== Carousel behaviour (one click = one card) =====
function carouselScroller(section) {
  return $('.offers__scroller, .rail', section);
}

function initCarousel(section) {
  const scroller = carouselScroller(section);
  const buttons = [...section.querySelectorAll('button[data-dir]')];

  // the arrows are disabled at the two ends (works in LTR and RTL: scrollLeft is 0 at the start)
  const update = () => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const position = Math.abs(scroller.scrollLeft);
    for (const button of buttons) {
      button.disabled = Number(button.dataset.dir) < 0 ? position <= 1 : position >= max - 1;
    }
  };

  let frame = 0;
  scroller.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, { passive: true });

  if ('ResizeObserver' in window) new ResizeObserver(update).observe(scroller);
  else window.addEventListener('resize', update);
  update();
}

function scrollCarousel(section, direction) {
  const scroller = carouselScroller(section);
  const card = $('.card', scroller);
  if (!card) return;
  const gap = parseFloat(getComputedStyle(card.parentElement).columnGap) || 12;
  const step = card.getBoundingClientRect().width + gap;
  const rtl = getComputedStyle(scroller).direction === 'rtl';
  scroller.scrollBy({ left: direction * (rtl ? -1 : 1) * step }); // smooth when the visitor allows motion (see CSS)
}


// ===== URL: ?cat=<slug> (catalog view) and #<slug> (section on the home view) =====
function parseRoute() {
  const slug = new URLSearchParams(location.search).get('cat');
  return slug ? { type: 'catalog', slug } : { type: 'home' };
}

function currentHashId() {
  try {
    return decodeURIComponent(location.hash.slice(1));
  } catch {
    return '';
  }
}

// The sections are created after the page has loaded, so the browser cannot jump to the
// #fragment by itself: do it here, and mark where the visitor is.
function syncLocation({ scroll = false } = {}) {
  const id = currentHashId();
  const target = id ? document.getElementById(id) : null;

  main.querySelectorAll('[data-here]').forEach((node) => node.removeAttribute('data-here'));
  if (target && target.matches('.shelf, #categories')) target.setAttribute('data-here', '');

  document.querySelectorAll('.main-nav a').forEach((link) => {
    if (id && link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  if (scroll && target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
}

function renderRoute({ focus = false } = {}) {
  if (!model) return;
  const route = parseRoute();
  let nodes;

  if (route.type === 'catalog') {
    const view = renderCatalog(model, route.slug);
    document.title = `${view.title} | ${BRAND.name}`;
    nodes = view.nodes;
  } else {
    document.title = BRAND.name;
    const sections = renderCarousels(model);
    const promos = renderPromos(model);
    if (promos) sections.splice(1, 0, promos);
    nodes = [renderHero(model), renderCategories(model), ...sections];
  }

  main.replaceChildren(...nodes);
  main.removeAttribute('aria-busy');
  main.querySelectorAll('.shelf').forEach(initCarousel);
  syncLocation({ scroll: true });
  if (focus) main.focus({ preventScroll: true });
}

function navigate(url) {
  history.pushState(null, '', url);
  window.scrollTo({ top: 0, behavior: 'instant' });
  renderRoute({ focus: true });
}


// ===== Events (one listener for the whole page) =====
const menuToggle = $('#menu-toggle');

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const addButton = target.closest('.add');
  if (addButton) {
    if (!addButton.disabled) addToCart(Number(addButton.dataset.id));
    return;
  }

  const arrow = target.closest('button[data-dir]');
  if (arrow) {
    scrollCarousel(arrow.closest('.shelf'), Number(arrow.dataset.dir));
    return;
  }

  if (target.closest('[data-action="retry"]')) {
    start();
    return;
  }

  const link = target.closest('a[href]');
  if (!link) return;
  if (link.closest('.main-nav')) menuToggle.checked = false; // close the phone menu after a choice

  const plainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  if (!plainClick || link.target === '_blank') return;

  const href = link.getAttribute('href');
  if (link.hasAttribute('data-route')) {
    event.preventDefault();
    navigate(href);
  } else if (parseRoute().type === 'catalog' && href.length > 1 && href.startsWith('#') && !document.getElementById(href.slice(1))) {
    // the home sections are not on this view: go home first, then to the section
    event.preventDefault();
    navigate(location.pathname + href);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.checked) {
    menuToggle.checked = false;
    menuToggle.focus();
  }
});

window.addEventListener('popstate', () => renderRoute());
window.addEventListener('hashchange', () => syncLocation());

// the cart changed in another tab
window.addEventListener('storage', (event) => {
  if (event.key !== CART_KEY) return;
  cart = loadCart();
  renderCartBadge();
});


// ===== Start-up =====
async function start() {
  renderLoading();
  try {
    model = buildModel(await loadWithSlowNotice(showSlowNotice));
    renderNotice(model.shop);
    renderNav(model);
    renderFooterData(model);
    reconcileCart();
    renderRoute();
  } catch (error) {
    model = null;
    renderError(error instanceof ApiError ? error : new ApiError('shape', ''));
    announce('بارگذاری محصولات ممکن نشد.');
  }
}

renderFooterBrand(); // our own contact details need no API
renderCartBadge();   // the cart comes from localStorage, so it shows at once
syncLocation();
start();
