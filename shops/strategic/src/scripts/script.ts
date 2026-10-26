/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */




// ===== Imports =====
import confetti from 'canvas-confetti';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { ApiError, loadApiData } from './api';
import type {
  ApiData,
  Category,
  Product,
  ProductItem,
  SearchIndexEntry,
  ShopModel,
} from '../types';


// ===== Config =====
const SLOW_AFTER_MS: number = 3000;
const SEARCH_DELAY_MS: number = 150;
const CART_KEY: string = 'armin-market:cart';
const OFFERS_VIEW: string = 'offers';   
const SHOW_REMAINING_CATEGORIES: boolean = true; 
const IMG: string = './assets/images/';

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


type HeroArt = readonly [name: string, alt: string, width: number, height: number];
type ProductArtRule = readonly [file: string | null, pattern: RegExp];
type CategoryArtRule = readonly [file: string, slugPattern: RegExp, namePattern: RegExp];
type BannerArt = readonly [file: string, pattern: RegExp | null, width: number, height: number];

const HERO_ART: HeroArt[] = [
  ['broccoli', 'کلم بروکلی', 560, 559],
  ['carrot', 'هویج', 357, 560],
  ['pepper', 'فلفل دلمه‌ای', 502, 560],
  ['tomato', 'گوجه‌فرنگی', 541, 560],
  ['orange', 'پرتقال تامسون', 560, 466],
  ['strawberry', 'توت‌فرنگی', 518, 560],
];
const HERO_NAMES: Set<string> = new Set(HERO_ART.map(([name]) => name));

const PRODUCT_ART: ProductArtRule[] = [
  [null, /سیب ?زمینی/],
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
  ['fish-tuna', /تن ماهی|کنسرو ?تن|کنسرو/],
  ['shrimp', /میگو/],
  ['trout', /ماهی|قزل/],
  ['sausage', /سوسیس|کالباس/],
  ['lavash-bread', /لواش/],
  ['gandomin-bread', /گندمین|سنگک|بربری|تافتون/],
  ['whole-grain-toast', /نان ?تست|تست|سبوس|باگت/],
  ['rice', /برنج/],
  ['macaroni', /ماکارونی|پاستا|اسپاگتی/],
  ['lentil', /عدس/],
  ['sunflower-oil', /روغن/],
  ['saffron', /زعفران/],
  ['honey', /عسل/],
  ['Gaz', /(^| )گز( |$)/],
  ['grapes', /انگور/],
  ['watermelon', /هندوانه/],
  ['banana', /موز/],
  ['red-apple', /سیب/],
  ['carrot', /هویج/],
  ['orange', /پرتقال|پرتغال|نارنگی/],
  ['tomato', /گوجه/],
  ['cucumber', /خیار/],
];

const CATEGORY_ART: CategoryArtRule[] = [
  ['produce', /fruit|produce|vegetable/i, /میوه|سبزی/],
  ['dairy', /dairy/i, /لبنیات/],
  ['bakery', /bakery|bread/i, /نان|شیرینی/],
  ['grocery', /pantry|grocery/i, /خواربار/],
  ['drinks', /drink|beverage/i, /نوشیدنی/],
  ['protein', /protein|meat/i, /پروتئین|گوشت/],
  ['snacks', /snack/i, /تنقلات/],
];

const BANNER_ART: BannerArt[] = [
  ['hero/breakfast-basket.webp', /صبحانه/, 1536, 1024],
  ['hero/hot-bread.webp', /نان|شیرینی/, 1536, 1024],
  ['hero/dairy.webp', /لبنیات|شیر|پنیر|ماست/, 560, 348],
];
const FALLBACK_BANNER: BannerArt = ['hero/offer.webp', null, 1536, 1024];

const ERROR_TEXT: Record<ApiError['kind'], string> = {
  network: 'ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.',
  http: 'سرور فایل مورد نیاز را پیدا نکرد یا پاسخ درستی نداد.',
  parse: 'اطلاعات دریافتی از سرور خراب است و خوانده نمی‌شود.',
  timeout: 'پاسخ سرور بیش از اندازه طول کشید. دوباره تلاش کنید.',
  shape: 'ساختار اطلاعات دریافتی با انتظار ما نمی‌خواند.',
};


// ===== DOM References & Helpers =====
const $ = <T extends Element>(selector: string, root: ParentNode = document): T | null => root.querySelector<T>(selector);

function required<T extends Element>(selector: string, root: ParentNode = document): T {
  const node = root.querySelector<T>(selector);
  if (!node) throw new Error(`Missing required HTML element: ${selector}`);
  return node;
}

// ===== Looked Up Once =====
const dom = {
  main: required<HTMLElement>('#main'),
  live: required<HTMLElement>('#live'),
  notice: required<HTMLElement>('#notice'),
  navList: required<HTMLUListElement>('#nav-list'),
  search: required<HTMLInputElement>('#q'),
  menuToggle: required<HTMLInputElement>('#menu-toggle'),
  cartWrap: required<HTMLElement>('#cart-wrap'),
  cartButton: required<HTMLButtonElement>('#cart-btn'),
  cartCount: required<HTMLElement>('#cart-count'),
  cartPanel: required<HTMLElement>('#cart-panel'),
  footer: {
    about: required<HTMLElement>('#foot-about'),
    contact: required<HTMLElement>('#foot-contact'),
    social: required<HTMLUListElement>('#foot-social'),
    copy: required<HTMLElement>('#foot-copy'),
    cats: required<HTMLUListElement>('#foot-cats'),
    help: required<HTMLUListElement>('#foot-help'),
    hours: required<HTMLUListElement>('#foot-hours'),
  },
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const coarsePointer = window.matchMedia('(pointer: coarse)');
const SVG_NS = 'http://www.w3.org/2000/svg';
const numberFa = new Intl.NumberFormat('fa-IR');
const formatNumber = (value: number) => numberFa.format(value);
const formatPrice = (value: number) => `${numberFa.format(value)} تومان`;
const toFaDigits = (value: string | number): string => String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)] ?? digit);

type ElementProps = Record<string, string | number | boolean | null | undefined>;
type Child = Node | string | number | false | null | undefined;
type Children = Child | readonly Child[];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, props?: ElementProps, children?: Children): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (props) {
    for (const key in props) {
      const value = props[key];
      if (value === undefined || value === null || value === false) continue;
      if (key === 'class') node.className = String(value);
      else if (key === 'text') node.textContent = String(value);
      else node.setAttribute(key, value === true ? '' : String(value));
    }
  }
  if (children !== undefined) {
    const childList: readonly Child[] = Array.isArray(children) ? children : [children];
    for (const child of childList) {
      if (child === null || child === undefined || child === false) continue;
      if (child instanceof Node) node.append(child);
      else node.append(document.createTextNode(String(child)));
    }
  }
  return node;
}

function icon(name: string, extraClass = ''): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', `icon ${extraClass}`.trim());
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
}

type ImageOptions = { alt?: string; width?: number; height?: number; className?: string; lazy?: boolean; priority?: boolean };

