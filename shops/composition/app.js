const API_BASE = '../../api';

// فرمت‌کننده اعداد و قیمت به فارسی
const priceFormatter = new Intl.NumberFormat('fa-IR');

function formatPrice(number) {
    return priceFormatter.format(Math.round(number));
}

// ساخت امن المان‌های DOM
function createEl(tag, className = '', textContent = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent !== '') el.textContent = textContent;
    return el;
}


function createPlusIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '12');
    line1.setAttribute('y1', '5');
    line1.setAttribute('x2', '12');
    line1.setAttribute('y2', '19');

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '5');
    line2.setAttribute('y1', '12');
    line2.setAttribute('x2', '19');
    line2.setAttribute('y2', '12');

    svg.appendChild(line1);
    svg.appendChild(line2);
    return svg;
}


function getDiscountPercent(offer) {
    if (!offer) return 0;
    return offer.percent ?? offer.discountPercent ?? 0;
}


function createProductCard(product, offer, stock) {
    const card = createEl('article', 'product-box');
    card.id = `product-${product.id}`;

    const isOutOfStock = stock !== undefined && stock <= 0;
    if (isOutOfStock) {
        card.classList.add('out-of-stock');
    }


    const imageDiv = createEl('div', 'product-box-image');
    if (product.image) {
        const img = createEl('img');
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';
        img.onerror = () => {
            img.remove();
            imageDiv.textContent = product.emoji || '📦';
        };
        imageDiv.appendChild(img);
    } else {
        imageDiv.textContent = product.emoji || '📦';
    }


    const infoDiv = createEl('div', 'product-box-info');
    const title = createEl('h3', 'product-box-title', product.name);
    title.title = product.name;
    const weight = createEl('span', 'product-box-weight', product.unit || 'بسته');
    infoDiv.appendChild(title);
    infoDiv.appendChild(weight);


    const footer = createEl('div', 'product-box-footer');
    const priceDiv = createEl('div', 'product-box-price');

    const discountPercent = getDiscountPercent(offer);

    if (isOutOfStock) {
        const outLabel = createEl('span', 'out-of-stock-text', 'ناموجود');
        priceDiv.appendChild(outLabel);
    } else if (discountPercent > 0) {
        const finalPrice = product.price * (1 - discountPercent / 100);
        const oldPriceSpan = createEl('span', 'old-price', formatPrice(product.price));
        const priceVal = createEl('span', 'price-value', ` ${formatPrice(finalPrice)} `);
        const priceUnit = createEl('span', 'price-currency', 'تومان');

        priceDiv.appendChild(oldPriceSpan);
        priceDiv.appendChild(priceVal);
        priceDiv.appendChild(priceUnit);
    } else {
        const priceVal = createEl('span', 'price-value', formatPrice(product.price) + ' ');
        const priceUnit = createEl('span', 'price-currency', 'تومان');
        priceDiv.appendChild(priceVal);
        priceDiv.appendChild(priceUnit);
    }

    const addBtn = createEl('button', 'add-button');
    addBtn.type = 'button';
    addBtn.dataset.productId = product.id;
    addBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);

    if (isOutOfStock) {
        addBtn.disabled = true;
    } else {
        addBtn.appendChild(createPlusIcon());
    }

    footer.appendChild(priceDiv);
    footer.appendChild(addBtn);

    card.appendChild(imageDiv);
    card.appendChild(infoDiv);
    card.appendChild(footer);

    return card;
}

function createAmazingOfferCard(product, offer, stock, index) {
    const card = createEl('div', 'amazing-offer-box');
    card.id = `offer-card-${index + 1}`;

    const isOutOfStock = stock !== undefined && stock <= 0;
    if (isOutOfStock) {
        card.classList.add('out-of-stock');
    }


    const imgDiv = createEl('div', 'amazing-offer-box-image-div');
    if (product.image) {
        const img = createEl('img');
        img.src = product.image;
        img.alt = product.name;
        img.loading = 'lazy';
        img.onerror = () => {
            img.remove();
            imgDiv.textContent = product.emoji || '🎁';
        };
        imgDiv.appendChild(img);
    } else {
        imgDiv.textContent = product.emoji || '🎁';
    }


    const title = createEl('span', 'amazing-offer-box-title', product.name);
    title.title = product.name;
    const weight = createEl('span', 'amazing-offer-box-weight', product.unit || 'بسته');

    const mainPriceDiv = createEl('div', 'main-amazing-price-div');

    const discountPercent = getDiscountPercent(offer);
    const finalPrice = discountPercent > 0
        ? product.price * (1 - discountPercent / 100)
        : product.price;


    const oldPriceDiv = createEl('div', 'amazing-offer-box-old-price-div');

    if (discountPercent > 0) {
        const discountLabel = createEl(
            'span',
            'amazing-offer-box-discount-label',
            `${formatPrice(discountPercent)}٪`
        );
        const oldPrice = createEl('span', 'old-price', formatPrice(product.price));
        oldPriceDiv.appendChild(discountLabel);
        oldPriceDiv.appendChild(oldPrice);
    }


    const priceRow = createEl('div', 'amazing-offer-box-price-div');

    const addBtn = createEl('button', 'add-button');
    addBtn.type = 'button';
    addBtn.dataset.productId = product.id;
    addBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);

    if (isOutOfStock) {
        addBtn.disabled = true;
    } else {
        addBtn.appendChild(createPlusIcon());
    }

    const priceBox = createEl('div', 'amazing-offer-box-price');
    if (isOutOfStock) {
        const outText = createEl('span', 'out-of-stock-text', 'ناموجود');
        priceBox.appendChild(outText);
    } else {
        const priceVal = document.createTextNode(formatPrice(finalPrice) + ' ');
        const tomanSpan = createEl('span', 'toman', 'تومان');
        priceBox.appendChild(priceVal);
        priceBox.appendChild(tomanSpan);
    }

    priceRow.appendChild(addBtn);
    priceRow.appendChild(priceBox);

    if (discountPercent > 0) {
        mainPriceDiv.appendChild(oldPriceDiv);
    }
    mainPriceDiv.appendChild(priceRow);

    card.appendChild(imgDiv);
    card.appendChild(title);
    card.appendChild(weight);
    card.appendChild(mainPriceDiv);

    return card;
}

