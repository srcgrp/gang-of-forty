const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function toPersianDigits(value) {
  return String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[digit]);
}

function formatToman(amount) {
  return `${new Intl.NumberFormat('fa-IR').format(Math.round(amount))} تومان`;
}

function buildLookupMaps(stocksData, offersData) {
  const stockMap = new Map(
    Object.entries(stocksData.items).map(([id, qty]) => [Number(id), qty])
  );
  const offerMap = new Map(
    offersData.map((offer) => [offer.productId, offer])
  );
  return { stockMap, offerMap };
}

function renderSkeleton(container, count = 6) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';

    const img = document.createElement('div');
    img.className = 'skeleton-img';

    const title = document.createElement('div');
    title.className = 'skeleton-title';

    const price = document.createElement('div');
    price.className = 'skeleton-price';

    card.append(img, title, price);
    fragment.appendChild(card);
  }

  container.replaceChildren(fragment);
}

function renderMessage(container, message, isError = false) {
  const p = document.createElement('p');
  p.className = isError ? 'error-message' : 'empty-message';
  p.textContent = message;
  container.replaceChildren(p);
}

function createProductCard(product, offerMap, stockMap) {
  const offer = offerMap.get(product.id);
  const stock = stockMap.get(product.id);
  const outOfStock = stock === 0;

  const card = document.createElement('div');
  card.className = 'carousel-card-sells';
  if (outOfStock) card.classList.add('out-of-stock');

  if (outOfStock) {
    const badge = document.createElement('span');
    badge.className = 'out-of-stock-badge';
    badge.textContent = 'ناموجود';
    card.appendChild(badge);
  } else if (offer) {
    const badge = document.createElement('span');
    badge.className = 'discount-badge';
    badge.textContent = `٪${toPersianDigits(offer.percent)}`;
    card.appendChild(badge);
  }

  const img = document.createElement('div');
  img.className = 'carousel-image-sells';
  img.textContent = product.emoji;
  card.appendChild(img);

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'add-to-cart';
  addBtn.textContent = '+';
  addBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);
  if (outOfStock) {
    addBtn.disabled = true;
  }
  card.appendChild(addBtn);

  const title = document.createElement('h3');
  title.className = 'card-title-sells';
  title.textContent = product.name;
  card.appendChild(title);

  const amountWrap = document.createElement('div');
  amountWrap.className = 'sell-amount-wrap';
  const amountP = document.createElement('p');
  amountP.className = 'sell-amount';
  amountP.textContent = product.unit;
  amountWrap.appendChild(amountP);
  card.appendChild(amountWrap);

  const priceRow = document.createElement('div');
  priceRow.className = 'price-row';

  if (offer) {
    const discountedPrice = product.price * (1 - offer.percent / 100);

    const newPriceP = document.createElement('p');
    newPriceP.className = 'price';
    newPriceP.textContent = formatToman(discountedPrice);
    priceRow.appendChild(newPriceP);

    const oldPriceDel = document.createElement('del');
    oldPriceDel.className = 'old-price';
    oldPriceDel.textContent = formatToman(product.price);
    priceRow.appendChild(oldPriceDel);
  } else {
    const priceP = document.createElement('p');
    priceP.className = 'price regular-price';
    priceP.textContent = formatToman(product.price);
    priceRow.appendChild(priceP);
  }

  card.appendChild(priceRow);

  return card;
}

function renderProductList(container, products, offerMap, stockMap, emptyText) {
  if (products.length === 0) {
    renderMessage(container, emptyText);
    return;
  }

  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    fragment.appendChild(createProductCard(product, offerMap, stockMap));
  });
  container.replaceChildren(fragment);
}

async function fetchJSON(url, errorMessage) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
}

async function init() {
  const specialOffersList = document.querySelector('#special-offers .carousel-list');
  const snacksList = document.querySelector('#snacks .carousel-list');

  if (specialOffersList) renderSkeleton(specialOffersList, 4);
  if (snacksList) renderSkeleton(snacksList, 4);

  try {
    const [products, stocksData, offersData] = await Promise.all([
      fetchJSON('/api/products.json', 'خطا در دریافت اطلاعات محصولات'),
      fetchJSON('/api/stock.json', 'خطا در دریافت اطلاعات موجودی'),
      fetchJSON('/api/offers.json', 'خطا در دریافت اطلاعات تخفیف‌ها'),
    ]);

    const { stockMap, offerMap } = buildLookupMaps(stocksData, offersData);

    if (specialOffersList) {
      const discountedProducts = products.filter((product) => offerMap.has(product.id));
      renderProductList(
        specialOffersList,
        discountedProducts,
        offerMap,
        stockMap,
        'در حال حاضر پیشنهاد ویژه‌ای وجود ندارد.'
      );
    }

    if (snacksList) {
      const snackProducts = products.filter((product) => product.categoryId === 7);
      renderProductList(
        snacksList,
        snackProducts,
        offerMap,
        stockMap,
        'محصولی در این دسته یافت نشد.'
      );
    }
  } catch (error) {
    console.error(error);
    const errorText = 'خطا در بارگذاری اطلاعات. لطفاً اتصال اینترنت خود را بررسی کنید.';
    if (specialOffersList) renderMessage(specialOffersList, errorText, true);
    if (snacksList) renderMessage(snacksList, errorText, true);
  }
}

document.addEventListener('DOMContentLoaded', init);