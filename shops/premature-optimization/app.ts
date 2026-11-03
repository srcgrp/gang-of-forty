import * as Types from "./types"
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { gsap } from "gsap";
import { fetchApiFile } from "./api";

const numberFormatter: Intl.NumberFormat = new Intl.NumberFormat("fa-IR")
const CART_STORAGE_KEY: string = "superino-cart"
let cart = readCart()
let cartProducts: Types.Product[] = [];
const STOCK_STORAGE_KEY = "superino-stock";
let currentStock: Types.Stock = {
  updatedAt: "",
  items: {},
};

const notyf = new Notyf({
  duration: 5000,
  position: {
    x: "right",
    y: "bottom",
  },
  dismissible: true,
});

const makeElement: Types.MakeElement = (tag, className = "", text = "") => {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (text !== "") element.textContent = text

  return element
};

const appendLink: Types.AppendLinks = (container, label, href = "#", className = "") => {
  const link = makeElement("a", className, label)
  link.href = href || "#"
  container.append(link)
  return link
}

function saveCartAndStock(): boolean {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(currentStock));
    return true;
  } catch {
    notyf.error("ذخیره تغییرات با خطا مواجه شد");
    return false;
  }
}

function updateProductStockUI(productId: string): void {
  const quantity: number = currentStock.items[productId] ?? 0;
  document.querySelectorAll<HTMLButtonElement>(
    `.buy-button[data-product-id="${CSS.escape(productId)}"]`
  ).forEach((button: HTMLButtonElement): void => {
    const card = button.closest<HTMLElement>(".product-item");
    if (!card) return;
    const outOfStock: boolean = quantity <= 0;
    button.disabled = outOfStock;
    button.title = outOfStock ? "موجودی این محصول تمام شده است" : "افزودن محصول به سبد خرید";
    card.classList.toggle("product-item--unavailable", outOfStock);
  });
}

function readCart(): Types.Cart {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}")

    if (!value || typeof value !== "object" || Array.isArray(value)) return {}
    const entries = Object.entries(value)
    const validEntries: [string, number][] = entries.filter(
      (entry): entry is [string, number] =>
        typeof entry[0] === "string" &&
        typeof entry[1] === "number" &&
        Number.isFinite(entry[1]) &&
        entry[1] > 0
    )
    return Object.fromEntries(validEntries)
  } catch {
    return {}
  }
}

function updateCartCount(): void {
  const count: number = Object.values(cart).reduce(
    (sum: number, value: number): number => sum + Math.max(0, value),
    0
  );
  const badge: HTMLSpanElement | null = document.querySelector<HTMLSpanElement>("#cart-count");

  if (badge) badge.textContent = numberFormatter.format(count);
  renderCartDropdown();
}

function animateCartIcon(): void {
  const cartButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>("#cart-button");
  if (!cartButton) return;

  gsap.killTweensOf(cartButton);
  gsap.fromTo(
    cartButton,
    { scale: 1 },
    {
      scale: 1.2,
      duration: 0.16,
      repeat: 1,
      yoyo: true,
      ease: "power2.out",
      onComplete: (): void => {
        gsap.set(cartButton, { clearProps: "transform" });
      },
    }
  );
}

function animateProductToCart(button: HTMLButtonElement): void {
  const card: HTMLElement | null = button.closest<HTMLElement>(".product-item");
  const productImage: HTMLImageElement | null =
    card?.querySelector<HTMLImageElement>(".product-icon img") ?? null;
  const cartButton: HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>("#cart-button");

  if (!productImage || !cartButton) {
    animateCartIcon();
    return;
  }

  const imageRect: DOMRect = productImage.getBoundingClientRect();
  const cartRect: DOMRect = cartButton.getBoundingClientRect();
  if (imageRect.width <= 0 || imageRect.height <= 0) {
    animateCartIcon();
    return;
  }

  const flyingImage: HTMLImageElement = productImage.cloneNode(true) as HTMLImageElement;
  Object.assign(flyingImage.style, {
    position: "fixed",
    left: `${imageRect.left}px`,
    top: `${imageRect.top}px`,
    width: `${imageRect.width}px`,
    height: `${imageRect.height}px`,
    objectFit: "contain",
    margin: "0",
    zIndex: "9999",
    pointerEvents: "none",
    transformOrigin: "center center",
    willChange: "transform, opacity",
  });
  document.body.append(flyingImage);

  const deltaX: number = cartRect.left + cartRect.width / 2 - (imageRect.left + imageRect.width / 2);
  const deltaY: number = cartRect.top + cartRect.height / 2 - (imageRect.top + imageRect.height / 2);

  gsap.to(flyingImage, {
    x: deltaX,
    y: deltaY,
    scale: 0.15,
    rotation: 12,
    opacity: 0.25,
    duration: 0.65,
    ease: "power2.in",
    onComplete: (): void => {
      flyingImage.remove();
      animateCartIcon();
    },
    onInterrupt: (): void => flyingImage.remove(),
  });
}

