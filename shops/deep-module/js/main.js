
import {
  escapeHTML,
  formatPrice,
  safeHref,
  isValidProduct,
  isValidCategory,
} from "./utils.js";
import { addToCart, initCart } from "./cart.js";
import { api, ApiError, watchConnectivity } from "./GetItemItemGet.js";
import {
  renderError,
  renderEmpty,
  renderSkeletonProducts,
  renderSkeletonCategories,
  showOfflineBanner,
  hideOfflineBanner,
  showRetryToast,
} from "./states.js";

// ═══════════════════════════════════════════════════════════════
// State
// ═══════════════════════════════════════════════════════════════
const filterState = {
  categoryId: "all",
  stock: "all",
  discount: "all",
  sort: "default",
};

let allProductsData = [];
let allOffersData = [];
let allStockItems = {};
let allCategoriesData = [];

let lastLoadError = null;
let isLoading = false;

// ═══════════════════════════════════════════════════════════════
// کارت محصول
// ═══════════════════════════════════════════════════════════════
function productCardHTML(product, offer = null, quantity = null) {
  if (!isValidProduct(product)) return "";

  const id = product.id;
  const name = escapeHTML(product.name);
  const unit = escapeHTML(product.unit);
  const emoji = escapeHTML(product.emoji) || "📦";
  const isOut = quantity === 0;

  let priceHTML;
  if (offer && !isOut && Number.isFinite(offer.percent)) {
    const pct = Math.min(Math.max(Number(offer.percent), 0), 99);
    const finalPrice = Math.round(product.price * (1 - pct / 100));
    priceHTML = `<del>${formatPrice(product.price)}</del><ins>${formatPrice(finalPrice)}</ins>`;
  } else {
    priceHTML = `<ins>${formatPrice(product.price)}</ins>`;
  }

  let badgeHTML = "";
  if (isOut) {
    badgeHTML = `<span class="badge badge--danger">ناموجود</span>`;
  } else if (offer && Number.isFinite(offer.percent)) {
    const pct = Math.min(Math.max(Number(offer.percent), 0), 99);
    badgeHTML = `<span class="badge">${pct}٪</span>`;
  }

  return `
    <li class="product-card${isOut ? " product-card--unavailable" : ""}" data-id="${id}">
      ${badgeHTML}
      <div class="product-card__media">
        <span class="product-card__emoji" aria-hidden="true">${emoji}</span>
      </div>
      <h3 class="product-card__title">${name}</h3>
      <p class="product-card__meta">${unit}</p>
      <div class="product-card__footer">
        <div class="product-card__price">${priceHTML}</div>
        <button type="button" class="btn-add" data-id="${id}"
                aria-label="${isOut ? "ناموجود" : `افزودن ${name} به سبد`}"
                ${isOut ? "disabled" : ""}>+</button>
      </div>
    </li>
  `;
}