function image(src: string, { alt = '', width, height, className, lazy = true, priority = false }: ImageOptions = {}): HTMLImageElement {
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

const stripEmoji = (text: unknown) =>
  String(text ?? '').replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').replace(/\s+/g, ' ').trim();


function safeHref(href: string | null | undefined): string {
  if (!href) return '#';
  try {
    const { protocol } = new URL(href, location.href);
    return [location.protocol, 'http:', 'https:', 'mailto:', 'tel:'].includes(protocol) ? href : '#';
  } catch {
    return '#';
  }
}

const safeColor = (value: unknown): string | null =>
  typeof value === 'string' && /^#[0-9a-f]{3,8}$/i.test(value) ? value : null;

let liveTimer: number | undefined;
function announce(message: string): void {
  clearTimeout(liveTimer);
  dom.live.textContent = '';
  liveTimer = setTimeout(() => { dom.live.textContent = message; }, 60);
}


// ===== Text & Art Helpers =====
const searchKey = (value: unknown): string =>
  String(value ?? '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[\u200c\u200d\u200e\u200f]/g, ' ')
    .replace(/[\u064b-\u065f\u0670]/g, '')
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const findProductArt = (key: string): string | null => PRODUCT_ART.find(([, test]) => test.test(key))?.[0] ?? null;
const findCategoryArt = (category: Category): string | null => {
  const name = searchKey(category.name);
  return CATEGORY_ART.find(([, slugTest, nameTest]) => slugTest.test(category.slug) || nameTest.test(name))?.[0] ?? null;
};

const findBannerArt = (text: string): BannerArt => BANNER_ART.find(([, test]) => test !== null && test.test(text)) ?? FALLBACK_BANNER;
const salePrice = (price: number, percent: number): number => Math.min(price, Math.round((price * (100 - percent)) / 100 / 1000) * 1000);


// ===== State =====
const createEmptyModel = (): ShopModel => ({
  products: [], categories: [], offers: [], shop: {},
  home: { hero: { title: '', text: '' }, side: { title: '', text: '' }, carousels: [], promos: [] },
  stockOf: (_id: number): number => 0,
  items: new Map<number, ProductItem>(),
  itemsByCategory: new Map<number, ProductItem[]>(),
  searchIndex: [],
  categoryById: new Map<number, Category>(),
  categoryBySlug: new Map<string, Category>(),
  categoryArt: new Map<number, string | null>(),
  offerItems: [], carousels: [],
});

let model: ShopModel = createEmptyModel();
let modelReady = false;
let cart: Record<string, number> = loadCart(); 
const notyf = new Notyf({ duration: 2200, position: { x: 'left', y: 'bottom' }, dismissible: true, ripple: false });

const ui: { renderedSearch: string; cartPinned: boolean; cartCloseTimer: number; searchTimer: number; pendingQuery: string; scrollFrame: number } = {
  renderedSearch: location.search, 
  cartPinned: false,   
  cartCloseTimer: 0,
  searchTimer: 0,
  pendingQuery: '',        
  scrollFrame: 0,
};


// ===== Cart (localStorage) =====
function loadCart(): Record<string, number> {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const clean: Record<string, number> = {};
    for (const [id, quantity] of Object.entries(parsed)) {
      if (typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0) clean[id] = quantity;
    }
    return clean;
  } catch {
    return {}; 
  }
}

function saveCart(): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* Storage Is Full or Blocked... */
  }
}

const qtyOf = (id: number): number => cart[String(id)] || 0;
const cartCount = (): number => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

function renderCartBadge(bump = false): void {
  const count = cartCount();
  dom.cartCount.textContent = formatNumber(count);
  dom.cartButton.setAttribute('aria-label', `سبد خرید، ${formatNumber(count)} کالا`);
  if (bump) {
    dom.cartCount.classList.remove('is-bump');
    void dom.cartCount.offsetWidth; 
    dom.cartCount.classList.add('is-bump');
  }
}


function setQty(id: number, wanted: number, source: 'add-button' | 'stepper' = 'stepper'): void {
  const item = model.items.get(id);
  if (!item) return;
  const { name } = item.product;
  const before = qtyOf(id);
  const after = Math.max(0, Math.min(wanted, item.stock));

  if (after === before) {
    if (wanted > item.stock) announce(`موجودی ${name} بیشتر از این نیست؛ همه‌ی موجودی در سبد شما است.`);
    return;
  }
  if (after === 0) delete cart[String(id)];
  else cart[String(id)] = after;

  saveCart();
  if (after > before) {
    notyf.success(`${name} به سبد اضافه شد`);
    if (source === 'add-button' && !reducedMotion.matches) {
      confetti({ particleCount: 44, spread: 66, startVelocity: 26, origin: { y: 0.72 }, disableForReducedMotion: true });
    }
  }
  renderCartBadge(after > before);
  syncControls(id);
  refreshMiniCart();
  announce(after === 0
    ? `${name} از سبد خرید حذف شد.`
    : `تعداد ${name} در سبد: ${formatNumber(after)}. کل کالاهای سبد: ${formatNumber(cartCount())}`);
}


function reconcileCart(): void {
  let changed = false;
  for (const id of Object.keys(cart)) {
    const limit = model.items.get(Number(id))?.stock ?? 0;
    if (limit <= 0) { delete cart[id]; changed = true; }
    else if (cart[id] > limit) { cart[id] = limit; changed = true; }
  }
  if (changed) saveCart();
  renderCartBadge();
}


// ===== Loading Data =====
const SLOW = Symbol('slow');
async function loadWithSlowNotice(onSlow: () => void): Promise<ApiData> {
  const request = loadApiData();
  let timerId: number | undefined;
  const slow = new Promise<typeof SLOW>((resolve) => {
    timerId = window.setTimeout(() => resolve(SLOW), SLOW_AFTER_MS);
  });
  try {
    const first = await Promise.race([request, slow]);
    if (first !== SLOW) return first;
    onSlow();
    return await request;
  } finally {
    if (timerId !== undefined) window.clearTimeout(timerId);
  }
}