function renderCartDropdown(): void {
  const container = document.querySelector<HTMLDivElement>("#cart-dropdown-items")
  if (!container) return

  container.replaceChildren()
  const entries = Object.entries(cart).filter(([, quantity]) => Number(quantity) > 0)

  if (entries.length === 0) {
    container.append(makeElement("p", "cart-empty", "سبد خرید شما خالی است"))
    return
  }

  entries.forEach(([productId, quantity]) => {
    const product = cartProducts.find((item) => String(item.id) === productId)
    const row = makeElement("div", "cart-dropdown-item")
    const details = makeElement("div", "cart-dropdown-details")
    details.append(
      makeElement("span", "cart-dropdown-name", product?.name || `محصول ${productId}`),
      makeElement("span", "cart-dropdown-quantity", `تعداد: ${numberFormatter.format(Number(quantity) || 0)}`)
    )
    const removeButton = makeElement("button", "cart-remove-button", "❌")
    removeButton.type = "button"
    removeButton.dataset.cartRemoveId = productId
    removeButton.setAttribute("aria-label", `حذف ${product?.name || "محصول"} از سبد خرید`)
    removeButton.title = "حذف محصول"
    row.append(details, removeButton)
    container.append(row)
  })
}

function removeFromCart(productId: string): void {
  if (!(productId in cart)) return;

  const previousQuantity = Number(cart[productId]) || 0;
  if (previousQuantity <= 0) return;

  const previousStock = currentStock.items[productId] ?? 0;
  const lastUpdate = currentStock.updatedAt;

  if (previousQuantity > 1) {
    cart[productId] = previousQuantity - 1;
  } else {
    delete cart[productId];
  }

  currentStock.items[productId] = previousStock + 1;
  currentStock.updatedAt = String(Date.now())

  if (!saveCartAndStock()) {
    cart[productId] = previousQuantity;
    currentStock.items[productId] = previousStock;
    currentStock.updatedAt = lastUpdate;
    updateCartCount();
    return;
  }

  updateCartCount();
  updateProductStockUI(productId);
  notyf.success("محصول از سبد خرید حذف شد");
}


function addToCart(productId: string | undefined, button?: HTMLButtonElement): void {
  if (!productId) {
    notyf.error("شناسه محصول معتبر نیست");
    return;
  }

  const key = String(productId);
  const stock = currentStock.items[key] ?? 0;

  if (stock <= 0) {
    notyf.error("موجودی این محصول تمام شده است");
    return;
  }

  const previousQuantity = Number(cart[key]) || 0;
  const lastUpdate = currentStock.updatedAt;


  cart[key] = previousQuantity + 1;
  currentStock.items[key] = stock - 1;
  currentStock.updatedAt = String(Date.now())

  if (!saveCartAndStock()) {
    cart[key] = previousQuantity;
    if (previousQuantity === 0) delete cart[key];
    currentStock.items[key] = stock;
    currentStock.updatedAt = lastUpdate;
    return;
  }

  updateCartCount();
  updateProductStockUI(key);
  if (button) animateProductToCart(button);
  else animateCartIcon();
  notyf.success("محصول به سبد خرید اضافه شد");
}


function makeSkeleton(className: string = ""): HTMLDivElement {
  return makeElement("div", `skeleton ${className}`.trim())
}

function renderLoadingSkeletons(): void {
  const banner = document.querySelector<HTMLElement>("#home-banners")
  const categories = document.querySelector<HTMLDivElement>("#category-cards")
  const carouselContainer = document.querySelector<HTMLDivElement>("#home-carousels")
  const promos = document.querySelector<HTMLElement>("#home-promos")
  if (!banner || !categories || !carouselContainer || !promos) {
    return
  }
  banner.replaceChildren(makeSkeleton("skeleton-banner"), makeSkeleton("skeleton-banner"))
  categories.replaceChildren(...Array.from({ length: 7 }, () => makeSkeleton("skeleton-category")))
  carouselContainer.replaceChildren()
  for (let i = 0; i < 2; i++) {
    const section: HTMLElement = makeElement("section", "recommendation")
    section.append(makeSkeleton("skeleton-heading"))
    const row: HTMLDivElement = makeElement("div", "skeleton-products")
    for (let j = 0; j < 4; j++) row.append(makeSkeleton("skeleton-product"))
    section.append(row)
    carouselContainer.append(section)
  }
  promos.replaceChildren(makeSkeleton("skeleton-banner"), makeSkeleton("skeleton-banner"))
}