// ═══════════════════════════════════════════════════════════════
// اتصال events به کارت‌ها
// ═══════════════════════════════════════════════════════════════
function attachProductEvents(container, products) {
  if (!container || !Array.isArray(products)) return;

  container.querySelectorAll(".product-card").forEach((card) => {
    const id = Number(card.dataset.id);
    if (!id) return;

    const product = products.find((p) => p.id === id);
    if (!product) return;

    const addBtn = card.querySelector(".btn-add");
    if (addBtn && !addBtn.disabled) {
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(product);

        addBtn.classList.add("btn-add--added");
        addBtn.textContent = "✓";
        setTimeout(() => {
          addBtn.classList.remove("btn-add--added");
          addBtn.textContent = "+";
        }, 800);
      });
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// رندر محصولات فیلترشده
// ═══════════════════════════════════════════════════════════════
function renderFilteredProducts() {
  const track = document.getElementById("all-track");
  const countEl = document.getElementById("all-count");
  if (!track) return;
  if (allProductsData.length === 0) return;

  let result = [...allProductsData];

  // فیلتر دسته‌بندی
  if (filterState.categoryId !== "all") {
    result = result.filter(
      (p) => p.categoryId === Number(filterState.categoryId),
    );
  }

  // فیلتر موجودی
  if (filterState.stock === "in") {
    result = result.filter((p) => (allStockItems[p.id] ?? 0) > 0);
  } else if (filterState.stock === "out") {
    result = result.filter((p) => (allStockItems[p.id] ?? 0) === 0);
  }

  // فیلتر تخفیف
  if (filterState.discount === "yes") {
    result = result.filter((p) =>
      allOffersData.some((o) => o.productId === p.id),
    );
  }

  // مرتب‌سازی
  if (filterState.sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (filterState.sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (filterState.sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name, "fa"));
  }

  // رندر
  if (result.length === 0) {
    track.innerHTML = `
      <li class="products-empty">
        <span class="products-empty__icon">🔍</span>
        <p class="products-empty__text">محصولی پیدا نشد</p>
        <p class="products-empty__hint">فیلترها را تغییر دهید</p>
      </li>
    `;
  } else {
    track.innerHTML = result
      .map((p) => {
        const offer = allOffersData.find((o) => o.productId === p.id);
        return productCardHTML(p, offer, allStockItems[p.id]);
      })
      .join("");

    attachProductEvents(track, allProductsData);
  }

  // شمارنده
  if (countEl) {
    countEl.textContent = `${result.length.toLocaleString("fa-IR")} کالا`;
  }

  // badge فیلتر فعال
  const activeCount = [
    filterState.categoryId !== "all",
    filterState.stock !== "all",
    filterState.discount !== "all",
    filterState.sort !== "default",
  ].filter(Boolean).length;

  const badge = document.getElementById("filter-badge");
  if (badge) {
    if (activeCount > 0) {
      badge.hidden = false;
      badge.textContent = activeCount.toLocaleString("fa-IR");
    } else {
      badge.hidden = true;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// مودال فیلتر
// ═══════════════════════════════════════════════════════════════
function setupFilterModal() {
  const filterBtn = document.getElementById("filter-btn");
  const filterModal = document.querySelector("#filter-modal");
  const categoriesBox = document.getElementById("filter-categories");
  const applyBtn = document.getElementById("filter-apply");
  const resetBtn = document.getElementById("filter-reset");

  if (!filterModal) {
    console.warn("مودال فیلتر پیدا نشد");
    return;
  }

  // پر کردن دسته‌بندی‌ها
  if (categoriesBox && allCategoriesData.length) {
    categoriesBox.innerHTML = `
      <button type="button" class="filter-chip filter-chip--active" data-category="all">
        همه
      </button>
      ${allCategoriesData
        .map(
          (cat) => `
        <button type="button" class="filter-chip" data-category="${cat.id}">
          <span class="filter-chip__emoji">${escapeHTML(cat.emoji)}</span>
          ${escapeHTML(cat.name)}
        </button>
      `,
        )
        .join("")}
    `;
  }

  // باز کردن مودال
  filterBtn?.addEventListener("click", () => {
    filterModal.classList.add("modal--open");
    document.body.style.overflow = "hidden";
  });

  // کلیک روی چیپ‌ها
  filterModal.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;

    const box = chip.parentElement;
    box.querySelectorAll(".filter-chip").forEach((c) => {
      c.classList.remove("filter-chip--active");
    });
    chip.classList.add("filter-chip--active");

    if (chip.dataset.category !== undefined) {
      filterState.categoryId = chip.dataset.category;
    } else if (chip.dataset.stock !== undefined) {
      filterState.stock = chip.dataset.stock;
    } else if (chip.dataset.discount !== undefined) {
      filterState.discount = chip.dataset.discount;
    } else if (chip.dataset.sort !== undefined) {
      filterState.sort = chip.dataset.sort;
    }
  });

  // اعمال فیلتر
  applyBtn?.addEventListener("click", () => {
    renderFilteredProducts();
    filterModal.classList.remove("modal--open");
    document.body.style.overflow = "";
  });

  // پاک کردن
  resetBtn?.addEventListener("click", () => {
    filterState.categoryId = "all";
    filterState.stock = "all";
    filterState.discount = "all";
    filterState.sort = "default";

    filterModal.querySelectorAll(".filter-chips").forEach((box) => {
      const chips = box.querySelectorAll(".filter-chip");
      chips.forEach((c, i) => {
        c.classList.toggle("filter-chip--active", i === 0);
      });
    });
  });

  // بستن با ✕ یا overlay
  filterModal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => {
      filterModal.classList.remove("modal--open");
      document.body.style.overflow = "";
    });
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && filterModal.classList.contains("modal--open")) {
      filterModal.classList.remove("modal--open");
      document.body.style.overflow = "";
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// رندر همه‌ی بخش‌ها
// ═══════════════════════════════════════════════════════════════
function renderAll({ products, categories, shop, home, offers, stock }) {
  const stockItems =
    stock?.items && typeof stock.items === "object" ? stock.items : {};

  // ذخیره در متغیرهای سراسری
  allProductsData = products;
  allOffersData = offers;
  allStockItems = stockItems;
  allCategoriesData = categories;

  // ═══ ۱. Topbar ═══
  const topbarText = document.getElementById("topbar-text");
  if (topbarText && shop?.notice) {
    topbarText.textContent = String(shop.notice).slice(0, 200);
  }

  // ═══ ۲. برند ═══
  const brandName = document.getElementById("brand-name");
  if (brandName && shop?.name) {
    brandName.textContent = String(shop.name).slice(0, 50);
  }

  const brandSlogan = document.getElementById("brand-slogan");
  if (brandSlogan && shop?.slogan) {
    brandSlogan.textContent = String(shop.slogan).slice(0, 100);
  }

  // ═══ ۳. منو ═══
  const navLinks = document.getElementById("nav-links");
  if (navLinks && Array.isArray(shop?.menu)) {
    navLinks.textContent = "";
    shop.menu.slice(0, 10).forEach((item) => {
      if (!item || typeof item !== "object") return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = safeHref(item.href);
      a.textContent = String(item.label || "").slice(0, 50);
      li.appendChild(a);
      navLinks.appendChild(li);
    });
  }

  const megaList = document.getElementById("mega-list");
  if (megaList && categories.length) {
    megaList.innerHTML = categories
      .map(
        (cat) => `
        <li>
          <a href="#cat-${cat.id}" role="menuitem">
            <span aria-hidden="true">${escapeHTML(cat.emoji)}</span>
            ${escapeHTML(cat.name)}
          </a>
        </li>
      `,
      )
      .join("");
  }

  // ═══ ۴. Hero ═══
  if (home?.hero && typeof home.hero === "object") {
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle && typeof home.hero.title === "string") {
      heroTitle.innerHTML = home.hero.title
        .slice(0, 200)
        .split("،")
        .map((l) => escapeHTML(l.trim()))
        .join("<br />");
    }

    const heroText = document.querySelector(
      ".hero-card--primary .hero-card__text",
    );
    if (heroText && typeof home.hero.text === "string") {
      heroText.textContent = home.hero.text.slice(0, 300);
    }

    const heroBtn = document.querySelector(
      ".hero-card--primary .hero-card__btn",
    );
    if (heroBtn && home.hero.cta) {
      heroBtn.href = safeHref(home.hero.cta.href);
      const span = heroBtn.querySelector("span:first-child");
      if (span && home.hero.cta.label) {
        span.textContent = String(home.hero.cta.label).slice(0, 50);
      }
    }
  }

  if (home?.side && typeof home.side === "object") {
    const sideTitle = document.querySelector(
      ".hero-card--secondary .hero-card__title",
    );
    if (sideTitle && home.side.title) {
      sideTitle.textContent = String(home.side.title).slice(0, 100);
    }

    const sideText = document.querySelector(
      ".hero-card--secondary .hero-card__text",
    );
    if (sideText && home.side.text) {
      sideText.textContent = String(home.side.text).slice(0, 200);
    }

    const sideBtn = document.querySelector(
      ".hero-card--secondary .hero-card__btn",
    );
    if (sideBtn && home.side.cta) {
      sideBtn.href = safeHref(home.side.cta.href);
      const span = sideBtn.querySelector("span:first-child");
      if (span && home.side.cta.label) {
        span.textContent = String(home.side.cta.label).slice(0, 50);
      }
    }
  }

  // ═══ ۵. دسته‌بندی‌ها ═══
  const categoriesGrid = document.getElementById("categories-grid");
  if (categoriesGrid) {
    if (categories.length === 0) {
      renderEmpty(categoriesGrid, {
        icon: "📂",
        title: "دسته‌بندی‌ای موجود نیست",
        text: "به‌زودی دسته‌بندی‌های جدید اضافه می‌شود.",
      });
    } else {
      categoriesGrid.innerHTML = categories
        .map((cat, index) => {
          const color = /^#[0-9a-fA-F]{3,8}$/.test(cat.color || "")
            ? cat.color
            : "#f0f9f1";
          return `
            <li style="--i:${index}">
              <a href="#cat-${cat.id}" class="category-card">
                <span class="category-card__glow" style="--c:${color}"></span>
                <span class="category-card__icon" style="background:${color}">
                  ${escapeHTML(cat.emoji)}
                </span>
                <span class="category-card__title">${escapeHTML(cat.name)}</span>
                <span class="category-card__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
            </li>
          `;
        })
        .join("");
    }
  }

  // ═══ ۶. پیشنهاد ویژه ═══
  const specialTrack = document.getElementById("special-track");
  if (specialTrack) {
    if (offers.length === 0) {
      renderEmpty(specialTrack, {
        icon: "🔥",
        title: "پیشنهاد ویژه‌ای موجود نیست",
        text: "به‌زودی پیشنهادهای جدید اضافه می‌شود.",
      });
    } else {
      specialTrack.innerHTML = offers
        .map((offer) => {
          const product = products.find((p) => p.id === offer.productId);
          if (!product) return "";
          return productCardHTML(product, offer, stockItems[product.id]);
        })
        .join("");

      attachProductEvents(specialTrack, products);
    }
  }

  // ═══ ۷. بنرها ═══
  const bannersWrapper = document.getElementById("banners-wrapper");
  if (bannersWrapper) {
    if (Array.isArray(home?.promos) && home.promos.length > 0) {
      bannersWrapper.innerHTML = home.promos
        .slice(0, 10)
        .map((promo) => {
          if (!promo || typeof promo !== "object") return "";
          return `
            <a href="${safeHref(promo.href)}" class="banner">
              <span class="banner__icon" aria-hidden="true">${escapeHTML(promo.emoji)}</span>
              <div class="banner__content">
                <strong>${escapeHTML(promo.text)}</strong>
              </div>
              <span class="banner__arrow" aria-hidden="true">←</span>
            </a>
          `;
        })
        .join("");
    } else {
      bannersWrapper.innerHTML = "";
    }
  }

  // ═══ ۸. کاروسل هر دسته ═══
  const categorySections = document.getElementById("category-sections");
  if (categorySections) {
    if (categories.length === 0 || products.length === 0) {
      categorySections.innerHTML = "";
    } else {
      categorySections.innerHTML = categories
        .map((cat) => {
          const catProducts = products.filter((p) => p.categoryId === cat.id);
          if (catProducts.length === 0) return "";

          const cardsHTML = catProducts
            .map((p) => productCardHTML(p, null, stockItems[p.id]))
            .join("");

          return `
            <section id="cat-${cat.id}" class="carousel-section">
              <div class="carousel-section__head">
                <h2 class="section-head__title">
                  <span aria-hidden="true">${escapeHTML(cat.emoji)}</span>
                  ${escapeHTML(cat.name)}
                </h2>
                <span class="section-head__count">${catProducts.length.toLocaleString("fa-IR")} کالا</span>
              </div>
              <div class="carousel" role="region" aria-label="کاروسل ${escapeHTML(cat.name)}" tabindex="0">
                <ul class="carousel__track">${cardsHTML}</ul>
              </div>
            </section>
          `;
        })
        .join("");

      categorySections.querySelectorAll(".carousel__track").forEach((track) => {
        attachProductEvents(track, products);
      });
    }
  }

  // ═══ ۹. تمام محصولات با فیلتر ═══
  setupFilterModal();
  renderFilteredProducts();

  // ═══ ۱۰. فوتر ═══
  if (shop && typeof shop === "object") {
    const footerName = document.getElementById("footer-name");
    if (footerName && shop.name) {
      footerName.textContent = String(shop.name).slice(0, 50);
    }

    const footerAbout = document.getElementById("footer-about");
    if (footerAbout && shop.about) {
      footerAbout.textContent = String(shop.about).slice(0, 300);
    }

    const footerPhone = document.getElementById("footer-phone");
    if (footerPhone && shop.phone) {
      const phone = String(shop.phone)
        .replace(/[^\d+\-\s()]/g, "")
        .slice(0, 20);
      footerPhone.textContent = phone;
      footerPhone.href = `tel:${phone.replace(/[^\d+]/g, "")}`;
    }

    const footerLinks = document.getElementById("footer-links");
    if (footerLinks && categories.length) {
      footerLinks.innerHTML = categories
        .slice(0, 5)
        .map(
          (cat) =>
            `<li><a href="#cat-${cat.id}">${escapeHTML(cat.name)}</a></li>`,
        )
        .join("");
    }

    const footerHelp = document.getElementById("footer-help");
    if (footerHelp && Array.isArray(shop.help)) {
      footerHelp.innerHTML = shop.help
        .slice(0, 10)
        .map((item) => {
          if (!item || typeof item !== "object") return "";
          return `<li><a href="${safeHref(item.href)}">${escapeHTML(item.label)}</a></li>`;
        })
        .join("");
    }

    const footerSchedule = document.getElementById("footer-schedule");
    if (footerSchedule && Array.isArray(shop.schedule)) {
      footerSchedule.innerHTML = shop.schedule
        .slice(0, 7)
        .map((item) => {
          if (!item || typeof item !== "object") return "";
          return `
            <p class="footer__text">
              ${escapeHTML(item.days)}<br />
              ${escapeHTML(item.time)}
            </p>
          `;
        })
        .join("");
    }

    const footerCopy = document.getElementById("footer-copy");
    if (footerCopy && shop.copyright) {
      footerCopy.textContent = String(shop.copyright).slice(0, 200);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// حالت خطا
// ═══════════════════════════════════════════════════════════════
function showErrorState(error) {
  const type = error?.type || "unknown";
  const msg = error?.userMessage || "ارتباط با سرور برقرار نشد.";
  const retry = () => loadAndRender();

  const topbar = document.getElementById("topbar-text");
  if (topbar) {
    const map = {
      offline: "📡 اتصال اینترنت قطع است — برخی اطلاعات در دسترس نیست",
      timeout: "⏱️ سرور پاسخ نداد — دوباره تلاش کنید",
      network: "🌐 خطا در ارتباط با سرور",
      http: `🚫 خطای سرور ${error?.status || ""}`.trim(),
      parse: "🧩 پاسخ سرور نامعتبر بود",
      unknown: "⚠️ اختلال موقت در سرویس",
    };
    topbar.textContent = map[type] || map.unknown;
  }

  renderError(document.getElementById("categories-grid"), {
    title: "دسته‌بندی‌ها در دسترس نیست",
    text: msg,
    onRetry: retry,
    errorType: type,
  });

  renderError(document.getElementById("special-track"), {
    title: "پیشنهاد ویژه در دسترس نیست",
    text: msg,
    onRetry: retry,
    errorType: type,
  });

  const banners = document.getElementById("banners-wrapper");
  if (banners) {
    renderError(banners, {
      title: "بنرها در دسترس نیست",
      text: "اطلاعات تبلیغاتی بارگذاری نشد.",
      onRetry: retry,
      errorType: type,
    });
  }

  renderError(document.getElementById("all-track"), {
    title: "خطا در دریافت محصولات",
    text: msg,
    onRetry: retry,
    errorType: type,
  });

  const catSections = document.getElementById("category-sections");
  if (catSections) catSections.innerHTML = "";

  const footerHelp = document.getElementById("footer-help");
  if (footerHelp) {
    footerHelp.innerHTML =
      '<li style="color:#94a3b8;font-size:.82rem">اطلاعات در دسترس نیست</li>';
  }
}

// ═══════════════════════════════════════════════════════════════
// حالت داده خالی
// ═══════════════════════════════════════════════════════════════
function showEmptyState() {
  renderEmpty(document.getElementById("categories-grid"), {
    icon: "📂",
    title: "هنوز دسته‌بندی‌ای اضافه نشده",
    text: "به‌زودی دسته‌بندی‌های جدید اضافه می‌شود.",
  });

  renderEmpty(document.getElementById("special-track"), {
    icon: "🔥",
    title: "پیشنهاد ویژه‌ای موجود نیست",
    text: "به‌زودی پیشنهادهای ویژه اضافه می‌شود.",
  });

  renderEmpty(document.getElementById("all-track"), {
    icon: "📦",
    title: "محصولی برای نمایش نیست",
    text: "به‌زودی محصولات جدید اضافه می‌شود.",
  });

  const banners = document.getElementById("banners-wrapper");
  if (banners) banners.innerHTML = "";

  const catSections = document.getElementById("category-sections");
  if (catSections) catSections.innerHTML = "";
}

// ═══════════════════════════════════════════════════════════════
// تابع اصلی لود + رندر
// ═══════════════════════════════════════════════════════════════
async function loadAndRender() {
  if (isLoading) return;
  isLoading = true;
  lastLoadError = null;

  // ─── اسکلتون‌ها ───
  renderSkeletonCategories(document.getElementById("categories-grid"), 7);
  renderSkeletonProducts(document.getElementById("special-track"), 4);
  renderSkeletonProducts(document.getElementById("all-track"), 8);

  const retryOptions = {
    onRetry: ({ attempt, waitMs }) =>
      showRetryToast({ attempt, total: 3, waitMs }),
  };

  let data = null;

  try {
    const [products, categories, shop, home, offers, stock] = await Promise.all(
      [
        api.products(retryOptions),
        api.categories(retryOptions),
        api.shop(retryOptions),
        api.home(retryOptions),
        api.offers(retryOptions),
        api.stock(retryOptions),
      ],
    );

    const validProducts = Array.isArray(products)
      ? products.filter(isValidProduct)
      : [];

    const validCategories = Array.isArray(categories)
      ? categories.filter(isValidCategory)
      : [];

    const validOffers = Array.isArray(offers)
      ? offers.filter(
          (o) =>
            o &&
            Number.isInteger(o.productId) &&
            o.productId > 0 &&
            Number.isFinite(o.percent) &&
            o.percent > 0 &&
            o.percent < 100,
        )
      : [];

    data = {
      products: validProducts,
      categories: validCategories,
      shop: shop && typeof shop === "object" ? shop : {},
      home: home && typeof home === "object" ? home : {},
      offers: validOffers,
      stock: stock && typeof stock === "object" ? stock : { items: {} },
    };
  } catch (err) {
    console.error("❌ خطا در لود داده‌ها:", err);
    lastLoadError = err instanceof ApiError ? err : new ApiError("خطای نامشخص");
  }

  isLoading = false;

  // ─── خطا ───
  if (!data) {
    showErrorState(lastLoadError);
    initCart();
    return;
  }

  // ─── داده خالی ───
  if (!data.products.length && !data.categories.length) {
    showEmptyState();
    initCart();
    return;
  }

  // ─── موفق ───
  renderAll(data);
  initCart();
}

// ═══════════════════════════════════════════════════════════════
// Online / Offline watcher
// ═══════════════════════════════════════════════════════════════
watchConnectivity({
  onOffline: () => {
    showOfflineBanner();
  },
  onOnline: () => {
    hideOfflineBanner();
    // اگه قبلاً خطا داشتیم یا داده‌ای لود نشده بود، دوباره امتحان کن
    if (lastLoadError || allProductsData.length === 0) {
      loadAndRender();
    }
  },
});

// اگه همین الان آفلاین بودیم
if (!navigator.onLine) showOfflineBanner();


loadAndRender();