// ===== Model =====
function buildModel(raw: ApiData): ShopModel {
  const { products, categories, offers, shop, home } = raw;

  const offerByProductId = new Map<number, ApiData['offers'][number]>(offers.map((offer): [number, ApiData['offers'][number]] => [offer.productId, offer]));
  const categoryById = new Map<number, Category>(categories.map((category): [number, Category] => [category.id, category]));

  const stockOf = (id: number): number => {
    const value = Number(raw.stock.items[id]);
    return Number.isFinite(value) && value > 0 ? value : 0;
  };

  const items = new Map<number, ProductItem>();
  const itemsByCategory = new Map<number, ProductItem[]>(categories.map((category): [number, ProductItem[]] => [category.id, []]));
  const searchIndex: SearchIndexEntry[] = [];

  for (const product of products) {
    const offer = offerByProductId.get(product.id);
    const percent = offer && offer.percent > 0 && offer.percent < 100 ? offer.percent : 0;
    const stock = stockOf(product.id);
    const nameKey = searchKey(product.name);
    const item: ProductItem = {
      product,
      art: findProductArt(nameKey),
      stock,
      soldOut: stock === 0,
      percent,
      oldPrice: percent ? product.price : 0,
      price: percent ? salePrice(product.price, percent) : product.price,
    };
    items.set(product.id, item);
    itemsByCategory.get(product.categoryId)?.push(item);

    searchIndex.push({
      item,
      name: nameKey,
      text: searchKey([product.name, product.unit, ...(product.tags ?? [])].join(' ')),
      categoryWords: searchKey(categoryById.get(product.categoryId)?.name).split(' '),
    });
  }

  return {
    products,
    categories,
    offers,
    shop,
    home,
    stockOf,
    items,
    itemsByCategory,
    searchIndex,
    categoryById,
    categoryBySlug: new Map<string, Category>(categories.map((category): [string, Category] => [category.slug, category])),
    categoryArt: new Map<number, string | null>(categories.map((category): [number, string | null] => [category.id, findCategoryArt(category)])),
    offerItems: offers.map((offer) => items.get(offer.productId)).filter((item): item is ProductItem => item !== undefined),
    carousels: Array.isArray(home.carousels) ? home.carousels : [],
  };
}


function searchProducts(query: string): ProductItem[] {
  const terms = searchKey(query).split(' ').filter(Boolean);
  if (!terms.length) return [];
  const inName = (entry: SearchIndexEntry): boolean => terms.every((term) => entry.name.includes(term));
  return model.searchIndex
    .filter((entry) => terms.every((term) => entry.text.includes(term) || entry.categoryWords.includes(term)))
    .sort((first, second) => Number(inName(second)) - Number(inName(first)))
    .map((entry) => entry.item);
}


// ===== Views: Pieces =====
const catalogUrl = (slug: string): string => `?cat=${encodeURIComponent(slug)}`;
const placeholderPic = () => el('span', { class: 'pic__empty' }, [icon('bag')]);

function categoryImage(category: Category, className: string, lazy = true): HTMLImageElement | null {
  const art = model.categoryArt.get(category.id);
  return art ? image(`${IMG}categories/${art}.webp`, { className, width: 96, height: 96, lazy }) : null;
}

// ===== The Capsule =====
function stepper(product: Product): HTMLDivElement {
  return el('div', { class: 'stepper', role: 'group', 'aria-label': `تعداد ${product.name} در سبد خرید`, 'data-id': product.id }, [
    // RTL: the first child is on the right, so "+" sits on the right and the trash on the left
    el('button', { class: 'stepper__btn', type: 'button', 'data-step': 'inc', 'aria-label': `افزودن یک عدد ${product.name}` }, [icon('plus')]),
    el('span', { class: 'stepper__qty' }),
    el('button', { class: 'stepper__btn', type: 'button', 'data-step': 'dec' }, [icon('minus')]),
  ]);
}

function updateStepper(box: HTMLElement, item: ProductItem, quantity: number): void {
  const { product } = item;
  const dec = required<HTMLButtonElement>('[data-step="dec"]', box);
  const inc = required<HTMLButtonElement>('[data-step="inc"]', box);
  const quantityLabel = required<HTMLElement>('.stepper__qty', box);
  const trash = quantity === 1;
  quantityLabel.textContent = formatNumber(quantity);
  dec.setAttribute('aria-label', trash ? `حذف ${product.name} از سبد خرید` : `کم کردن یک عدد ${product.name}`);
  dec.classList.toggle('is-trash', trash);
  required<SVGUseElement>('use', dec).setAttribute('href', trash ? '#i-trash' : '#i-minus');
  if (quantity >= item.stock) inc.setAttribute('aria-disabled', 'true');
  else inc.removeAttribute('aria-disabled');
}

// ===== Card's Control =====
function buyControl(product: Product, soldOut: boolean): HTMLDivElement {
  return el('div', { class: 'buy__control', 'data-id': product.id }, [
    el('button', {
      class: 'add',
      type: 'button',
      'data-id': product.id,
      'aria-label': soldOut ? `${product.name} ناموجود است` : `افزودن ${product.name} به سبد خرید`,
      disabled: soldOut,
      text: '+',
    }),
  ]);
}

function updateSlot(slot: HTMLElement): void {
  const id = Number(slot.dataset.id);
  const item = model.items.get(id);
  if (!item) return;
  const quantity = qtyOf(id);
  let box = $<HTMLDivElement>('.stepper', slot);
  if (!box && quantity === 0) return; 
  const add = $<HTMLButtonElement>('.add', slot);
  if (!add) return;

  const active = document.activeElement;
  const hadFocus = slot.contains(active);
  const pressed = hadFocus && active instanceof HTMLElement ? active.dataset.step ?? '' : '';

  if (!box) {
    box = stepper(item.product);
    slot.append(box);
  }
  add.hidden = quantity > 0;
  box.hidden = quantity === 0;
  if (quantity > 0) updateStepper(box, item, quantity);

  if (hadFocus) { 
    const next = quantity === 0 ? add : $<HTMLButtonElement>(pressed === 'dec' ? '[data-step="dec"]' : '[data-step="inc"]', box);
    next?.focus({ preventScroll: true });
  }
}

function syncControls(id: number): void {
  document.querySelectorAll<HTMLElement>(`.buy__control[data-id="${id}"]`).forEach(updateSlot);
}

function syncAllControls(): void {
  document.querySelectorAll<HTMLElement>('.buy__control').forEach(updateSlot);
}

function syncCartControls(): void {
  Object.keys(cart).forEach((id) => syncControls(Number(id)));
}

