const API = "../../api/";
const CART_KEY = "clean-code-cart-count";

const $ = (sel) => document.querySelector(sel);

const faNum = (n) => new Intl.NumberFormat("fa-IR").format(n);

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(opts)) {
    if (key === "text") node.textContent = value;
    else if (key === "class") node.className = value;
    else if (key === "disabled") node.disabled = value;
    else node.setAttribute(key, value);
  }
  for (const child of children) node.append(child);
  return node;
}

const bdi = (n) => el("bdi", { dir: "ltr", text: faNum(n) });

function priceNode(amount, srLabel) {
  const b = el("b");
  if (srLabel) b.append(el("span", { class: "sr-only", text: srLabel }));
  b.append(bdi(amount));
  b.append(document.createTextNode(" تومان"));
  return b;
}

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status + " برای " + url);
  return res.json();
}

function productCard(product, qty, offer, idAttr) {
  const outOfStock = !qty || qty <= 0;
  const hasOffer = Boolean(offer) && !outOfStock;

  const pic = el("div", { class: "pic" }, [
    el("span", { "aria-hidden": "true", text: product.emoji }),
  ]);
  if (hasOffer) {
    pic.append(el("span", { class: "off", text: faNum(offer.percent) + "٪" }));
  }
  if (outOfStock) {
    pic.append(el("span", { class: "off sold", text: "ناموجود" }));
  }

  const price = el("p", { class: "price" });
  if (hasOffer) {
    const newPrice = Math.round((product.price * (100 - offer.percent)) / 100);
    const old = el("s", {}, [
      el("span", { class: "sr-only", text: "قیمت قبلی" }),
      bdi(product.price),
    ]);
    price.append(old, priceNode(newPrice, "قیمت"));
  } else {
    price.append(priceNode(product.price));
  }

  let button;
  if (outOfStock) {
    button = el("button", { type: "button", text: "ناموجود", disabled: true });
  } else {
    button = el("button", { type: "button", text: "افزودن به سبد" });
    button.addEventListener("click", () => addToCart());
  }

  const article = el(
    "article",
    { class: outOfStock ? "product namojud" : "product" },
    [
      pic,
      el("h3", { text: product.name }),
      el("p", { class: "amount", text: product.unit }),
      price,
      button,
    ],
  );

  const li = el("li", {}, [article]);
  if (idAttr) li.id = idAttr;
  return li;
}

// ---------- اسکلت لودینگ ----------
function skeletonItems(count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(
      el("li", {}, [
        el("article", { class: "product skeleton" }, [
          el("div", { class: "pic" }),
          el("h3", { class: "sk-line" }),
          el("p", { class: "sk-line short" }),
          el("p", { class: "sk-line" }),
        ]),
      ]),
    );
  }
  return items;
}

function fillSkeleton(ul, count) {
  ul.replaceChildren(...skeletonItems(count));
}

// ---------- رندر بخش‌ها ----------

// سطح ۳: دسته‌ها در گرید، منوی بالا و پابرگ
function renderCategories(categories) {
  const grid = $("#cat-list");
  grid.replaceChildren(
    ...categories.map((c) =>
      el("li", {}, [
        el("a", { href: "#" + c.slug }, [
          el("span", { "aria-hidden": "true", text: c.emoji }),
          document.createTextNode(" " + c.name),
        ]),
      ]),
    ),
  );

  // منوی اصلی: «همه دسته‌ها» (کشویی) + پیشنهاد ویژه + تک‌تک دسته‌ها
  const menu = $("#menu-list");
  const dropdown = el("ul", {}, categories.map(catLink));
  const allCats = el("li", { class: "all-cats" }, [
    el("a", { href: "#categories", text: "همه دسته‌ها" }),
    dropdown,
  ]);
  menu.replaceChildren(
    allCats,
    el("li", {}, [el("a", { href: "#offers", text: "پیشنهاد ویژه" })]),
    ...categories.map(catLink),
  );

  // دسته‌ها در پابرگ
  $("#footer-cats").replaceChildren(...categories.map(catLink));
}

function catLink(c) {
  return el("li", {}, [el("a", { href: "#" + c.slug, text: c.name })]);
}

// سطح ۲: ردیف پیشنهادها (ترکیب products + stock + offers)
function renderOffers(products, stockItems, offers) {
  const ul = $("#offers-row");
  const byId = new Map(products.map((p) => [p.id, p]));

  const items = offers
    .map((offer) => {
      const product = byId.get(offer.productId);
      if (!product) return null;
      const qty = stockItems[product.id];
      return { product, qty, offer };
    })
    .filter(Boolean);

  ul.replaceChildren(
    ...items.map((it, i) =>
      productCard(
        it.product,
        it.qty,
        it.offer,
        i === 0 ? "offer-start" : i === items.length - 1 ? "offer-end" : null,
      ),
    ),
  );
}

