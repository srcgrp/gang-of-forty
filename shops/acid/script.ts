
   'use strict';

   import confetti from 'canvas-confetti';
   import { Notyf } from 'notyf';
   import 'notyf/notyf.min.css';
   
   
   interface Product {
     id: number;
     categoryId: number;
     name: string;
     emoji: string;
     unit: string;
     price: number;
     tags: string[];
   }
   
   interface Offer {
     productId: number;
     percent: number;
     label: string;
   }
   
   interface Stock {
     updatedAt: string;
     items: Record<string, number>;
   }
   
   interface EnrichedProduct extends Product {
     stock: number;
     offer: Offer | null;
   }
   
   
   const API = '/api'; 
   
   const faNum = new Intl.NumberFormat('fa-IR');
   const toman = (n: number): string => `${faNum.format(n)} تومان`;
   
   const notyf = new Notyf({
     duration: 2500,
     position: { x: 'center', y: 'bottom' }
   });
   
   function el(tag: string, className?: string, text?: string): HTMLElement {
     const node = document.createElement(tag);
     if (className) node.className = className;
     if (text != null) node.textContent = text;
     return node;
   }
   
   async function fetchJSON<T>(name: string): Promise<T> {
     const res = await fetch(`${API}/${name}`, { cache: 'no-store' });
     if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
     return res.json() as Promise<T>;
   }
   
   
   function showLoading(container: HTMLUListElement, message: string = 'در حال بارگذاری...'): void {
     container.replaceChildren();
     container.setAttribute('aria-busy', 'true');
   
     const li = el('li', 'carousel-state') as HTMLLIElement;
     li.append(el('span', 'spinner'));
     li.append(el('span', '', message));
     container.append(li);
   }
   
   function showError(container: HTMLUListElement, message: string): void {
     container.replaceChildren();
     container.setAttribute('aria-busy', 'false');
   
     const li = el('li', 'carousel-state carousel-error') as HTMLLIElement;
     li.append(el('span', '', `⚠️ ${message}`));
     container.append(li);
   }
   
   
   function createProductCard(product: EnrichedProduct): HTMLElement {
     const card = el('article', 'product-card');
     card.id = `p-${product.id}`;
   
     // برچسب تخفیف
     if (product.offer && product.offer.percent) {
       const pct = faNum.format(product.offer.percent);
       const label = product.offer.label ? ` — ${product.offer.label}` : '';
       const badge = el('span', 'discount', `${pct}٪`);
       badge.setAttribute('aria-label', `${pct} درصد تخفیف${label}`);
       badge.title = label.trim();
       card.append(badge);
     }
   
     const img = el('div', 'product-img');
     const emoji = el('span', '', product.emoji || '🛒');
     emoji.setAttribute('aria-hidden', 'true');
     img.append(emoji);
     card.append(img);
   
     card.append(el('h3', '', product.name || 'بدون نام'));
     card.append(el('p', 'product-meta', product.unit || ''));
   
     const foot = el('div', 'product-foot');
     const priceWrap = el('span', 'price');
   
     if (product.offer && product.offer.percent) {
       const original = Math.round(product.price / (1 - product.offer.percent / 100));
       priceWrap.append(el('del', '', faNum.format(original)));
       priceWrap.append(document.createTextNode(' '));
     }
     priceWrap.append(document.createTextNode(toman(product.price)));
     foot.append(priceWrap);
   
     const inStock = product.stock > 0;
     const btn = document.createElement('button') as HTMLButtonElement;
     btn.className = 'add-btn';
     btn.type = 'button';
     btn.textContent = inStock ? '+' : '✕';
     btn.setAttribute(
       'aria-label',
       inStock ? `افزودن ${product.name} به سبد` : `${product.name} ناموجود است`
     );
   
     if (!inStock) {
       btn.disabled = true;
       card.classList.add('out-of-stock');
       const outBadge = el('span', 'out-badge', 'ناموجود');
       card.append(outBadge);
     } else {
       btn.addEventListener('click', () => {
         notyf.success(`«${product.name}» به سبد اضافه شد`);
         
         confetti({
           particleCount: 80,
           spread: 70,
           origin: { y: 0.8 }
         });
       });
     }
   
     foot.append(btn);
     card.append(foot);
   
     return card;
   }
   
   
   function renderCarousel(listEl: HTMLUListElement, products: EnrichedProduct[]): void {
     listEl.replaceChildren();
     listEl.setAttribute('aria-busy', 'false');
   
     if (!products.length) {
       const li = el('li', 'carousel-state', 'محصولی برای نمایش نیست.') as HTMLLIElement;
       listEl.append(li);
       return;
     }
   
     const frag = document.createDocumentFragment();
     for (const p of products) {
       const li = document.createElement('li') as HTMLLIElement;
       li.append(createProductCard(p));
       frag.append(li);
     }
     listEl.append(frag);
   }
   
   
   function bindCarouselButtons(): void {
     document.querySelectorAll('.carousel-nav').forEach((nav) => {
       const section = nav.closest('.section');
       const carousel = section?.querySelector<HTMLUListElement>('.carousel');
       if (!carousel) return;
   
       const prevBtn = nav.querySelector<HTMLButtonElement>('[data-carousel="prev"]');
       const nextBtn = nav.querySelector<HTMLButtonElement>('[data-carousel="next"]');
   
       const step = (): number => carousel.clientWidth * 0.9;
   
       nextBtn?.addEventListener('click', () => {
         carousel.scrollBy({ left: -step(), behavior: 'smooth' });
       });
       prevBtn?.addEventListener('click', () => {
         carousel.scrollBy({ left: step(), behavior: 'smooth' });
       });
     });
   }
   
   
   function mergeData(products: Product[], stock: Stock, offers: Offer[]): EnrichedProduct[] {
     const stockMap = new Map<string, number>(
       Object.entries(stock.items || {}).map(([k, v]) => [String(k), Number(v)])
     );
     const offerMap = new Map<string, Offer>(
       offers.map((o) => [String(o.productId), o])
     );
   
     return products.map((p) => ({
       ...p,
       stock: stockMap.has(String(p.id)) ? stockMap.get(String(p.id))! : 1,
       offer: offerMap.get(String(p.id)) || null,
     }));
   }
   
   
   async function init(): Promise<void> {
     const specialList = document.querySelector<HTMLUListElement>('#special .carousel');
     const regularList = document.querySelector<HTMLUListElement>('#regular .carousel');
   
     if (!specialList || !regularList) {
       console.warn('script.ts: کاروسل‌ها در HTML پیدا نشدند.');
       return;
     }
   
     showLoading(specialList);
     showLoading(regularList);
   
     try {
       const [products, offers, stock] = await Promise.all([
         fetchJSON<Product[]>('products.json'),
         fetchJSON<Offer[]>('offers.json'),
         fetchJSON<Stock>('stock.json'),
       ]);
   
       const enriched = mergeData(products, stock, offers);
   
       renderCarousel(
         specialList,
         enriched.filter((p) => p.offer)
       );
   
       renderCarousel(
         regularList,
         enriched
       );
   
       bindCarouselButtons();
     } catch (err: unknown) {
       console.error(err);
       const msg = 'داده‌ها بارگذاری نشد. اتصال اینترنت را بررسی کنید.';
       showError(specialList, msg);
       showError(regularList, msg);
     }
   }
   
   document.addEventListener('DOMContentLoaded', () => { init(); });