// اسکلتون لودینگ برای شگفت‌انگیز
function renderOffersSkeletonLoading(container, count = 5) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const card = createEl('div', 'amazing-offer-box');
        card.style.opacity = '0.6';
        card.style.pointerEvents = 'none';

        const imgDiv = createEl('div', 'amazing-offer-box-image-div');
        imgDiv.style.background = '#e2e8f0';

        const t = createEl('div');
        t.style.height = '16px';
        t.style.background = '#cbd5e1';
        t.style.borderRadius = '4px';
        t.style.marginBlock = '6px';

        const w = createEl('div');
        w.style.height = '12px';
        w.style.width = '50%';
        w.style.background = '#e2e8f0';
        w.style.borderRadius = '4px';

        card.appendChild(imgDiv);
        card.appendChild(t);
        card.appendChild(w);
        container.appendChild(card);
    }
}

// اسکلتون لودینگ برای محصولات ۶ گانه
function renderSkeletonLoading(container, count = 6) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skelCard = createEl('article', 'product-box');
        skelCard.style.opacity = '0.6';
        skelCard.style.pointerEvents = 'none';

        const skelImg = createEl('div', 'product-box-image');
        skelImg.style.background = '#e2e8f0';
        skelImg.style.borderRadius = '8px';

        const skelInfo = createEl('div', 'product-box-info');
        const skelTitle = createEl('div');
        skelTitle.style.height = '18px';
        skelTitle.style.background = '#cbd5e1';
        skelTitle.style.marginBottom = '8px';
        skelTitle.style.borderRadius = '4px';

        const skelUnit = createEl('div');
        skelUnit.style.height = '14px';
        skelUnit.style.width = '60%';
        skelUnit.style.background = '#e2e8f0';
        skelUnit.style.borderRadius = '4px';

        skelInfo.appendChild(skelTitle);
        skelInfo.appendChild(skelUnit);

        skelCard.appendChild(skelImg);
        skelCard.appendChild(skelInfo);
        container.appendChild(skelCard);
    }
}

function renderError(container, message) {
    if (!container) return;
    container.innerHTML = '';
    const errorBox = createEl('div', 'error-notice', message);
    errorBox.style.padding = '25px';
    errorBox.style.textAlign = 'center';
    errorBox.style.color = '#dc2626';
    errorBox.style.width = '100%';
    container.appendChild(errorBox);
}


function setupCarouselScroll(sectionSelector, listSelector) {
    const section = document.querySelector(sectionSelector);
    const list = typeof listSelector === 'string' ? document.querySelector(listSelector) : listSelector;
    if (!section || !list) return;

    const prevBtn = section.querySelector('.previous-arrow-button, .prev-btn');
    const nextBtn = section.querySelector('.next-arrow-button, .next-btn');
    const scrollStep = 220;

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            list.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            list.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });
    }
}

function populateCarousel(container, productsList, offersMap, stockMap) {
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    productsList.forEach(prod => {
        const offer = offersMap.get(prod.id);
        const stock = stockMap.get(prod.id);
        fragment.appendChild(createProductCard(prod, offer, stock));
    });
    container.appendChild(fragment);
}


function populateOffersCarousel(container, offersList, productsMap, stockMap) {
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    offersList.forEach((offer, idx) => {
        const pId = offer.productId || offer.id;
        const product = productsMap.get(pId);
        if (product) {
            const stock = stockMap.get(pId);
            fragment.appendChild(createAmazingOfferCard(product, offer, stock, idx));
        }
    });

    container.appendChild(fragment);
}


