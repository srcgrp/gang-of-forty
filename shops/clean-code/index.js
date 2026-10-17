const API = "../../api/";

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("bad response");
  }
  return await res.json();
}

function findOffer(offers, productId) {
  const found = offers.find(function (item) {
    return item.productId === productId;
  });
  if (found) {
    return found;
  }
  return null;
}

function productLine(product, qty, offer, toman) {
  let line = product.unit;

  if (qty === 0) {
    line += " — ناموجود";
  } else {
    line += " — مانده: " + toman.format(qty);
  }

  if (offer) {
    line += " — " + offer.label;
  }

  if (product.tags.length > 0) {
    line += " — " + product.tags.join("، ");
  }

  return line;
}

function addCatLinks(ul, categories) {
  for (const cat of categories) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + cat.slug;
    a.textContent = cat.name;
    li.appendChild(a);
    ul.appendChild(li);
  }
}

function fillShop(shop) {
  document.querySelector(".banner p").textContent = shop.notice;
  document.querySelector(".slogan").textContent = shop.slogan;
  document.querySelector("#about").textContent = shop.about;
  document.querySelector("#address").textContent = shop.address;
  document.querySelector("#hours-week").textContent =
    shop.schedule[0].days + ": " + shop.schedule[0].time;
  document.querySelector("#hours-fri").textContent =
    shop.schedule[1].days + ": " + shop.schedule[1].time;
  const phone = document.querySelector("#phone");
  phone.textContent = shop.phone;
  phone.setAttribute("href", "tel:" + shop.phone);
  phone.setAttribute("dir", "ltr");
  document.querySelector("#copyright").textContent =
    shop.copyright.replace("سوپرمارکت تمیز");
}

function fillMenu(shop, categories) {
  const list = document.querySelector("#menu-list");

  const all = document.createElement("li");
  all.className = "all-cats";
  const allLink = document.createElement("a");
  allLink.href = "#categories";
  allLink.textContent = "همه دسته‌ها";
  const sub = document.createElement("ul");
  addCatLinks(sub, categories);
  all.appendChild(allLink);
  all.appendChild(sub);
  list.appendChild(all);

  for (const item of shop.menu) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    list.appendChild(li);
  }

  const cartLi = document.createElement("li");
  const cartA = document.createElement("a");
  cartA.href = "#cart";
  cartA.textContent = "سبد خرید";
  cartLi.appendChild(cartA);
  list.appendChild(cartLi);
}

function fillFooter(shop, categories) {
  addCatLinks(document.querySelector("#footer-cats"), categories);

  const helpList = document.querySelector("#footer-help");
  for (const item of shop.help) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    helpList.appendChild(li);
  }
}

function fillCategories(categories) {
  const list = document.querySelector("#cat-list");
  for (const cat of categories) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + cat.slug;

    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = cat.emoji;
    icon.style.backgroundColor = cat.color;

    a.appendChild(icon);
    a.appendChild(document.createTextNode(cat.name));
    li.appendChild(a);
    list.appendChild(li);
  }
}

function fillHero(home) {
  const box = document.querySelector("#hero");

  const fruit = document.createElement("article");
  fruit.className = "promo fruit";
  const fruitTitle = document.createElement("h2");
  fruitTitle.textContent = home.hero.title;
  const fruitText = document.createElement("p");
  fruitText.textContent = home.hero.text;
  const fruitBtn = document.createElement("a");
  fruitBtn.className = "pill gold";
  fruitBtn.href = home.hero.cta.href;
  fruitBtn.textContent = home.hero.cta.label;
  const fruitEmoji = document.createElement("span");
  fruitEmoji.className = "hero-emoji";
  fruitEmoji.textContent = home.hero.emoji;
  fruit.appendChild(fruitTitle);
  fruit.appendChild(fruitText);
  fruit.appendChild(fruitBtn);
  fruit.appendChild(fruitEmoji);

  const side = document.createElement("article");
  side.className = "promo dairy-off";
  const sideTitle = document.createElement("h3");
  sideTitle.textContent = home.side.title;
  const sideText = document.createElement("p");
  sideText.textContent = home.side.text;
  const sideEmoji = document.createElement("span");
  sideEmoji.className = "hero-emoji";
  sideEmoji.textContent = home.side.emoji;
  const sideBtn = document.createElement("a");
  sideBtn.className = "pill";
  sideBtn.href = home.side.cta.href;
  sideBtn.textContent = home.side.cta.label;
  side.appendChild(sideTitle);
  side.appendChild(sideText);
  side.appendChild(sideEmoji);
  side.appendChild(sideBtn);

  box.appendChild(fruit);
  box.appendChild(side);
}