function makeProductCard(
  product: Types.Product,
  { offer, stock, categoryName }: Types.ProductCardOptions
): HTMLLIElement {
  const card: HTMLLIElement = makeElement("li", "product-item");
  const image: HTMLDivElement = makeElement("div", "product-icon product-emoji");
  const img: HTMLImageElement = makeElement("img");
  img.src = product.image;
  img.alt = product.name;
  image.append(img);

  const tag: HTMLParagraphElement = makeElement(
    "p", "item-tag", categoryName || product.categoryName || "محصول"
  );
  const quantity: number = stock.items[String(product.id)] ?? 0;
  const outOfStock: boolean = quantity <= 0;
  const discount: HTMLSpanElement = makeElement("span", "product-discount");
  const title: HTMLHeadingElement = makeElement("h3", "item-title", product.name);
  const description: HTMLParagraphElement = makeElement("p", "item-description", product.unit);
  const oldPrice: HTMLParagraphElement = makeElement("p", "item-old-price");
  const buyRow: HTMLDivElement = makeElement("div", "item-buy");
  const price: HTMLSpanElement = makeElement("span", "item-price");
  const finalPrice: number = offer
    ? Math.round(product.price * (100 - offer.percent) / 100)
    : product.price;

  price.textContent = `${numberFormatter.format(finalPrice)} تومان`;
  if (offer) {
    discount.textContent = `${numberFormatter.format(offer.percent)}٪`;
    oldPrice.textContent = `${numberFormatter.format(product.price)} تومان`;
  } else {
    discount.hidden = true;
    oldPrice.hidden = true;
  }

  const button: HTMLButtonElement = makeElement("button", "buy-button", "+");
  button.type = "button";
  button.dataset.productId = String(product.id);
  button.disabled = outOfStock;
  button.title = outOfStock
    ? "موجودی این محصول تمام شده است"
    : `افزودن ${product.name} به سبد خرید`;

  if (outOfStock) card.classList.add("product-item--unavailable");
  buyRow.append(price, button);
  card.append(image, tag, discount, title, description, oldPrice, buyRow);
  return card;
}

function renderProducts(container: HTMLElement, products: Types.Product[], optionsForProduct: Types.OptionsForProduct): void {
  const fragment = document.createDocumentFragment()
  products.forEach((product: Types.Product) =>
    fragment.append(
      makeProductCard(product, optionsForProduct(product))
    )
  )
  container.replaceChildren(fragment)

  const cards: NodeListOf<HTMLElement> = container.querySelectorAll<HTMLElement>(".product-item");
  if (cards.length > 0) {
    gsap.from(cards, {
      opacity: 0,
      duration: 0.5,
      stagger: 0.35,
      ease: "power2.out",
      clearProps: "all",
    });
  }
}

function setupCarousel({
  products,
  viewport,
  previous,
  next,
}: Types.CarouselElements): void {
  const carousel: Types.CarouselState = {
    offset: 0,
    step: 0,
    maxOffset: 0,
  };
  const update = (): void => {
    const firstCard = products.querySelector<HTMLLIElement>(".product-item");
    if (!firstCard) {
      previous.disabled = true;
      next.disabled = true;
      return;
    }
    const styles = getComputedStyle(products);
    const gap: number = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    carousel.step = firstCard.getBoundingClientRect().width + gap;
    carousel.maxOffset = Math.max(0, products.scrollWidth - viewport.clientWidth);
    carousel.offset = Math.min(carousel.offset, carousel.maxOffset);
    gsap.set(products, { x: carousel.offset });
    previous.disabled = carousel.offset <= 0;
    next.disabled = carousel.offset >= carousel.maxOffset - 1;
  };
  const move = (direction: -1 | 1): void => {
    carousel.offset = Math.max(0, Math.min(carousel.maxOffset, carousel.offset + direction * carousel.step));
    gsap.to(products, {
      x: carousel.offset,
      duration: 0.15,
      ease: "power2.out",
      overwrite: true,
    });
    previous.disabled = carousel.offset <= 0;
    next.disabled = carousel.offset >= carousel.maxOffset - 1;
  };
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  window.addEventListener("resize", update);
  requestAnimationFrame(update);
}

