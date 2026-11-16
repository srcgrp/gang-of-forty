
   'use strict';

   const API = '../../api';
   
   
   const faNum = new Intl.NumberFormat('fa-IR');
   const toman = (n) => `${faNum.format(n)} تومان`;
   
   function el(tag, className, text) {
     const node = document.createElement(tag);
     if (className) node.className = className;
     if (text != null) node.textContent = text;
     return node;
   }
   
   async function fetchJSON(name) {
     const res = await fetch(`${API}/${name}`, { cache: 'no-store' });
     if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
     return res.json();
   }
   
   
   function showLoading(container, message = 'در حال بارگذاری...') {
     container.replaceChildren();
     container.setAttribute('aria-busy', 'true');
   
     const li = el('li', 'carousel-state');
     li.append(el('span', 'spinner'));
     li.append(el('span', null, message));
     container.append(li);
   }
   
   function showError(container, message) {
     container.replaceChildren();
     container.setAttribute('aria-busy', 'false');
   
     const li = el('li', 'carousel-state carousel-error');
     li.append(el('span', null, `⚠️ ${message}`));
     container.append(li);
   }
   
   
   function createProductCard(product) {
     const card = el('article', 'product-card');
     card.id = `p-${product.id}`;
   
     if (product.offer && product.offer.percent) {
       const pct = faNum.format(product.offer.percent);
       const label = product.offer.label ? ` — ${product.offer.label}` : '';
       const badge = el('span', 'discount', `${pct}٪`);
       badge.setAttribute('aria-label', `${pct} درصد تخفیف${label}`);
       badge.title = label.trim();
       card.append(badge);
     }
   
     const img = el('div', 'product-img');
     const emoji = el('span', null, product.emoji || '🛒');
     emoji.setAttribute('aria-hidden', 'true');
     img.append(emoji);
     card.append(img);
   
     card.append(el('h3', null, product.name || 'بدون نام'));
     card.append(el('p', 'product-meta', product.unit || ''));
   
     const foot = el('div', 'product-foot');
     const priceWrap = el('span', 'price');
   
     if (product.offer && product.offer.percent) {
       const original = Math.round(product.price / (1 - product.offer.percent / 100));
       priceWrap.append(el('del', null, faNum.format(original)));
       priceWrap.append(document.createTextNode(' '));
     }
     priceWrap.append(document.createTextNode(toman(product.price)));
     foot.append(priceWrap);
   
     const inStock = product.stock > 0;
     const btn = el('button', 'add-btn', inStock ? '+' : '✕');
     btn.type = 'button';
     btn.setAttribute(
       'aria-label',
       inStock
         ? `افزودن ${product.name} به سبد`
         : `${product.name} ناموجود است`
     );
   
     if (!inStock) {
       btn.disabled = true;
       card.classList.add('out-of-stock');
       const outBadge = el('span', 'out-badge', 'ناموجود');
       card.append(outBadge);
     }
   
     foot.append(btn);
     card.append(foot);
   
     return card;
   }
   
   
   function renderCarousel(listEl, products) {
     listEl.replaceChildren();
     listEl.setAttribute('aria-busy', 'false');
   
     if (!products.length) {
       listEl.append(el('li', 'carousel-state', 'محصولی برای نمایش نیست.'));
       return;
     }
   
     const frag = document.createDocumentFragment();
     for (const p of products) {
       const li = document.createElement('li');
       li.append(createProductCard(p));
       frag.append(li);
     }
     listEl.append(frag);
   }
   
   
   function bindCarouselButtons() {
     document.querySelectorAll('.carousel-nav').forEach((nav) => {
       const section = nav.closest('.section');
       const carousel = section?.querySelector('.carousel');
       if (!carousel) return;
   
       const prevBtn = nav.querySelector('[data-carousel="prev"]');
       const nextBtn = nav.querySelector('[data-carousel="next"]');
   
       const step = () => carousel.clientWidth * 0.9;
   
       nextBtn?.addEventListener('click', () => {
         carousel.scrollBy({ left: -step(), behavior: 'smooth' });
       });
       prevBtn?.addEventListener('click', () => {
         carousel.scrollBy({ left: step(), behavior: 'smooth' });
       });
     });
   }
   
   
   function mergeData(products, stock, offers) {
     const stockMap = new Map(
       Object.entries(stock.items || {}).map(([k, v]) => [String(k), Number(v)])
     );
     const offerMap = new Map(
       offers.map((o) => [String(o.productId), o])
     );
   
     return products.map((p) => ({
       ...p,
       stock: stockMap.has(String(p.id)) ? stockMap.get(String(p.id)) : 1,
       offer: offerMap.get(String(p.id)) || null,
     }));
   }
   
   
   async function init() {
     const specialList = document.querySelector('#special .carousel');
     const regularList = document.querySelector('#regular .carousel');
   
     if (!specialList || !regularList) {
       console.warn('app.js: کاروسل‌ها در HTML پیدا نشدند.');
       return;
     }
   
     showLoading(specialList);
     showLoading(regularList);
   
     try {
       const [products, offers, stock] = await Promise.all([
         fetchJSON('products.json'),
         fetchJSON('offers.json'),
         fetchJSON('stock.json'),
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
     } catch (err) {
       console.error(err);
       const msg = 'داده‌ها بارگذاری نشد. اتصال اینترنت را بررسی کنید.';
       showError(specialList, msg);
       showError(regularList, msg);
     }
   }
   
   document.addEventListener('DOMContentLoaded', init);