// سطح ۱ + ۴: یک بخش برای هر دسته با ردیف محصولات
function renderCategorySections(categories, products, stockItems, offers) {
  const wrap = $("#category-sections");
  const offerByProduct = new Map(offers.map((o) => [o.productId, o]));

  const sections = categories.map((cat) => {
    const list = products.filter((p) => p.categoryId === cat.id);

    const cards = list.map((product, i) =>
      productCard(
        product,
        stockItems[product.id],
        offerByProduct.get(product.id),
        i === 0
          ? cat.slug + "-start"
          : i === list.length - 1
            ? cat.slug + "-end"
            : null,
      ),
    );

    const row = el(
      "ul",
      { class: "row", tabindex: "0", "aria-label": cat.name },
      cards,
    );

    return el("section", { id: cat.slug }, [
      el("h2", {}, [
        el("span", { "aria-hidden": "true", text: cat.emoji + " " }),
        document.createTextNode(cat.name),
      ]),
      el("div", { class: "row-nav" }, [
        el("a", {
          href: "#" + cat.slug + "-start",
          text: "ابتدای " + cat.name,
        }),
        el("a", { href: "#" + cat.slug + "-end", text: "انتهای " + cat.name }),
      ]),
      row,
    ]);
  });

  wrap.replaceChildren(...sections);
}

// سطح ۳: اطلاعات فروشگاه (بنر ارسال، آدرس، تلفن، ساعت کاری)
function renderShopInfo(shop) {
  if (typeof shop.freeDeliveryOver === "number") {
    $("#free-delivery").textContent = faNum(shop.freeDeliveryOver);
  }

  $("#foot-city").textContent = shop.address || shop.city || "";

  if (shop.phone) {
    const phone = $("#foot-phone");
    phone.textContent = shop.phone;
    phone.setAttribute("dir", "ltr");
    phone.setAttribute("href", "tel:" + shop.phone.replace(/[^\d+]/g, ""));
  }

  // ساعت کاری: اگر schedule آرایه باشد هر سطر جدا، وگرنه از hours
  const hoursBox = $("#foot-hours");
  if (Array.isArray(shop.schedule) && shop.schedule.length) {
    hoursBox.replaceWith(
      ...shop.schedule.map((s) => el("p", { text: s.days + ": " + s.time }))
    );
  } else if (shop.hours && shop.hours.open && shop.hours.close) {
    hoursBox.textContent =
      "هر روز: " + faNum(shop.hours.open) + " تا " + faNum(shop.hours.close);
  }
}

// ---------- سبد خرید (localStorage) ----------
function getCartCount() {
  const raw = Number(localStorage.getItem(CART_KEY));
  return Number.isFinite(raw) && raw > 0 ? raw : 0;
}

function renderCartCount() {
  const count = getCartCount();
  $("#cart-count").textContent = faNum(count);
  $("#cart-summary").textContent =
    count > 0
      ? "سبد این هفته فقط نمایشی است. الان " + faNum(count) + " کالا داخلش است."
      : "سبد خرید شما خالی است.";
}

function addToCart() {
  localStorage.setItem(CART_KEY, String(getCartCount() + 1));
  renderCartCount();
}

// ---------- حالت‌ها ----------
function showLoading() {
  const status = $("#status");
  status.className = "status";
  status.textContent = "در حال بارگذاری…";
  status.hidden = false;
  fillSkeleton($("#offers-row"), 4);
}

function hideStatus() {
  $("#status").hidden = true;
}

function showError(error) {
  console.error(error);
  const status = $("#status");
  status.className = "status error";
  status.hidden = false;
  status.replaceChildren(
    document.createTextNode("اتصال برقرار نشد؛ لطفاً دوباره تلاش کنید. "),
    (() => {
      const btn = el("button", { type: "button", text: "تلاش دوباره" });
      btn.addEventListener("click", init);
      return btn;
    })(),
  );
  // اسکلت‌ها را پاک کن تا صفحه گیر نکند
  $("#offers-row").replaceChildren();
}

// ---------- شروع ----------
async function init() {
  renderCartCount();
  showLoading();

  try {
    // سطح ۴: هر پنج فایل همزمان با Promise.all
    const [products, categories, stock, offers, shop] = await Promise.all([
      getJSON(API + "products.json"),
      getJSON(API + "categories.json"),
      getJSON(API + "stock.json"),
      getJSON(API + "offers.json"),
      getJSON(API + "shop.json"),
    ]);

    const stockItems = stock.items || {};

    renderShopInfo(shop);
    renderCategories(categories);
    renderOffers(products, stockItems, offers);
    renderCategorySections(categories, products, stockItems, offers);

    hideStatus();
  } catch (error) {
    showError(error);
  }
}

init();