function renderShopDetails(shop: Types.Shop): void {
  const setText = (
    selector: string,
    value: string | null | undefined
  ): void => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element && value != null) {
      element.textContent = value;
      element.classList.remove("skeleton-text");
    }
  };
  setText("#shop-notice", shop.notice);
  setText("#shop-name", "سوپرینو");
  setText("#footer-shop-name", "سوپرینو");
  setText("#shop-slogan", shop.slogan);
  setText("#shop-about", shop.about);
  setText("#shop-address", shop.address);
  setText("#shop-phone", shop.phone);
  const copyright: string = String(shop.copyright || "").trim();
  setText("#shop-copyright", copyright || "© سوپرینو");

  const menu = document.querySelector<HTMLDivElement>("#shop-menu-links");
  const hours = document.querySelector<HTMLDivElement>("#shop-hours");
  if (!menu || !hours) {
    return
  }
  menu.replaceChildren();
  (shop.menu || []).forEach((item) => appendLink(menu, item.label, item.href, "menu-texts"));
  hours.replaceChildren();
  (shop.schedule || []).forEach((item) => hours.append(makeElement("p", "", `${item.days}: ${item.time}`)));
}

function renderCategories(categories: Types.Category[]): void {
  const categoryMenu = document.querySelector<HTMLDivElement>("#category-menu-links");
  const categoryCards = document.querySelector<HTMLDivElement>("#category-cards");
  const footerCategories = document.querySelector<HTMLDivElement>("#footer-category-links");
  if (!categoryMenu || !categoryCards || !footerCategories) {
    return
  }
  categoryMenu.replaceChildren();
  categoryCards.replaceChildren();
  footerCategories.replaceChildren();
  categories.forEach((category) => {
    const href: string = `#${category.slug}`;
    appendLink(categoryMenu, `${category.emoji || "🛒"} ${category.name}`, href, "hidden-content-links");
    const card: HTMLAnchorElement = appendLink(categoryCards, "", href, "categories-box");
    const icon: HTMLSpanElement = makeElement("span", "categories-icon");
    icon.style.backgroundColor = category.color || "var(--light-blue)";
    if (category.image?.endsWith(".svg")) {
      const image: HTMLImageElement = makeElement("img");
      image.src = category.image;
      image.alt = category.name || "";
      icon.append(image);
    } else {
      icon.textContent = category.emoji || "🛒";
    }
    card.append(icon, makeElement("p", "categories-name", category.name));
    appendLink(footerCategories, category.name, href);
  });
}

function makeBanner(data: Types.BannerData | null | undefined, variant: string): HTMLElement | null {
  if (!data) return null;
  const article = makeElement("article", variant);
  const content = makeElement("div", `banner-content ${variant}-content`);
  content.append(makeElement("h2", `banner-title ${variant}-title`, `${data.title || ""}`.trim()));
  content.append(makeElement("p", `banner-details ${variant}-details`, data.text || ""));
  if (data.cta) appendLink(content, data.cta.label || "مشاهده", data.cta.href || "#", `banner-button ${variant}-button`);
  const icon = makeElement("span", "banner-art");
  if (data.emoji?.endsWith(".svg")) {
    const image = makeElement("img");
    image.src = data.emoji;
    image.alt = data.name ?? data.title;
    icon.append(image);
  } else {
    icon.textContent = data.emoji || "🛍️";
  }
  article.append(content, icon);
  return article;
}

function renderHeroBanners(home: Types.Home): void {
  const container = document.querySelector<HTMLElement>("#home-banners");
  if (container) {
    container.replaceChildren();
    const hero = makeBanner(home.hero, "banner-fruit");
    const side = makeBanner(home.side, "banner-sale");
    if (hero) container.append(hero);
    if (side) container.append(side);
  }
}

