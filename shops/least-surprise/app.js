// آدرس فایل های API
const PRODUCTS_URL = '../../api/products.json';
const STOCK_URL = '../../api/stock.json';
const OFFERS_URL = '../../api/offers.json';
const CATEGORIES_URL = '../../api/categories.json';
const SHOP_URL = '../../api/shop.json';

// فرمت‌کننده اعداد به فارسی
const faNum = new Intl.NumberFormat('fa-IR');

// تابع کمکی برای ساخت المنت بدون innerHTML (جلوگیری از XSS)
function el(tag, className, textContent = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

// ساخت پیام حالت‌های بارگذاری و خطا
function renderStatusMessage(container, message, type = 'loading') {
  if (!container) return;
  container.textContent = '';
  const msgDiv = el('div', `carousel-status-msg ${type}`, message);
  container.appendChild(msgDiv);
}

// ساخت کارت محصول برای کاروسل‌ها
function createCard(product, stockCount, offer, cardId) {
  const card = el('article', 'product-card');
  if (cardId) card.id = cardId;

  const isOut = stockCount === 0 || stockCount === undefined;
  if (isOut) {
    card.classList.add('is-out');
  }

  // برچسب تخفیف یا اتمام موجودی
  if (isOut) {
    card.appendChild(el('span', 'badge-tag tag-out', 'اتمام موجودی'));
  } else if (offer) {
    card.appendChild(el('span', 'badge-tag tag-discount', `٪${faNum.format(offer.percent)} تخفیف`));
  }

  // آیکون / تصویر محصول
  const imgBox = el('div', 'product-img-box');
  imgBox.appendChild(el('span', 'emoji-visual', product.emoji || '🛒'));
  card.appendChild(imgBox);

  // نام محصول
  card.appendChild(el('h3', 'product-name', product.name));

  // واحد
  if (product.unit) {
    card.appendChild(el('p', 'product-unit', product.unit));
  }

  // قیمت و تخفیف
  const priceContainer = el('div', 'price-container');
  if (offer && !isOut) {
    const discountedPrice = Math.round(product.price * (1 - offer.percent / 100));
    priceContainer.appendChild(el('del', '', `${faNum.format(product.price)}`));
    priceContainer.appendChild(el('span', 'current-price', ` ${faNum.format(discountedPrice)} تومان`));
  } else {
    priceContainer.appendChild(el('span', 'current-price', `${faNum.format(product.price)} تومان`));
  }
  card.appendChild(priceContainer);

  // دکمه افزودن
  const btn = el('button', 'add-to-cart-btn', isOut ? 'ناموجود' : '➕ افزودن به سبد');
  btn.type = 'button';
  if (isOut) btn.disabled = true;
  card.appendChild(btn);

  return card;
}

// تابع اصلی دریافت اطلاعات و ساخت صفحه
async function initApp() {
  const discTrack = document.getElementById('track-disc');

  // المنت‌های هدر و فوتر و دسته‌بندی‌ها (دقیقاً هماهنگ با IDهای HTML)
  const categoriesContainer = document.getElementById('popular-categories-container');
  const dropdownCategories = document.getElementById('categories-dropdown');
  const footerCategories = document.getElementById('footer-categories');
  const noticeBar = document.getElementById('shop-notice');
  const shopSlogan = document.getElementById('shop-slogan');
  const footerAbout = document.getElementById('shop-about');
  const footerAddress = document.getElementById('shop-address');
  const footerPhone = document.getElementById('shop-phone');
  const footerSchedule = document.getElementById('shop-schedule');
  const footerCopyright = document.getElementById('shop-copyright');

  // نمایش حالت بارگذاری برای کاروسل اول
  renderStatusMessage(discTrack, 'در حال بارگذاری پیشنهادها...', 'loading');

  try {
    // دریافت هم‌زمان داده‌ها با Promise.all
    const [prodRes, stockRes, offersRes, catRes, shopRes] = await Promise.all([
      fetch(PRODUCTS_URL),
      fetch(STOCK_URL),
      fetch(OFFERS_URL),
      fetch(CATEGORIES_URL),
      fetch(SHOP_URL)
    ]);

    if (!prodRes.ok || !stockRes.ok || !offersRes.ok || !catRes.ok || !shopRes.ok) {
      throw new Error('خطا در دریافت اطلاعات از سرور!');
    }

    const [products, stockData, offersData, categories, shopData] = await Promise.all([
      prodRes.json(),
      stockRes.json(),
      offersRes.json(),
      catRes.json(),
      shopRes.json()
    ]);

    const stockItems = stockData.items || {};
    const offersMap = new Map(offersData.map(o => [o.productId, o]));

    // به‌روزرسانی اطلاعات هدر و فوتر از shop.json
    if (noticeBar && shopData.notice) noticeBar.textContent = shopData.notice;
    if (shopSlogan && shopData.slogan) shopSlogan.textContent = shopData.slogan;
    if (footerAbout && shopData.about) footerAbout.textContent = shopData.about;
    if (footerAddress && shopData.address) footerAddress.textContent = shopData.address;
    if (footerPhone && shopData.phone) footerPhone.textContent = shopData.phone;
    if (footerSchedule && shopData.schedule) footerSchedule.textContent = shopData.schedule;
    if (footerCopyright && shopData.copyright) footerCopyright.textContent = shopData.copyright;

    // ساخت بخش دسته‌بندی‌های محبوب، منوی آبشاری و فوتر از categories.json
    if (Array.isArray(categories)) {
      // الف: دسته‌بندی‌های محبوب صفحه
      if (categoriesContainer) {
        categoriesContainer.textContent = '';
        categories.forEach(cat => {
          const card = el('a', 'cat-pill-card');
          card.href = `#${cat.slug || cat.id}`;

          const iconDiv = el('div', 'cat-pill-icon');
          if (cat.color) iconDiv.style.backgroundColor = cat.color;
          iconDiv.appendChild(el('span', 'cat-emoji', cat.icon || '🏷️'));
          card.appendChild(iconDiv);

          card.appendChild(el('span', 'cat-pill-name', cat.name));
          categoriesContainer.appendChild(card);
        });
      }

      // ب: زیرمنوی آبشاری دسته‌ها در هدر
      if (dropdownCategories) {
        dropdownCategories.textContent = '';
        categories.forEach(cat => {
          const li = el('li');
          const a = el('a');
          a.href = `#${cat.slug || cat.id}`;

          const iconBox = el('span', 'dropdown-icon-box');
          if (cat.color) iconBox.style.backgroundColor = cat.color;
          iconBox.appendChild(el('span', '', cat.icon || '🏷️'));
          a.appendChild(iconBox);

          a.appendChild(el('span', '', cat.name));
          li.appendChild(a);
          dropdownCategories.appendChild(li);
        });
      }

      // ج: لینک‌های دسته‌بندی در فوتر
      if (footerCategories) {
        footerCategories.textContent = '';
        categories.forEach(cat => {
          const li = el('li');
          const a = el('a', '', cat.name);
          a.href = `#${cat.slug || cat.id}`;
          li.appendChild(a);
          footerCategories.appendChild(li);
        });
      }
    }

    // ساخت کاروسل پیشنهاد ویژه (داینامیک)
    if (discTrack) {
      discTrack.textContent = '';
      const discountedProducts = products.filter(p => offersMap.has(p.id));

      if (discountedProducts.length === 0) {
        renderStatusMessage(discTrack, 'در حال حاضر هیچ پیشنهاد ویژه‌ای موجود نیست.', 'loading');
      } else {
        discountedProducts.forEach((p, index) => {
          const stockCount = stockItems[p.id];
          discTrack.appendChild(createCard(p, stockCount, offersMap.get(p.id), `disc-${index + 1}`));
        });
      }
    }

  } catch (error) {
    console.error('Fetch Error:', error);
    const errorMessage = 'بارگذاری محصولات ممکن نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره بارگذاری کنید.';
    renderStatusMessage(discTrack, errorMessage, 'error');
  }
}

document.addEventListener('DOMContentLoaded', initApp);