function fillPromos(home) {
  const box = document.querySelector("#promos");
  for (const item of home.promos) {
    const a = document.createElement("a");
    a.className = "strip";
    a.href = item.href;
    a.style.backgroundColor = item.color;

    const text = document.createElement("span");
    text.textContent = item.text;

    const emoji = document.createElement("span");
    emoji.className = "strip-emoji";
    emoji.textContent = item.emoji;

    a.appendChild(text);
    a.appendChild(emoji);
    box.appendChild(a);
  }
}

function makeCarousel(id, title) {
  const section = document.createElement("section");
  section.id = id;

  const h2 = document.createElement("h2");
  h2.textContent = title;
  section.appendChild(h2);

  const nav = document.createElement("div");
  nav.className = "row-nav";
  const start = document.createElement("a");
  start.href = "#" + id + "-start";
  start.textContent = "اولین محصول";
  const end = document.createElement("a");
  end.href = "#" + id + "-end";
  end.textContent = "آخرین محصول";
  nav.appendChild(start);
  nav.appendChild(end);
  section.appendChild(nav);

  const row = document.createElement("ul");
  row.className = "row";
  row.setAttribute("tabindex", "0");
  section.appendChild(row);

  return { section, row };
}

function addCards(row, products, makeItem, startId, endId) {
  for (let i = 0; i < products.length; i++) {
    const li = makeItem(products[i]);
    if (i === 0) {
      li.id = startId;
    }
    if (i === products.length - 1) {
      li.id = endId;
    }
    row.appendChild(li);
  }
}

function fillCarousels(home, categories, products, offers, makeItem) {
  const featured = document.querySelector("#featured");
  const more = document.querySelector("#carousels");
  const used = {};

  for (const item of home.carousels) {
    let list;
    if (item.source === "offers") {
      list = products.filter(function (product) {
        return findOffer(offers, product.id);
      });
    } else {
      list = products.filter(function (product) {
        return product.categoryId === item.categoryId;
      });
    }

    const parts = makeCarousel(item.id, item.emoji + " " + item.title);
    addCards(parts.row, list, makeItem, item.id + "-start", item.id + "-end");
    featured.appendChild(parts.section);
    used[item.id] = true;
  }

  for (const cat of categories) {
    if (used[cat.slug]) {
      continue;
    }
    const list = products.filter(function (product) {
      return product.categoryId === cat.id;
    });
    const parts = makeCarousel(cat.slug, cat.emoji + " " + cat.name);
    addCards(parts.row, list, makeItem, cat.slug + "-start", cat.slug + "-end");
    more.appendChild(parts.section);
  }
}

function filterProducts(q) {
  const items = document.querySelectorAll("#featured li, #carousels li");
  for (const li of items) {
    li.hidden = !li.textContent.includes(q);
  }

  const sections = document.querySelectorAll(
    "#featured section, #carousels section",
  );
  for (const section of sections) {
    const list = section.querySelector(".row");
    let visible = 0;
    for (const li of list.children) {
      if (!li.hidden) {
        visible = visible + 1;
      }
    }
    section.hidden = visible === 0;
  }
}

function makePic(product, qty, offer, toman) {
  const pic = document.createElement("div");
  pic.className = "pic";

  const emoji = document.createElement("span");
  emoji.textContent = product.emoji;
  pic.appendChild(emoji);

  if (qty === 0) {
    const badge = document.createElement("span");
    badge.className = "off sold";
    badge.textContent = "ناموجود";
    pic.appendChild(badge);
  } else if (offer) {
    const badge = document.createElement("span");
    badge.className = "off";
    badge.textContent = toman.format(offer.percent) + "٪";
    pic.appendChild(badge);
  }

  return pic;
}