function renderPromos(home: Types.Home): void {
  const container = document.querySelector<HTMLElement>("#home-promos");
  if (container) {
    container.replaceChildren();
    (home.promos || []).forEach((promo, index) => {
      const variant = index % 2 === 0 ? "banner-breakfast" : "banner-bread";
      const article = makeElement("article", variant);
      const content = makeElement("div", "banner-content");
      content.append(makeElement("h2", "banner-title", `${promo.text || ""}`.trim()));
      appendLink(content, "دیدن محصولات", promo.href || "#", "promo-link");
      const icon = makeElement("span", "promo-emoji");
      if (promo.emoji?.endsWith(".svg")) {
        const image = makeElement("img");
        image.src = promo.emoji;
        image.alt = promo.name ?? promo.text;
        icon.append(image);
      } else {
        icon.textContent = promo.emoji || "🛍️";
      }
      article.append(content, icon);
      container.append(article);
    });
  }
}

function createCarouselSection(
  config: Types.CarouselConfig,
  products: Types.Product[],
  stock: Types.Stock,
  offersByProductId: Map<number, Types.Offer>,
  categories: Types.Category[]
): HTMLElement {
  const section = makeElement("section", "recommendation");
  section.id = config.id;
  section.append(makeElement("h2", "recommendation-title", `${config.emoji || "🛒"} ${config.title || "محصولات"}`.trim()));
  const carousel = makeElement("div", "dairy-carousel");
  const viewport = makeElement("div", "dairy-carousel-viewport");
  const list = makeElement("ul", "products");
  const previous = makeElement("button", "dairy-prev-button", "→");
  previous.type = "button"; previous.disabled = true; previous.title = "محصول قبلی";
  const next = makeElement("button", "dairy-next-button", "←");
  next.type = "button"; next.title = "محصول بعدی";
  const controls = makeElement("div", "dairy-carousel-controls");
  controls.append(previous, next);
  viewport.append(list); carousel.append(viewport, controls); section.append(carousel);

  let selected: Types.Product[];
  if (config.source === "offers" || config.id === "offers") {
    selected = products.filter((product) => {
      const offer = offersByProductId.get(product.id);
      return offer?.label === "پیشنهاد ویژه";
    });
  } else {
    const categoryId = config.categoryId ?? config.category?.id;
    selected = products.filter(
      (product) => product.categoryId === categoryId
    );
  }
  const category = categories.find((item) => item.id === (config.categoryId ?? config.category?.id));
  renderProducts(list, selected, (product) => ({ offer: offersByProductId.get(product.id), stock, categoryName: category?.name || config.title || "محصول" }));
  if (!selected.length) section.append(makeElement("p", "empty-message", "محصولی برای نمایش وجود ندارد."));
  setupCarousel({ products: list, viewport, previous, next });
  return section;
}

function renderHomeCarousels(
  home: Types.Home,
  products: Types.Product[],
  stock: Types.Stock,
  offersByProductId: Map<number, Types.Offer>,
  categories: Types.Category[]
): Set<number> | null {
  const container = document.querySelector<HTMLDivElement>("#home-carousels");
  if (!container) {
    return null
  }
  container.replaceChildren();

  const configuredCategoryIds: Set<number> = new Set<number>();

  (home.carousels ?? [])
    .filter((config) => config.title !== "لبنیات")
    .forEach((config) => {
      if (config.categoryId != null) {
        configuredCategoryIds.add(config.categoryId);
      } else if (config.category?.id != null) {
        configuredCategoryIds.add(config.category.id);
      }

      container.append(
        createCarouselSection(
          config,
          products,
          stock,
          offersByProductId,
          categories
        )
      );
    });

  return configuredCategoryIds;
}

function renderRemainingCategoryCarousels(
  home: Types.Home,
  categories: Types.Category[],
  products: Types.Product[],
  stock: Types.Stock,
  offersByProductId: Map<number, Types.Offer>,
  configuredCategoryIds: Set<number> | null
): void {
  const container = document.querySelector<HTMLDivElement>("#category-product-sections");
  if (!container) return;
  container.replaceChildren();

  const renderedCategoryIds: Set<number> = new Set(configuredCategoryIds ?? []);
  (home.carousels ?? [])
    .filter((config: Types.CarouselConfig) => config.id !== "offers" && config.title !== "پیشنهاد ویژه")
    .forEach((config: Types.CarouselConfig): void => {
      const categoryId: number | undefined = config.categoryId ?? config.category?.id;
      if (categoryId == null || renderedCategoryIds.has(categoryId)) return;
      container.append(createCarouselSection(config, products, stock, offersByProductId, categories));
      renderedCategoryIds.add(categoryId);
    });

  categories
    .filter((category: Types.Category) => !renderedCategoryIds.has(category.id))
    .forEach((category: Types.Category): void => {
      container.append(createCarouselSection({
        id: category.slug,
        title: category.name,
        emoji: category.emoji,
        categoryId: category.id,
      }, products, stock, offersByProductId, categories));
      renderedCategoryIds.add(category.id);
    });
}