async function initStore() {

    const offersContainer = document.querySelector('#special-offers .amazing-offer-list-div');
    const fruitsContainer = document.getElementById('fruits-carousel-list');
    const dairyContainer = document.getElementById('dairy-carousel-list');
    const bakeryContainer = document.getElementById('bakery-carousel-list');
    const snacksContainer = document.getElementById('snacks-carousel-list');
    const drinksContainer = document.getElementById('drinks-carousel-list');
    const proteinContainer = document.getElementById('protein-carousel-list');

    renderOffersSkeletonLoading(offersContainer, 5);
    renderSkeletonLoading(fruitsContainer, 6);
    renderSkeletonLoading(dairyContainer, 6);
    renderSkeletonLoading(bakeryContainer, 6);
    renderSkeletonLoading(snacksContainer, 6);
    renderSkeletonLoading(drinksContainer, 6);
    renderSkeletonLoading(proteinContainer, 6);

    try {
        const [productsRes, offersRes, stockRes] = await Promise.all([
            fetch(`${API_BASE}/products.json`),
            fetch(`${API_BASE}/offers.json`).catch(() => null),
            fetch(`${API_BASE}/stock.json`).catch(() => null)
        ]);

        if (!productsRes.ok) throw new Error(`خطای دریافت محصولات: ${productsRes.status}`);

        const allProducts = await productsRes.json();
        const offersData = offersRes && offersRes.ok ? await offersRes.json() : [];
        const stockData = stockRes && stockRes.ok ? await stockRes.json() : {};

        const productsMap = new Map();
        allProducts.forEach(p => productsMap.set(p.id, p));

        const rawOffers = Array.isArray(offersData) ? offersData : (offersData.offers || []);
        const offersMap = new Map();
        rawOffers.forEach(o => {
            offersMap.set(o.productId || o.id, o);
        });

        const stockMap = new Map();
        const stockItems = stockData?.items || stockData;
        if (Array.isArray(stockItems)) {
            stockItems.forEach(s => stockMap.set(s.productId || s.id, s.stock ?? s.count ?? 0));
        } else if (typeof stockItems === 'object' && stockItems !== null) {
            Object.entries(stockItems).forEach(([key, val]) => {
                stockMap.set(Number(key) || key, typeof val === 'number' ? val : val.stock ?? 0);
            });
        }

        // ۱. شگفت‌انگیز
        if (offersContainer) {
            populateOffersCarousel(offersContainer, rawOffers, productsMap, stockMap);
            setupCarouselScroll('#special-offers', offersContainer);
        }

        // ۲. سایر کاروسل‌ها
        if (fruitsContainer) {
            const fruits = allProducts.filter(p => p.categoryId === 1 || p.categoryId === 'fruits');
            populateCarousel(fruitsContainer, fruits.length ? fruits : allProducts.slice(0, 6), offersMap, stockMap);
            setupCarouselScroll('#fruits-vegetables', '#fruits-carousel-list');
        }

        if (dairyContainer) {
            const dairy = allProducts.filter(p => p.categoryId === 2 || p.categoryId === 'dairy');
            populateCarousel(dairyContainer, dairy.length ? dairy : allProducts.slice(6, 12), offersMap, stockMap);
            setupCarouselScroll('#dairy', '#dairy-carousel-list');
        }

        if (bakeryContainer) {
            const bakery = allProducts.filter(p => p.categoryId === 3 || p.categoryId === 'bakery');
            populateCarousel(bakeryContainer, bakery.length ? bakery : allProducts.slice(12, 18), offersMap, stockMap);
            setupCarouselScroll('#bakery', '#bakery-carousel-list');
        }

        if (snacksContainer) {
            const snacks = allProducts.filter(p => p.categoryId === 4 || p.categoryId === 'snacks');
            populateCarousel(snacksContainer, snacks.length ? snacks : allProducts.slice(18, 24), offersMap, stockMap);
            setupCarouselScroll('#snacks', '#snacks-carousel-list');
        }

        if (drinksContainer) {
            const drinks = allProducts.filter(p => p.categoryId === 5 || p.categoryId === 'drinks');
            populateCarousel(drinksContainer, drinks.length ? drinks : allProducts.slice(24, 30), offersMap, stockMap);
            setupCarouselScroll('#drinks', '#drinks-carousel-list');
        }

        if (proteinContainer) {
            const protein = allProducts.filter(p => p.categoryId === 6 || p.categoryId === 'protein');
            populateCarousel(proteinContainer, protein.length ? protein : allProducts.slice(30, 36), offersMap, stockMap);
            setupCarouselScroll('#protein', '#protein-carousel-list');
        }

    } catch (err) {
        console.error('Error loading store data:', err);
        renderError(offersContainer, 'خطا در بارگذاری پیشنهادهای ویژه.');
        renderError(fruitsContainer, 'خطا در بارگذاری محصولات.');
    }
}

document.addEventListener('DOMContentLoaded', initStore);