function makeAmount(product, qty, toman) {
  const amount = document.createElement("p");
  amount.className = "amount";
  if (qty === 0) {
    amount.textContent = product.unit;
  } else {
    amount.textContent = product.unit + " · مانده " + toman.format(qty);
  }
  return amount;
}

function makePrice(product, qty, offer, toman) {
  const price = document.createElement("p");
  price.className = "price";

  if (offer && qty !== 0) {
    const oldPrice = document.createElement("s");
    oldPrice.textContent = toman.format(product.price) + " تومان";
    price.appendChild(oldPrice);

    const newPrice = (product.price * (100 - offer.percent)) / 100;
    const now = document.createElement("span");
    now.textContent = toman.format(newPrice) + " تومان";
    price.appendChild(now);
  } else {
    price.textContent = toman.format(product.price) + " تومان";
  }

  return price;
}

function makeButton(qty, onAdd) {
  const btn = document.createElement("button");
  btn.type = "button";
  if (qty === 0) {
    btn.textContent = "ناموجود";
    btn.disabled = true;
  } else {
    btn.textContent = "افزودن به سبد";
    btn.addEventListener("click", onAdd);
  }
  return btn;
}

async function loadPage() {
  const status = document.querySelector("#status");

  try {
    const toman = new Intl.NumberFormat("fa-IR");

    const [products, stock, offers, categories, shop, home] = await Promise.all(
      [
        getJSON(API + "products.json"),
        getJSON(API + "stock.json"),
        getJSON(API + "offers.json"),
        getJSON(API + "categories.json"),
        getJSON(API + "shop.json"),
        getJSON(API + "home.json"),
      ],
    );

    fillShop(shop);
    fillMenu(shop, categories);
    fillFooter(shop, categories);
    fillCategories(categories);
    fillHero(home);
    fillPromos(home);

    document.querySelector("#q").placeholder =
      "جستجو در میان " + toman.format(products.length) + " کالا…";

    const countEl = document.querySelector(".cart-count");
    let count = Number(localStorage.getItem("cartCount")) || 0;
    const cartText = document.querySelector("#cart-text");

    function updateCart() {
      countEl.textContent = toman.format(count);
      if (count === 0) {
        cartText.textContent = "سبد خالی است.";
      } else {
        cartText.textContent = "تعداد کالا در سبد: " + toman.format(count);
      }
    }

    function makeProductItem(product) {
      const li = document.createElement("li");
      const qty = stock.items[product.id];
      const offer = findOffer(offers, product.id);

      if (qty === 0) {
        li.className = "product out-of-stock";
      } else {
        li.className = "product";
      }

      const name = document.createElement("h3");
      name.textContent = product.name;

      const extra = document.createElement("span");
      extra.hidden = true;
      extra.textContent = productLine(product, qty, offer, toman);

      li.appendChild(makePic(product, qty, offer, toman));
      li.appendChild(name);
      li.appendChild(makeAmount(product, qty, toman));
      li.appendChild(extra);
      li.appendChild(makePrice(product, qty, offer, toman));
      li.appendChild(
        makeButton(qty, function () {
          count = count + 1;
          localStorage.setItem("cartCount", count);
          updateCart();
        }),
      );

      return li;
    }

    fillCarousels(home, categories, products, offers, makeProductItem);
    updateCart();

    document
      .querySelector("#clear-cart")
      .addEventListener("click", function () {
        count = 0;
        localStorage.setItem("cartCount", count);
        updateCart();
      });

    document.querySelector("#q").addEventListener("input", function () {
      filterProducts(this.value);
    });

    document.querySelector(".search").addEventListener("submit", function (e) {
      e.preventDefault();
    });

    status.textContent = "";
    status.hidden = true;
  } catch (err) {
    status.hidden = false;
    status.className = "status error";
    status.textContent = "بارگذاری نشد. صفحه را رفرش کن.";
  }
}

loadPage();
