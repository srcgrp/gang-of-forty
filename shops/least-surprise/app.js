// آدرس فایل‌های API
const PRODUCTS_URL = '../../api/products.json';
const STOCK_URL = '../../api/stock.json';
const OFFERS_URL = '../../api/offers.json';
const CATEGORIES_URL = '../../api/categories.json';
const SHOP_URL = '../../api/shop.json';

// فرمت‌کننده اعداد به فارسی
const faNum = new Intl.NumberFormat('fa-IR');

// نقشه تصاویر و رنگ‌های اختصاصی برای دسته‌بندی‌ها
const categoryMeta = {
  'fruit-veg': { icon: 'glossy_red_apple_badge.png', bg: '#fee2e2' },
  'dairy':     { icon: 'glossy_milk_glass_app_icon.png', bg: '#dbeafe' },
  'protein':   { icon: 'glossy_steak_badge_icon.png', bg: '#ffe4e6' },
  'bakery':    { icon: 'bread.png', bg: '#fef3c7' },
  'drinks':    { icon: 'glossy_green_juice_carton_icon.png', bg: '#ccfbf1' },
  'snacks':    { icon: 'glossy_pink_popcorn_badge.png', bg: '#fce7f3' }
};

// تابع ساخت امن المان‌ها (بدون innerHTML برای جلوگیری از XSS)
function el(tag, className, textContent = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

// ساخت پیام وضعیت (در حال بارگذاری / خطا)
function renderStatusMessage(container, message, type = 'loading') {
  if (!container) return;
  container.textContent = '';
  const msgDiv = el('div', `carousel-status-msg ${type}`, message);
  container.appendChild(msgDiv);
}

// ساخت کارت محصول کاروسل
function createCard(product, stockCount, offer, cardId) {
  const card = el('article', 'product-card');
  if (cardId) card.id = cardId;

  const isOut = stockCount === 0 || stockCount === undefined;
  if (isOut) {
    card.classList.add('is-out');
    card.appendChild(el('span', 'badge-tag tag-out', 'اتمام موجودی'));
  } else if (offer) {
    card.appendChild(el('span', 'badge-tag tag-discount', `٪${faNum.format(offer.percent)} تخفیف`));
  }

  // تصویر محصول
  const imgBox = el('div', 'product-img-box');
  imgBox.appendChild(el('span', 'emoji-visual', product.emoji || '🛒'));
  card.appendChild(imgBox);

  // عنوان محصول
  card.appendChild(el('h3', 'product-name', product.name));

  // واحد
  if (product.unit) {
    card.appendChild(el('p', 'product-unit', product.unit));
  }

  // قیمت
  const priceContainer = el('div', 'price-container');
  if (offer && !isOut) {
    const discountedPrice = Math.round(product.price * (1 - offer.percent / 100));
    priceContainer.appendChild(el('del', '', `${faNum.format(product.price)}`));
    priceContainer.appendChild(el('span', 'current-price', ` ${faNum.format(discountedPrice)} تومان`));
  } else {
    priceContainer.appendChild(el('span', 'current-price', `${faNum.format(product.price)} تومان`));
  }
  card.appendChild(priceContainer);

  // دکمه خرید
  const btn = el('button', 'add-to-cart-btn', isOut ? 'ناموجود' : '➕ افزودن به سبد');
  btn.type = 'button';
  if (isOut) btn.disabled = true;
  card.appendChild(btn);

  return card;
}

// تابع اصلی اجرای برنامه
async function initApp() {
  const discTrack = document.getElementById('track-disc');
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

  renderStatusMessage(discTrack, 'در حال بارگذاری پیشنهادها...', 'loading');

  try {
    // فراخوانی همزمان داده‌ها با Promise.all
    const [prodRes, stockRes, offersRes, catRes, shopRes] = await Promise.all([
      fetch(PRODUCTS_URL),
      fetch(STOCK_URL),
      fetch(OFFERS_URL),
      fetch(CATEGORIES_URL),
      fetch(SHOP_URL)
    ]);

    if (!prodRes.ok || !stockRes.ok || !offersRes.ok || !catRes.ok || !shopRes.ok) {
      throw new Error('خطا در دریافت اطلاعات سرور');
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

    // ۱. اطلاعات فروشگاه (shop.json)
    if (noticeBar && shopData.notice) noticeBar.textContent = shopData.notice;
    if (shopSlogan && shopData.slogan) shopSlogan.textContent = shopData.slogan;
    if (footerAbout && shopData.about) footerAbout.textContent = shopData.about;
    if (footerAddress && shopData.address) footerAddress.textContent = shopData.address;
    if (footerPhone && shopData.phone) footerPhone.textContent = shopData.phone;
    if (footerSchedule && shopData.schedule) footerSchedule.textContent = shopData.schedule;
    if (footerCopyright && shopData.copyright) footerCopyright.textContent = shopData.copyright;

    // ۲. رندر دسته‌بندی‌ها (categories.json) با آیکون‌های خوشگل
    if (Array.isArray(categories)) {
      
      // کارت‌های میانی صفحه
      if (categoriesContainer) {
        categoriesContainer.textContent = '';
        categories.forEach(cat => {
          const key = cat.slug || cat.id;
          const meta = categoryMeta[key] || { icon: 'glossy_red_apple_badge.png', bg: '#f1f5f9' };

          const card = el('a', 'cat-pill-card');
          card.href = `#${key}`;

          const iconDiv = el('div', 'cat-pill-icon');
          iconDiv.style.backgroundColor = meta.bg;

          const img = document.createElement('img');
          img.src = meta.icon;
          img.alt = cat.name;
          img.className = 'cat-img';
          img.width = 60;
          img.height = 60;
          img.loading = 'lazy';

          iconDiv.appendChild(img);
          card.appendChild(iconDiv);
          card.appendChild(el('span', 'cat-pill-name', cat.name));

          categoriesContainer.appendChild(card);
        });
      }

      // زیرمنوی کشویی هدر
      if (dropdownCategories) {
        dropdownCategories.textContent = '';
        categories.forEach(cat => {
          const key = cat.slug || cat.id;
          const meta = categoryMeta[key] || { icon: 'glossy_red_apple_badge.png', bg: '#f1f5f9' };

          const li = el('li');
          const a = el('a');
          a.href = `#${key}`;

          const iconBox = el('span', 'dropdown-icon-box');
          iconBox.style.backgroundColor = meta.bg;

          const miniImg = document.createElement('img');
          miniImg.src = meta.icon;
          miniImg.alt = cat.name;
          miniImg.className = 'menu-mini-img';
          miniImg.width = 22;
          miniImg.height = 22;
          miniImg.loading = 'lazy';

          iconBox.appendChild(miniImg);
          a.appendChild(iconBox);
          a.appendChild(el('span', '', cat.name));
          li.appendChild(a);
          dropdownCategories.appendChild(li);
        });
      }

      // لیست دسته‌ها در فوتر
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

    // ۳. کاروسل پیشنهاد ویژه با تخفیف‌ها
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
    renderStatusMessage(discTrack, 'بارگذاری محصولات ممکن نشد. لطفاً صفحه را رفرش کنید.', 'error');
  }
}

document.addEventListener('DOMContentLoaded', initApp);