function setupSearch(products: Types.Product[]): void {
  const input = document.querySelector<HTMLInputElement>(".search-entry");
  if (input) input.placeholder = `جستجو در میان ${numberFormatter.format(products.length)} کالا...`;
}

async function loadPage(): Promise<void> {
  try {
    const [products, stock, offers, categories, shop, home] = await Promise.all([
      fetchApiFile<Types.Product[]>("products.json"),
      fetchApiFile<Types.Stock>("stock.json"),
      fetchApiFile<Types.Offer[]>("offers.json"),
      fetchApiFile<Types.Category[]>("categories.json"),
      fetchApiFile<Types.Shop>("shop.json"),
      fetchApiFile<Types.Home>("home.json"),
    ]);

    currentStock = stock;
    try {
      const savedStock: string | null = localStorage.getItem(STOCK_STORAGE_KEY);
      if (savedStock) {
        const parsed: unknown = JSON.parse(savedStock);
        if (
          parsed !== null &&
          typeof parsed === "object" &&
          "items" in parsed &&
          parsed.items !== null &&
          typeof parsed.items === "object" &&
          !Array.isArray(parsed.items)
        ) {
          const validStockEntries: [string, number][] = Object.entries(parsed.items).filter(
            (entry): entry is [string, number] =>
              typeof entry[0] === "string" &&
              typeof entry[1] === "number" &&
              Number.isFinite(entry[1]) &&
              entry[1] >= 0
          );
          currentStock.items = {
            ...currentStock.items,
            ...Object.fromEntries(validStockEntries),
          };
        }
      }
    } catch {
      localStorage.removeItem(STOCK_STORAGE_KEY);
    }

    cartProducts = products;
    renderCartDropdown();

    const offersByProductId: Map<number, Types.Offer> = new Map(
      offers.map((offer: Types.Offer): [number, Types.Offer] => [offer.productId, offer])
    );

    renderShopDetails(shop);
    renderCategories(categories);
    renderHeroBanners(home);
    renderPromos(home);

    const configuredCategoryIds: Set<number> | null = renderHomeCarousels(
      home, products, currentStock, offersByProductId, categories
    );
    renderRemainingCategoryCarousels(
      home, categories, products, currentStock, offersByProductId, configuredCategoryIds
    );
    setupSearch(products);
    updateCartCount();
    products.forEach((product: Types.Product): void => updateProductStockUI(String(product.id)));
  } catch (error: unknown) {
    document.querySelectorAll<HTMLElement>(".skeleton-text").forEach((item: HTMLElement): void => {
      item.classList.remove("skeleton-text");
    });
    const main = document.querySelector<HTMLElement>("#main-content");
    if (main) {
      main.querySelector<HTMLElement>(".api-status--error")?.remove();
      main.prepend(makeElement(
        "p",
        "api-status api-status--error",
        "بارگذاری اطلاعات با مشکل مواجه شد. مطمئن شو پروژه را با Live Server یا یک سرور محلی اجرا کرده‌ای."
      ));
      console.error("خطا در بارگذاری APIهای سوپرینو:", error);
    }
  }
}

document.addEventListener("click", (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return;

  const removeButton = event.target.closest<HTMLButtonElement>("[data-cart-remove-id]");
  if (removeButton) {
    event.preventDefault();
    event.stopPropagation();
    removeFromCart(removeButton.dataset.cartRemoveId || "");
    return;
  }

  const cartButton = event.target.closest<HTMLButtonElement>("#cart-button");
  if (cartButton) {
    const wrapper = cartButton.closest<HTMLElement>(".cart-dropdown-wrap");
    const isOpen = wrapper?.classList.toggle("is-open") ?? false;
    cartButton.setAttribute("aria-expanded", String(isOpen));
    return;
  }

  const button = event.target.closest<HTMLButtonElement>(".buy-button[data-product-id]");
  if (button && !button.disabled) addToCart(button.dataset.productId, button);

  if (!event.target.closest(".cart-dropdown-wrap")) {
    document.querySelector(".cart-dropdown-wrap")?.classList.remove("is-open");
    document.querySelector<HTMLButtonElement>("#cart-button")?.setAttribute("aria-expanded", "false");
  }
});


updateCartCount();
renderLoadingSkeletons();
loadPage();