// ===== Product Card =====
function productCard(item: ProductItem): HTMLLIElement {
  const { product, art, soldOut, percent, oldPrice, price } = item;

  let badge = null;
  if (soldOut) badge = el('span', { class: 'badge badge--out', text: 'ناموجود' });
  else if (percent) badge = el('span', { class: 'badge' }, [`${formatNumber(percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]);

  const priceBox = el('p', { class: 'price' }, percent
    ? [
        el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(oldPrice)]),
        el('strong', { text: formatPrice(price) }),
      ]
    : [el('strong', { text: formatPrice(price) })]);

  return el('li', { class: soldOut ? 'card card--out' : 'card' }, [
    el('article', { class: 'card__body' }, [
      el('div', { class: 'pic' }, [art ? image(`${IMG}products/${art}.webp`, { width: 600, height: 600 }) : placeholderPic(), badge]),
      el('h3', { text: product.name }),
      el('p', { class: 'unit', text: product.unit }),
      el('div', { class: 'buy' }, [priceBox, buyControl(product, soldOut)]),
    ]),
  ]);
}

const seeAllCard = (slug: string, title: string): HTMLLIElement =>
  el('li', { class: 'card card--all' }, [
    el('a', { class: 'offer-all', href: catalogUrl(slug), 'data-route': true }, [
      el('span', { class: 'offer-all__circle' }, [icon('arrow-right', 'icon--mirror')]),
      el('span', { class: 'offer-all__text' }, ['مشاهده همه', el('span', { class: 'sr-only', text: ` ${title}` })]),
    ]),
  ]);

const arrowButton = (direction: number, label: string, extraClass: string): HTMLButtonElement =>
  el('button', {
    class: `${extraClass} ${direction < 0 ? 'arr--start' : 'arr--end'}`,
    type: 'button',
    'data-dir': direction,
    'aria-label': label,
  }, [icon('arrow-right')]);


// ===== Carousel Behaviour =====
const carouselScroller = (section: Element | null): HTMLElement | null =>
  section ? $<HTMLElement>('.offers__scroller, .rail', section) : null;

const carouselUpdaters = new WeakMap<HTMLElement, () => void>();

const carouselObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  for (const { target } of entries) {
    if (target instanceof HTMLElement) carouselUpdaters.get(target)?.();
  }
});

function initCarousel(section: HTMLElement): void {
  const scroller = carouselScroller(section);
  if (!scroller) return;
  const buttons = [...section.querySelectorAll<HTMLButtonElement>('button[data-dir]')];

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

  carouselUpdaters.set(scroller, update);
  carouselObserver.observe(scroller);
  update();
}

function scrollCarousel(section: HTMLElement | null, direction: number): void {
  const scroller = carouselScroller(section);
  if (!scroller) return;
  const card = $<HTMLElement>('.card', scroller);
  const cardParent = card?.parentElement;
  if (!card || !cardParent) return;
  const gap = parseFloat(getComputedStyle(cardParent).columnGap) || 12;
  const step = card.getBoundingClientRect().width + gap;
  const rtl = getComputedStyle(scroller).direction === 'rtl';
  scroller.scrollBy({ left: direction * (rtl ? -1 : 1) * step }); 
}


// ===== Header =====
function renderNotice(): void {
  const text = stripEmoji(model.shop.notice);
  dom.notice.replaceChildren(...(text ? [icon('truck', 'icon--mirror'), el('span', { text })] : []));
}

function renderNav(): void {
  const megaLinks = model.categories.map((category) =>
    el('li', {}, [el('a', { href: `#${category.slug}` }, [categoryImage(category, 'cat__icon cat__icon--menu'), category.name])]));

  const menu = (Array.isArray(model.shop.menu) ? model.shop.menu : []).map((item) =>
    el('li', {}, [el('a', { href: safeHref(item.href), text: stripEmoji(item.label) })]));

  dom.navList.replaceChildren(
    el('li', { class: 'mega' }, [
      el('a', { href: '#categories' }, [icon('menu'), ' همه دسته‌ها']),
      el('ul', { class: 'mega-panel' }, megaLinks),
    ]),
    ...menu,
  );
  dom.search.placeholder = `جستجو در میان ${formatNumber(model.products.length)} کالا…`;
}


// ===== Hero =====
function heroTag(): ProductItem | null {
  let best = null;
  for (const item of model.offerItems) {
    if (item.percent && !item.soldOut && item.art && HERO_NAMES.has(item.art) && (!best || item.percent > best.percent)) best = item;
  }
  return best;
}

function renderHero(): HTMLElement {
  const { hero, side } = model.home;
  const offersDef = model.carousels.find((carousel) => carousel.source === 'offers');
  const tag = heroTag();

  const stage = el('div', { class: 'hero__stage' }, [
    el('span', { class: 'hero__disc', 'aria-hidden': 'true' }),
    ...HERO_ART.map(([name, alt, width, height]) =>
      image(`${IMG}hero/${name}.webp`, { className: `hero__item hero__item--${name}`, alt, width, height, lazy: false, priority: name === 'tomato' })),
    tag && el('a', { class: 'hero__tag', href: offersDef ? `#${offersDef.id}` : '#categories' }, [
      el('span', { class: 'hero__tag-name', text: `${tag.product.name}، ${tag.product.unit}` }),
      el('span', { class: 'hero__tag-row' }, [
        el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(tag.oldPrice)]),
        el('strong', { text: formatPrice(tag.price) }),
        el('span', { class: 'hero__tag-off' }, [`${formatNumber(tag.percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]),
      ]),
    ]),
  ]);

  const feature = el('div', { class: 'hero__feature' }, [
    el('div', { class: 'hero__copy' }, [
      el('h1', { class: 'hero__title' }, [
        el('span', { class: 'hero__brand', text: `${BRAND.name}،` }),
        el('span', { class: 'hero__headline', text: stripEmoji(hero.title) }),
      ]),
      el('p', { class: 'hero__lead', text: stripEmoji(hero.text) }),
      el('div', { class: 'hero__actions' }, [
        hero.cta && el('a', { class: 'btn', href: safeHref(hero.cta.href), text: stripEmoji(hero.cta.label) }),
        offersDef && el('a', { class: 'btn btn--outline', href: `#${offersDef.id}`, text: stripEmoji(offersDef.title) }),
      ]),
    ]),
    stage,
  ]);

  const [sideFile, , sideWidth, sideHeight] = findBannerArt(`${side.title} ${side.text}`);
  const promo = el('div', { class: 'hero__promo' }, [
    el('div', { class: 'hero__promo-copy' }, [
      el('h2', { class: 'hero__promo-title', text: stripEmoji(side.title) }),
      el('p', { class: 'hero__promo-note', text: stripEmoji(side.text) }),
      side.cta && el('a', { class: 'btn btn--green', href: safeHref(side.cta.href), text: stripEmoji(side.cta.label) }),
    ]),
    image(`${IMG}${sideFile}`, { className: 'hero__promo-art', width: sideWidth, height: sideHeight, lazy: false }),
  ]);

  return el('section', { class: 'hero', 'aria-label': 'پیشنهاد اصلی' }, [feature, promo]);
}


// ===== Categories Grid =====
function renderCategories(): HTMLElement {
  const tiles = model.categories.map((category) => {
    const color = safeColor(category.color);
    const iconBox = el('span', { class: 'cat__icon-wrap' }, [categoryImage(category, 'cat__icon', false) ?? icon('bag')]);
    if (color) iconBox.style.setProperty('--cat-bg', color); 
    return el('li', {}, [el('a', { class: 'cat', href: `#${category.slug}` }, [iconBox, category.name])]);
  });

  return el('section', { id: 'categories', 'aria-labelledby': 'categories-t' }, [
    el('div', { class: 'sec-head' }, [el('h2', { id: 'categories-t', text: 'دسته‌بندی‌ها' })]),
    el('ul', { class: 'cats' }, tiles),
  ]);
}


// ===== Carousels =====
function offersCarousel(def: ShopModel['carousels'][number]): HTMLElement {
  const title = stripEmoji(def.title);
  const words = title.split(' ').flatMap((word, index) => (index ? [' ', el('span', { text: word })] : [el('span', { text: word })]));
  const [artFile, , artWidth, artHeight] = FALLBACK_BANNER;

  const intro = el('div', { class: 'offers__intro' }, [
    el('h2', { class: 'offers__title', id: `${def.id}-t` }, words),
    image(`${IMG}${artFile}`, { className: 'offers__art', width: artWidth, height: artHeight }),
    el('a', { class: 'offers__all', href: catalogUrl(OFFERS_VIEW), 'data-route': true }, ['مشاهده همه ', icon('chevron-right', 'icon--mirror')]),
  ]);

  const list = el('ul', { class: 'offers__list' }, [...model.offerItems.map(productCard), seeAllCard(OFFERS_VIEW, title)]);

  return el('section', { class: 'shelf offers', id: def.id, 'aria-labelledby': `${def.id}-t` }, [
    el('div', { class: 'offers__box' }, [
      el('div', { class: 'offers__scroller' }, [intro, list]),
      arrowButton(-1, `محصولات قبلی «${title}»`, 'offers__nav offers__nav--prev'),
      arrowButton(1, `محصولات بعدی «${title}»`, 'offers__nav offers__nav--next'),
    ]),
  ]);
}

function categoryCarousel(id: string, category: Category, title: string): HTMLElement {
  return el('section', { class: 'shelf', id, 'aria-labelledby': `${id}-t` }, [
    el('div', { class: 'sec-head' }, [
      el('h2', { id: `${id}-t` }, [categoryImage(category, 'cat__icon cat__icon--head', false), title]),
      el('div', { class: 'arrows' }, [
        arrowButton(-1, `محصولات قبلی «${title}»`, 'arr'),
        arrowButton(1, `محصولات بعدی «${title}»`, 'arr'),
      ]),
    ]),
    el('ul', { class: 'rail' }, [...(model.itemsByCategory.get(category.id) ?? []).map(productCard), seeAllCard(category.slug, title)]),
  ]);
}


function renderCarousels(): HTMLElement[] {
  const sections: HTMLElement[] = [];
  const usedIds = new Set<string>(['categories', 'contact', 'top', 'main']);
  const coveredCategories = new Set<number>();

  for (const def of model.carousels) {
    if (!def || !def.id || usedIds.has(def.id)) continue;
    if (def.source === 'offers') {
      sections.push(offersCarousel(def));
      usedIds.add(def.id);
    } else if (typeof def.categoryId === 'number') {
      const category = model.categoryById.get(def.categoryId);
      if (!category) continue;
      sections.push(categoryCarousel(def.id, category, stripEmoji(def.title) || category.name));
      coveredCategories.add(category.id);
      usedIds.add(def.id);
    }
  }

  if (SHOW_REMAINING_CATEGORIES) {
    for (const category of model.categories) {
      if (!coveredCategories.has(category.id) && !usedIds.has(category.slug)) {
        sections.push(categoryCarousel(category.slug, category, category.name));
      }
    }
  }
  return sections;
}

function renderPromos(): HTMLElement | null {
  const promos = Array.isArray(model.home.promos) ? model.home.promos : [];
  if (!promos.length) return null;
  const links = promos.map((promo) => {
    const text = stripEmoji(promo.text);
    const [file, , width, height] = findBannerArt(text);
    return el('a', { class: 'banner', href: safeHref(promo.href) }, [text, image(`${IMG}${file}`, { width, height })]);
  });
  return el('section', { class: 'banners', 'aria-label': 'پیشنهادهای تبلیغاتی' }, links);
}


// ===== Footer =====
function renderFooterBrand(): void {
  const { footer } = dom;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`;
  const contactLink = (href: string, iconName: string, label: string, text: string): HTMLAnchorElement =>
    el('a', { href }, [
      icon(iconName), ' ',
      el('span', { class: 'sr-only', text: label }),
      el('bdi', { dir: 'ltr', text }),
    ]);

  footer.contact.replaceChildren(
    el('a', { href: mapsUrl, target: '_blank', rel: 'noopener noreferrer' }, [
      icon('pin'),
      ` ${BRAND.address}`,
      el('span', { class: 'sr-only', text: ' (نمایش در گوگل مپ، در تب جدید باز می‌شود)' }),
    ]),
    ...BRAND.phones.map((phone) => contactLink(`tel:${phone.tel}`, phone.icon, `${phone.label}: `, phone.text)),
    contactLink(`mailto:${BRAND.email}`, 'mail', 'ایمیل: ', BRAND.email),
  );

  footer.social.replaceChildren(...BRAND.social.map((net) =>
    el('li', {}, [el('a', { href: net.href }, [icon(net.icon), ` ${net.label}`])])));

  footer.copy.textContent = BRAND.copyright;
}

function renderFooterData(): void {
  const { footer } = dom;
  const { shop } = model;

  footer.about.textContent = stripEmoji(shop.about);

  footer.cats.replaceChildren(...model.categories.map((category) =>
    el('li', {}, [el('a', { href: `#${category.slug}`, text: category.name })])));

  footer.help.replaceChildren(...(Array.isArray(shop.help) ? shop.help : []).map((item) => {
    const label = stripEmoji(item.label);
    return el('li', {}, [item.href && item.href !== '#' ? el('a', { href: safeHref(item.href), text: label }) : label]);
  }));

  footer.hours.replaceChildren(...(Array.isArray(shop.schedule) ? shop.schedule : []).map((row) =>
    el('li', { text: `${row.days}: ${row.time}` })));
}


// ===== Views =====
function renderHome(): { title: null; nodes: HTMLElement[] } {
  const sections = renderCarousels();
  const promos = renderPromos();
  if (promos) sections.splice(1, 0, promos);
  return { title: null, nodes: [renderHero(), renderCategories(), ...sections] };
}

const backBar = (): HTMLElement =>
  el('div', { class: 'back-bar' }, [
    el('a', { class: 'back-btn', href: location.pathname, 'data-back': true }, [icon('arrow-right'), 'بازگشت به صفحه اصلی']),
  ]);

const resultsSection = (title: HTMLElement, items: readonly ProductItem[], content: HTMLElement[]): HTMLElement =>
  el('section', { class: 'catalog', 'aria-labelledby': 'catalog-t' }, [
    el('div', { class: 'sec-head' }, [title, el('p', { class: 'catalog__count', text: `${formatNumber(items.length)} کالا` })]),
    ...content,
  ]);

function renderCatalog(slug: string): { title: string; nodes: HTMLElement[] } {
  let title: string;
  let items: ProductItem[];
  let category: Category | null = null;

  if (slug === OFFERS_VIEW) {
    const def = model.carousels.find((carousel) => carousel.source === 'offers');
    title = (def && stripEmoji(def.title)) || 'پیشنهاد ویژه';
    items = model.offerItems;
  } else if (model.categoryBySlug.has(slug)) {
    const foundCategory = model.categoryBySlug.get(slug);
    if (!foundCategory) return { title: 'دسته پیدا نشد', nodes: [notFound()] };
    category = foundCategory;
    title = foundCategory.name;
    items = model.itemsByCategory.get(foundCategory.id) ?? [];
  } else {
    return { title: 'دسته پیدا نشد', nodes: [notFound()] };
  }

  const heading = el('h1', { id: 'catalog-t', class: 'catalog__title' }, [
    category && categoryImage(category, 'cat__icon cat__icon--head', false),
    title,
  ]);
  const content = items.length
    ? [el('ul', { class: 'grid' }, items.map(productCard))]
    : [el('p', { class: 'state', text: 'فعلاً کالایی در این بخش نداریم.' })];

  return { title, nodes: [backBar(), resultsSection(heading, items, content)] };
}

function renderSearch(query: string): { title: string; nodes: HTMLElement[] } {
  const items = searchProducts(query);
  const heading = el('h1', { id: 'catalog-t', class: 'catalog__title', text: `نتایج جستجو برای «${query}»` });
  const content = items.length
    ? [el('h2', { class: 'sr-only', text: 'فهرست کالاها' }), el('ul', { class: 'grid' }, items.map(productCard))]
    : [el('div', { class: 'state state--empty', role: 'status' }, [
        el('p', { class: 'state__text', text: 'کالایی با این عبارت پیدا نشد. عبارت دیگری را امتحان کنید.' }),
        el('button', { class: 'btn btn--outline', type: 'button', 'data-clear-search': true, text: 'پاک کردن جستجو' }),
      ])];

  return { title: `جستجو: ${query}`, nodes: [resultsSection(heading, items, content)] };
}

function notFound(): HTMLElement {
  return el('section', { class: 'state', 'aria-labelledby': 'nf-t' }, [
    el('h1', { id: 'nf-t', class: 'state__title', text: 'این دسته را پیدا نکردیم' }),
    el('p', { text: 'آدرسی که باز کردید دسته‌ای با این نام ندارد.' }),
    el('a', { class: 'btn btn--green', href: location.pathname, 'data-route': true, text: 'بازگشت به صفحه اصلی' }),
  ]);
}


// ===== Loading Skeleton & Error State =====
const skeletonCard = (): HTMLElement =>
  el('li', { class: 'card card--skeleton' }, [
    el('div', { class: 'card__body' }, [
      el('div', { class: 'pic skeleton' }),
      el('span', { class: 'skeleton skeleton--line' }),
      el('span', { class: 'skeleton skeleton--line skeleton--short' }),
    ]),
  ]);

function renderLoading(): void {
  dom.main.setAttribute('aria-busy', 'true');
  dom.main.replaceChildren(
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

function showSlowNotice(): void {
  const text = $<HTMLElement>('#loading-text');
  if (!text) return;
  text.textContent = 'اتصال کند است؛ هنوز در حال دریافت اطلاعات هستیم…';
  text.classList.add('state-text--slow');
  announce('اتصال کند است؛ هنوز در حال دریافت اطلاعات هستیم.');
}

function renderError(error: ApiError): void {
  const known = error instanceof ApiError;
  const detail = known && error.file
    ? el('p', { class: 'state__detail' }, [el('bdi', { dir: 'ltr', text: error.file }), error.status ? ` · ${toFaDigits(error.status)}` : null])
    : null;

  dom.main.removeAttribute('aria-busy');
  dom.main.replaceChildren(
    el('section', { class: 'state state--error', role: 'alert' }, [
      icon('alert', 'state__icon'),
      el('h2', { class: 'state__title', text: 'بارگذاری محصولات ممکن نشد' }),
      el('p', { text: ERROR_TEXT[known ? error.kind : 'network'] ?? ERROR_TEXT.network }),
      detail,
      el('button', { class: 'btn btn--green', type: 'button', 'data-action': 'retry' }, [icon('refresh'), ' تلاش دوباره']),
    ]),
  );
}


// ===== Cart Summary =====
const cartIsOpen = (): boolean => dom.cartWrap.classList.contains('is-open');

function openCart({ pin = false }: { pin?: boolean } = {}): void {
  clearTimeout(ui.cartCloseTimer);
  if (pin) ui.cartPinned = true;
  if (cartIsOpen()) return;
  renderMiniCart();
  dom.cartWrap.style.setProperty('--cart-top', `${Math.round(dom.cartButton.getBoundingClientRect().bottom + 8)}px`);
  dom.cartWrap.classList.add('is-open');
  dom.cartButton.setAttribute('aria-expanded', 'true');
}

function closeCart({ returnFocus = false }: { returnFocus?: boolean } = {}): void {
  clearTimeout(ui.cartCloseTimer);
  ui.cartPinned = false;
  if (!cartIsOpen()) return;
  dom.cartWrap.classList.remove('is-open');
  dom.cartButton.setAttribute('aria-expanded', 'false');
  if (returnFocus) dom.cartButton.focus();
}

const priceText = (value: number): HTMLElement =>
  el('span', { class: 'mini-price' }, [el('strong', { text: formatNumber(value) }), el('small', { text: 'تومان' })]);

function discountLine(oldValue: number, newValue: number, percent = Math.round(((oldValue - newValue) / oldValue) * 100)): HTMLElement | null {
  if (oldValue <= newValue) return null;
  return el('div', { class: 'mini-old' }, [
    percent > 0 && el('span', { class: 'badge badge--sm' }, [`${formatNumber(percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]),
    el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(oldValue)]),
  ]);
}

function miniItem(row: ProductItem & { quantity: number; oldPrice: number }): HTMLLIElement {
  const { product, art, quantity } = row;
  const box = stepper(product);
  updateStepper(box, row, quantity);

  return el('li', { class: 'mini-item', 'data-id': product.id }, [
    el('div', { class: 'mini-item__pic' }, [art ? image(`${IMG}products/${art}.webp`, { width: 600, height: 600 }) : placeholderPic()]),
    el('div', { class: 'mini-item__body' }, [
      el('h3', { class: 'mini-item__name', text: product.name }),
      el('div', { class: 'mini-item__row' }, [
        box,
        el('div', { class: 'mini-item__price' }, [
          discountLine(row.oldPrice * quantity, row.price * quantity, row.percent),
          priceText(row.price * quantity),
        ]),
      ]),
    ]),
  ]);
}

function renderMiniCart(): void {
  const title = el('h2', { class: 'mini__title', text: 'خلاصه سبد خرید شما' });
  const count = cartCount();

  if (!modelReady || count === 0) {
    dom.cartPanel.replaceChildren(el('div', { class: 'mini mini--empty' }, [
      title,
      icon('cart', 'mini__empty-icon'),
      el('p', { text: modelReady ? 'سبد خرید شما خالی است.' : 'تا بارگذاری محصولات، جزئیات سبد را نمی‌توان نشان داد.' }),
    ]));
    return;
  }

  let total = 0;
  let oldTotal = 0;
  const rows = Object.keys(cart)
    .map(Number)
    .sort((a, b) => a - b)
    .map((id) => model.items.get(id))
    .filter((item): item is ProductItem => item !== undefined)
    .map((item) => {
      const quantity = qtyOf(item.product.id);
      const oldPrice = item.oldPrice || item.price;
      total += item.price * quantity;
      oldTotal += oldPrice * quantity;
      return { ...item, quantity, oldPrice };
    });

  dom.cartPanel.replaceChildren(el('div', { class: 'mini' }, [
    el('div', { class: 'mini__head' }, [title, el('span', { class: 'mini__count', text: `${formatNumber(count)} کالا` })]),
    el('ul', { class: 'mini__list' }, rows.map(miniItem)),
    el('p', { class: 'mini__note', id: 'mini-note', text: 'ثبت سفارش در این مرحله از پروژه فعال نیست.' }),
    el('div', { class: 'mini__foot' }, [
      el('div', { class: 'mini__total' }, [discountLine(oldTotal, total), priceText(total)]),
      el('button', { class: 'checkout', type: 'button', 'data-action': 'checkout', 'aria-disabled': 'true', 'aria-describedby': 'mini-note', text: 'ثبت سفارش' }),
    ]),
  ]));
}


function refreshMiniCart(): void {
  if (!cartIsOpen()) return;
  const { cartPanel } = dom;
  const active = document.activeElement;
  const inPanel = active instanceof HTMLElement && cartPanel.contains(active);
  const row = inPanel && active instanceof HTMLElement ? active.closest<HTMLElement>('.mini-item') : null;
  const id = row?.dataset.id ?? null;
  const step = inPanel && active instanceof HTMLElement ? active.dataset.step ?? null : null;
  const scrollTop = $<HTMLUListElement>('.mini__list', cartPanel)?.scrollTop ?? 0;

  renderMiniCart();

  const list = $<HTMLUListElement>('ul.mini__list', cartPanel);
  if (list) list.scrollTop = scrollTop;
  if (!inPanel) return;
  const same = id && $<HTMLElement>(`.mini-item[data-id="${id}"] [data-step="${step}"]`, cartPanel);
  (same || $<HTMLElement>('.mini-item [data-step="dec"]', cartPanel) || cartPanel).focus({ preventScroll: true });
}


// ===== Motion & URL & History =====
const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);

function smoothScrollTo(top: number): Promise<void> {
  cancelAnimationFrame(ui.scrollFrame);
  const from = window.scrollY;
  const to = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
  const distance = to - from;

  if (reducedMotion.matches || Math.abs(distance) < 2) {
    window.scrollTo({ top: to, behavior: 'instant' });
    return Promise.resolve();
  }

  const duration = Math.min(1000, Math.max(500, Math.abs(distance) * 0.4));
  const stopEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'];

  return new Promise<void>((resolve) => {
    const stop = () => {
      cancelAnimationFrame(ui.scrollFrame);
      stopEvents.forEach((name) => window.removeEventListener(name, stop));
      resolve();
    };
    stopEvents.forEach((name) => window.addEventListener(name, stop, { passive: true, once: true }));

    const startTime = performance.now();
    const step: FrameRequestCallback = (now: number): void => {
      const progress = Math.min(1, (now - startTime) / duration);
      window.scrollTo({ top: from + distance * easeInOutCubic(progress), behavior: 'instant' });
      if (progress < 1) ui.scrollFrame = requestAnimationFrame(step);
      else stop();
    };
    ui.scrollFrame = requestAnimationFrame(step);
  });
}

function scrollToElement(target: HTMLElement): Promise<void> {
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - margin;
  return smoothScrollTo(top).then(() => {
    if (!target.hasAttribute('tabindex') && !/^(a|button|input)$/i.test(target.tagName)) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}

const ENTER_FRAMES = [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }];
const ENTER_TIMING = { duration: 320, easing: 'cubic-bezier(.2, .7, .2, 1)' };

function playEnter(): void {
  if (!reducedMotion.matches) dom.main.animate(ENTER_FRAMES, ENTER_TIMING);
}

async function swapView(update: () => void): Promise<void> {
  if (reducedMotion.matches) {
    update();
    return;
  }
  const out = dom.main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, easing: 'ease-in', fill: 'forwards' });
  try { await out.finished; } catch { /* Cancelled: Carry On */ }
  update();
  out.cancel();
  playEnter();
}

// ===== Routes =====
type Route = { type: 'home' } | { type: 'catalog'; slug: string } | { type: 'search'; query: string };

function parseRoute(): Route {
  const params = new URLSearchParams(location.search);
  const slug = params.get('cat');
  const query = (params.get('q') || '').trim();
  if (slug) return { type: 'catalog', slug };
  if (query) return { type: 'search', query };
  return { type: 'home' };
}

function currentHashId(): string {
  try {
    return decodeURIComponent(location.hash.slice(1));
  } catch {
    return '';
  }
}


function syncLocation({ scroll = false, smooth = false }: { scroll?: boolean; smooth?: boolean } = {}): void {
  const id = currentHashId();
  const target = id ? document.getElementById(id) : null;

  dom.main.querySelectorAll<HTMLElement>('[data-here]').forEach((node) => node.removeAttribute('data-here'));
  if (target && target.matches('.shelf, #categories')) target.setAttribute('data-here', '');

  document.querySelectorAll<HTMLAnchorElement>('.main-nav a').forEach((link) => {
    if (id && link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  if (!scroll || !target) return;
  if (smooth) scrollToElement(target);
  else target.scrollIntoView({ block: 'start', behavior: 'instant' });
}


function syncSearchBox(route: Route): void {
  const shown = route.type === 'search' ? route.query : ui.pendingQuery ? dom.search.value.trim() : '';
  if (dom.search.value.trim().replace(/\s+/g, ' ') !== shown) dom.search.value = shown;
}

function renderRoute({ focus = false, smooth = false }: { focus?: boolean; smooth?: boolean } = {}): void {
  if (!modelReady) return;
  const route = parseRoute();
  ui.renderedSearch = location.search;
  syncSearchBox(route);

  const view = route.type === 'catalog' ? renderCatalog(route.slug) : route.type === 'search' ? renderSearch(route.query) : renderHome();
  document.title = view.title ? `${view.title} | ${BRAND.name}` : BRAND.name;

  carouselObserver.disconnect(); 
  dom.main.replaceChildren(...view.nodes);
  dom.main.removeAttribute('aria-busy');
  dom.main.querySelectorAll<HTMLElement>('.shelf').forEach(initCarousel);
  syncCartControls();
  syncLocation({ scroll: true, smooth });
  if (focus && !currentHashId()) dom.main.focus({ preventScroll: true });
}


function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function rememberScroll(): void {
  const previousState: unknown = history.state;
  const state = isRecord(previousState) ? previousState : {};
  history.replaceState({ ...state, scrollY: window.scrollY }, '');
}


async function navigate(url: string, { replace = false, focus = true, animate = true }: { replace?: boolean; focus?: boolean; animate?: boolean } = {}): Promise<void> {
  if (replace) {
    history.replaceState({ app: true }, '', url);
  } else {
    rememberScroll();
    history.pushState({ app: true }, '', url); 
  }
  closeCart();
  const show = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    renderRoute({ focus, smooth: true });
  };
  if (animate) {
    await swapView(show);
  } else {
    show();
    playEnter();
  }
}

function goBack(): void {
  const state: unknown = history.state;
  if (isRecord(state) && state.app === true) history.back();
  else navigate(location.pathname, { replace: true }); 
}

function goToSection(href: string, target: HTMLElement): void {
  closeCart();
  if (location.hash !== href) history.pushState(null, '', href);
  syncLocation();
  scrollToElement(target);
}


// ===== Search Box & Events =====
function announceResults(text: string): void {
  announce(`${formatNumber(searchProducts(text).length)} نتیجه برای ${text}`);
}

function showSearch(query: string): void {
  if (!modelReady) {
    ui.pendingQuery = query; 
    return;
  }
  const text = query.trim().replace(/\s+/g, ' ');
  const route = parseRoute();

  if (!text) {
    if (route.type !== 'search') return;
    const state: unknown = history.state;
  if (isRecord(state) && state.app === true) history.back(); 
    else navigate(location.pathname, { replace: true, focus: false, animate: false });
    return;
  }

  const url = `${location.pathname}?q=${encodeURIComponent(text)}`;
  if (route.type === 'search') {
    history.replaceState(history.state, '', url);
    renderRoute();
  } else {
    closeCart();
    navigate(url, { focus: false, animate: false }); 
  }
  announceResults(text);
}

function clearSearch(): void {
  dom.search.value = '';
  clearTimeout(ui.searchTimer);
  showSearch('');
}

dom.search.addEventListener('input', (): void => {
  clearTimeout(ui.searchTimer);
  ui.searchTimer = setTimeout(() => showSearch(dom.search.value), SEARCH_DELAY_MS);
});

dom.search.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    clearTimeout(ui.searchTimer);
    showSearch(dom.search.value);
    if (coarsePointer.matches) dom.search.blur(); 
  } else if (event.key === 'Escape' && dom.search.value) {
    event.stopPropagation();
    clearSearch();
  }
});


// ===== Clicks =====
const onAddClick = (button: HTMLElement): void => {
  if (!(button instanceof HTMLButtonElement) || button.disabled) return;
  const id = Number(button.dataset.id);
  if (!Number.isSafeInteger(id)) return;
  setQty(id, qtyOf(id) + 1, 'add-button');
};

const onStepClick = (button: HTMLElement): void => {
  const stepper = button.closest<HTMLElement>('.stepper');
  if (!stepper) return;
  const id = Number(stepper.dataset.id);
  if (!Number.isSafeInteger(id)) return;
  setQty(id, qtyOf(id) + (button.dataset.step === 'inc' ? 1 : -1));
};

function onCheckoutClick(): void {
  announce('ثبت سفارش در این مرحله از پروژه فعال نیست.');
  const note = required<HTMLElement>('#mini-note', dom.cartPanel);
  note.classList.remove('is-flash');
  void note.offsetWidth; 
  note.classList.add('is-flash');
}

function onCartButtonClick(): void {
  if (!cartIsOpen() || !ui.cartPinned) openCart({ pin: true });
  else closeCart();
}


function onLinkClick(node: HTMLElement, event: MouseEvent): void {
  if (!(node instanceof HTMLAnchorElement)) return;
  const link = node;
  if (link.closest('.main-nav')) dom.menuToggle.checked = false; 

  const plainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  if (!plainClick || link.target === '_blank') return;

  const href = link.getAttribute('href');
  if (!href) return;
  if (link.hasAttribute('data-back')) {
    event.preventDefault();
    goBack();
  } else if (link.hasAttribute('data-route')) {
    event.preventDefault();
    navigate(href);
  } else if (href.startsWith('#') && href.length > 1 && !link.classList.contains('skip')) {
    const section = document.getElementById(decodeURIComponent(href.slice(1)));
    if (section) {
      event.preventDefault();
      goToSection(href, section);
    } else if (parseRoute().type !== 'home') {
      event.preventDefault();
      navigate(location.pathname + href);
    }
  }
}


const CART_RULES: ClickRule[] = [
  ['.add', onAddClick],
  ['[data-step]', onStepClick],
  ['[data-action="checkout"]', onCheckoutClick],
  ['#cart-btn', onCartButtonClick],
];
const PAGE_RULES: ClickRule[] = [
  ['button[data-dir]', (arrow) => scrollCarousel(arrow.closest<HTMLElement>('.shelf'), Number(arrow.dataset.dir))],
  ['[data-clear-search]', () => { clearSearch(); dom.search.focus(); }],
  ['[data-action="retry"]', () => start()],
  ['a[href]', onLinkClick],
];

type ClickHandler = (node: HTMLElement, event: MouseEvent) => void;
type ClickRule = readonly [selector: string, handler: ClickHandler];

function matchRule(rules: readonly ClickRule[], target: Element, event: MouseEvent): boolean {
  for (const [selector, handler] of rules) {
    const node = target.closest<HTMLElement>(selector);
    if (node) {
      handler(node, event);
      return true;
    }
  }
  return false;
}

document.addEventListener('click', (event: MouseEvent) => {
  const { target } = event;
  if (!(target instanceof Element) || matchRule(CART_RULES, target, event)) return;
  if (cartIsOpen() && !target.closest('#cart-wrap')) closeCart(); // a click anywhere else closes the summary
  matchRule(PAGE_RULES, target, event);
});


dom.cartWrap.addEventListener('pointerenter', (event: PointerEvent) => {
  if (event.pointerType === 'mouse') openCart();
});
dom.cartWrap.addEventListener('pointerleave', (event: PointerEvent) => {
  if (event.pointerType !== 'mouse' || ui.cartPinned) return;
  ui.cartCloseTimer = setTimeout(closeCart, 220);
});
dom.cartWrap.addEventListener('focusout', (event: FocusEvent) => {
  const next = event.relatedTarget;
  if (cartIsOpen() && next instanceof Node && !dom.cartWrap.contains(next)) closeCart();
});

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return;
  if (cartIsOpen()) {
    closeCart({ returnFocus: dom.cartWrap.contains(document.activeElement) });
  } else if (dom.menuToggle.checked) {
    dom.menuToggle.checked = false;
    dom.menuToggle.focus();
  }
});

window.addEventListener('popstate', (event: PopStateEvent) => {
  closeCart();
  if (location.search === ui.renderedSearch) {
    syncLocation(); 
    return;
  }
  const state: unknown = event.state;
  const saved = isRecord(state) ? state.scrollY : undefined;
  swapView(() => {
    renderRoute();
    if (typeof saved === 'number') window.scrollTo({ top: saved, behavior: 'instant' });
    else if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  });
});
window.addEventListener('hashchange', () => syncLocation());


window.addEventListener('storage', (event: StorageEvent) => {
  if (event.key !== CART_KEY) return;
  cart = loadCart();
  renderCartBadge();
  if (modelReady) syncAllControls();
  refreshMiniCart();
});


// ===== Start-Up =====
async function start(): Promise<void> {
  renderLoading();
  try {
    model = buildModel(await loadWithSlowNotice(showSlowNotice));
    modelReady = true;
    renderNotice();
    renderNav();
    renderFooterData();
    reconcileCart();
    renderRoute();
    playEnter();
    if (ui.pendingQuery && parseRoute().type === 'home') showSearch(ui.pendingQuery);
    ui.pendingQuery = '';
  } catch (error) {
    model = createEmptyModel();
    modelReady = false;
    renderError(error instanceof ApiError ? error : new ApiError('shape', 'api'));
    announce('بارگذاری محصولات ممکن نشد.');
  }
}

renderFooterBrand(); 
renderCartBadge(); 
syncLocation();
start();