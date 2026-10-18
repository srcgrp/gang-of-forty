import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Fuse from "fuse.js";

type Product = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  unit: string;
  emoji?: string;
};

type Offer = {
  productId: number;
  percent: number;
  label: string;
};

type Stock = {
  items: Record<number, number>;
};

type Hero = {
  title: string;
  text: string;
  cta: {
    label: string;
    href: string;
  };
};

type HomeCarousel = {
  id: string;
  title: string;
  source?: string;
  categoryId?: number;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Promo = {
  href: string;
  text: string;
};

type LinkItem = {
  href: string;
  label: string;
};

type Shop = {
  help: LinkItem[];
  menu: LinkItem[];

  about: string;
  schedule: {
    days: string;
    time: string;
  }[];
  phone: string;
  address: string;
  name: string;
  copyright: string;
  notice: string;
};

type Home = {
  hero: Hero;
  side: Hero;
  promos: Promo[];
  carousels: HomeCarousel[];
};

const notyf = new Notyf({
  duration: 2500,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "success",
      background: "#07566b",
      icon: {
        className: "notyf__icon--success",
        tagName: "i",
        color: "#07566b",
      },
    },
  ],
});

let productSearch: Fuse<Product> | null=null;
const priceFormatter = new Intl.NumberFormat("fa-IR");
const categoryImages: Partial<Record<number,string>> = {
  1: "/asset/products/fruits-and-vegetables.png",
  2: "/asset/products/breakfast-and-dairy.png",
  3: "/asset/products/bakery.webp",
  4: "/asset/products/pantry.webp",
  5: "/asset/products/drinks.png",
  6: "/asset/products/proteins.png",
  7: "/asset/products/snacks.webp",
};

const productImages: Partial<Record<number,string>> = {
  // Fruits & Vegetables
  101: "/asset/products/apple.webp",
  102: "/asset/products/oranges.png",
  103: "/asset/products/bananas.png",
  104: "/asset/products/tomatos.webp",
  105: "/asset/products/cucumber.webp",
  106: "/asset/products/grapes.webp",
  107: "/asset/products/watermelon.png",
  // Dairy & Breakfast
  201: "/asset/products/milk.png",
  202: "/asset/products/cheese.png",
  203: "/asset/products/yogurt.png",
  204: "/asset/products/butter.png",
  205: "/asset/products/ice-cream.webp",
  206: "/asset/products/eggs.png",
  // Bakery
  301: "/asset/products/sangak.webp",
  302: "/asset/products/buget.webp",
  303: "/asset/products/cake.png",
  304: "/asset/products/croissant.webp",
  305: "/asset/products/toast.webp",
  306: "/asset/products/fooman-cookie.webp",
  // Pantry
  401: "/asset/products/rice.webp",
  402: "/asset/products/honey.png",
  403: "/asset/products/saffaron.webp",
  404: "/asset/products/oil.webp",
  405: "/asset/products/pasta.webp",
  406: "/asset/products/lentils.webp",
  // Drinks
  501: "/asset/products/tea.png",
  502: "/asset/products/doogh.png",
  503: "/asset/products/water.webp",
  504: "/asset/products/orange-juice.png",
  505: "/asset/products/coffee.png",
  506: "/asset/products/cherry-juice.webp",
  // Protein
  601: "/asset/products/chicken.png",
  602: "/asset/products/meat.png",
  603: "/asset/products/fish.png",
  604: "/asset/products/shrimp.png",
  605: "/asset/products/chicken-fillet.webp",
  606: "/asset/products/tuna.webp",
  // Snacks & Sweets
  701: "/asset/products/popcorn.webp",
  702: "/asset/products/chips.webp",
  703: "/asset/products/chocolate.png",
  704: "/asset/products/cookie.png",
  705: "/asset/products/nuts.png",
  706: "/asset/products/gaz.webp",
};

function createProductMedia(product : Product) {
  const imagePath = productImages[product.id];
  if (imagePath) {
    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = product.name;
    image.classList.add("product-image");
    image.loading = "lazy";
    return image;
  }
  const emoji = document.createElement("div");
  emoji.classList.add("product-emoji");
  emoji.textContent = product.emoji ?? "";
  emoji.setAttribute("aria-hidden", "true");
  return emoji;
}
function createProductCard(product: Product, offersMap: Map<number,Offer>, stock: Stock) {
  const offer = offersMap.get(product.id);
  const quantity = stock.items[product.id] ?? 0;
  const isAvailable = quantity > 0;
  const card = document.createElement("article");
  card.classList.add("product-card");
  card.dataset.apiProduct = String(product.id);
  if (offer) {
    card.classList.add("product-card-discount");
    const badge = document.createElement("span");
    badge.classList.add("discount-badge");
    badge.textContent = `${priceFormatter.format(offer.percent)}٪`;
    badge.title = offer.label;
    card.append(badge);
  }
  if (!isAvailable) {
    card.classList.add("product-card-unavailable");
    const badge = document.createElement("span");
    badge.classList.add("unavailable-badge");
    badge.textContent = "ناموجود";
    card.append(badge);
  }
  const media = createProductMedia(product);
  const name = document.createElement("h3");
  name.textContent = product.name;
  const unit = document.createElement("p");
  unit.classList.add("product-meta");
  unit.textContent = product.unit;
  const priceBox = document.createElement("div");
  priceBox.classList.add("price-box");
  const price = document.createElement("p");
  price.classList.add("product-price");
  if (offer) {
    const oldPrice = document.createElement("p");
    oldPrice.classList.add("old-price");
    oldPrice.textContent = `${priceFormatter.format(product.price)} تومان`;
    const discountedPrice = Math.round(
      product.price * (1 - offer.percent / 100),
    );
    price.textContent = `${priceFormatter.format(discountedPrice)} تومان`;
    priceBox.append(oldPrice, price);
  } else {
    price.textContent = `${priceFormatter.format(product.price)} تومان`;
    priceBox.append(price);
  }
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = isAvailable ? "افزودن به سبد" : "ناموجود";
  button.disabled = !isAvailable;
  card.append(media, name, unit, priceBox, button);
  return card;
}
function renderProductCarousel(container: HTMLElement, products: Product[], offersMap: Map<number,Offer>, stock: Stock) {
  const cards = products.map((product) => {
    return createProductCard(product, offersMap, stock);
  });

  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
}
function showError(container: Element | null, messageText: string) {
  if (!container) {
    return;
  }
  const message = document.createElement("p");
  message.classList.add("error-message");
  message.setAttribute("role", "alert");
  message.textContent = messageText;
  container.replaceChildren(message);
  container.setAttribute("aria-busy", "false");
}
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  return response.json();
}
function renderHero(hero: Hero) {
  const title = document.querySelector("#hero-title");
  const text = document.querySelector("#hero-text");
  const cta = document.querySelector<HTMLAnchorElement>("#hero-cta");
  if(!title ||!text||!cta){
    return;
  }
  title.textContent = hero.title;
  text.textContent = hero.text;
  cta.textContent = hero.cta.label;
  cta.href = hero.cta.href;
}
function getCarouselProducts(carousel: HomeCarousel, products: Product[], offersMap: Map<number,Offer>): Product[] {
  if (carousel.source === "offers") {
    return products.filter((product) => offersMap.has(product.id));
  }

  if (carousel.categoryId != null) {
    return products.filter(
      (product) => product.categoryId === carousel.categoryId,
    );
  }

  return [];
}

function createHomeCarousel(carousel: HomeCarousel, products:Product[], offersMap: Map<number,Offer>, stock:Stock):HTMLElement {
  const section = document.createElement("section");
  section.className = "product-section home-carousel-section";
  section.id = carousel.id;
  section.setAttribute("aria-labelledby", `carousel-title-${carousel.id}`);
  const title = document.createElement("h2");
  title.id = `carousel-title-${carousel.id}`;
  title.textContent = carousel.title;
  const track = document.createElement("div");
  track.className = "product-track";
  track.tabIndex = 0;
  track.setAttribute("aria-label", `محصولات ${carousel.title}`);
  const carouselProducts = getCarouselProducts(carousel, products, offersMap);
  renderProductCarousel(track, carouselProducts, offersMap, stock);
  const controls = document.createElement("div");
  controls.className = "carousel-controls";
  const startButton = document.createElement("button");
  startButton.type = "button";
  startButton.className = "carousel-arrow carousel-arrow-start";
  startButton.textContent = "→";
  startButton.setAttribute("aria-label", `رفتن به ابتدای ${carousel.title}`);
  const endButton = document.createElement("button");
  endButton.type = "button";
  endButton.className = "carousel-arrow carousel-arrow-end";
  endButton.textContent = "←";
  endButton.setAttribute("aria-label", `رفتن به انتهای ${carousel.title}`);
  controls.append(startButton, endButton);
  section.append(title, track, controls);
  setupCarouselControls(track, startButton, endButton);
  return section;
}

function renderHomeCarousels(carousels: HomeCarousel[],products:Product[],offersMap: Map<number,Offer>,stock:Stock, categories:Category[]) {
  const featuredContainer = document.querySelector("#home-featured-carousels");
  const categoryContainer = document.querySelector("#home-category-carousels");
  if(!featuredContainer || !categoryContainer){
    return;
  }

  const featured = carousels.filter((item) => item.source === "offers");
  const configuredCategories = carousels.filter(
    (item) => item.source !== "offers",
  );

  const configuredIds = new Set(configuredCategories.map((item) => item.id));

  const configuredCategoryIds = new Set(
    configuredCategories
      .map((item) => item.categoryId)
      .filter((id) => id != null),
  );

  const otherCategories = categories
    .filter(
      (item) =>
        !configuredIds.has(item.slug) && !configuredCategoryIds.has(item.id),
    )
    .map((item) => ({
      id: item.slug,
      title: item.name,
      categoryId: item.id,
    }));
  const featuredSections = featured.map((item) =>
    createHomeCarousel(item, products, offersMap, stock),
  );
  const categorySections = [...configuredCategories, ...otherCategories].map(
    (item) => createHomeCarousel(item, products, offersMap, stock),
  );
  featuredContainer.replaceChildren(...featuredSections);
  categoryContainer.replaceChildren(...categorySections);
}

function renderSideBanner(side: Hero) {
  const container = document.querySelector("#home-side");
  if(!container){
    return;
  }
  const banner = document.createElement("article");
  banner.className = "home-side-banner";
  const title = document.createElement("h2");
  title.textContent = side.title;
  const text = document.createElement("p");
  text.textContent = side.text;
  const link = document.createElement("a");
  link.className = "home-banner-link";
  link.href = side.cta.href;
  link.textContent = side.cta.label;
  banner.append(title, text, link);
  container.replaceChildren(banner);
}
function renderPromoBanners(promos: Promo[]) {
  const container = document.querySelector("#home-promos");
  if(!container){
    return;
  }
  const cards = promos.map((promo) => {
    const link = document.createElement("a");
    link.className = "home-promo-card";
    link.href = promo.href;
    const text = document.createElement("span");
    text.textContent = promo.text;
    link.append(text);
    return link;
  });
  container.replaceChildren(...cards);
}
const cartCountElement = document.querySelector("#cart-count");
const savedCartCount = Number(localStorage.getItem("cartCount"));
let cartCount =
  Number.isFinite(savedCartCount) && savedCartCount >= 0 ? savedCartCount : 0;
function updateCartCount() {
  if(!cartCountElement){
    return;
  }
  cartCountElement.textContent = priceFormatter.format(cartCount);
}
function addToCart() {
  cartCount += 1;
  localStorage.setItem("cartCount", String(cartCount));
  updateCartCount();
  showCartToast();
}
document.addEventListener("click", (event) => {
  const target=event.target;
  if(!(target instanceof Element)){
    return;
  }
  const button = target.closest<HTMLButtonElement>(".product-card button");
  if (!button || button.disabled) {
    return;
  }
  addToCart();
});
updateCartCount();

function showCartToast(){
  notyf.success("محصول به سبد خرید اضافه شد");
}
function updateSearchPlaceholder(productCount: number) {
  const searchInput =
    document.querySelector<HTMLInputElement>("#site-search");

  if (!searchInput) {
    return;
  }

  searchInput.placeholder = `جستجو در میان ${priceFormatter.format(productCount)} کالا...`;
}
function createCategoryCard(category: Category) {
  const card = document.createElement("a");
  card.classList.add("category-card");
  card.href = `#${category.slug}`;
  const image = document.createElement("img");
  image.src = categoryImages[category.id] ?? "";
  image.alt = "";
  image.setAttribute("aria-hidden", "true");
  const name = document.createElement("span");
  name.textContent = category.name;
  card.append(image, name);
  return card;
}
function renderCategories(categories:Category[]) {
  const container = document.querySelector("#category-grid");
  if(!container){
    return
  }
  const cards = categories.map((category) => {
    return createCategoryCard(category);
  });
  container.replaceChildren(...cards);
  container.setAttribute("aria-busy", "false");
}
function renderCategoryDropdown(categories:Category[]) {
  const dropdown = document.querySelector("#category-dropdown");
   if(!dropdown){
    return;
   }
  const apiLinks = categories.map((category) => {
    const link = document.createElement("a");
    link.classList.add("dropdown-item");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    link.dataset.apiCategory = "true";
    return link;
  });
  const customLinks = Array.from(
    dropdown.querySelectorAll(":scope > a:not([data-api-category])"),);

  dropdown.replaceChildren(...apiLinks, ...customLinks);
}
function renderFooterCategories(categories:Category[]) {
  const container = document.querySelector("#footer-categories");
  if(!container){
    return;
  }
  const apiLinks = categories.map((category) => {
    const link = document.createElement("a");
    link.href = `#${category.slug}`;
    link.textContent = category.name;
    return link;
  });
  const customLinks = Array.from(
    container.querySelectorAll(":scope > a:not([data-api-category])"),
  );
  apiLinks.forEach((link) => {
    link.dataset.apiCategory = "true";
  });
  container.replaceChildren(...apiLinks, ...customLinks);
}
function renderShopHelp(shop:Shop) {
  const container = document.querySelector("#footer-help");
  if(!container){
    return
  }
  const links = shop.help.map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    return link;
  });
  container.replaceChildren(...links);
}
function renderShopMenu(container:Element | null, menuItems:LinkItem[]) {
  if (!container) {
  return;
}
  const categoryHrefs = new Set([
    "#fruits",
    "#dairy",
    "#bakery",
    "#pantry",
    "#drinks",
    "#protein",
    "#snacks",
  ]);
  const mainMenuItems = menuItems.filter((item) => {
    return !categoryHrefs.has(item.href);
  });
  const links = mainMenuItems.map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    return link;
  });
  const customLinks = [
    { label: "تخفیف‌های ویژه", href: "#offers" },
    { label: "درباره ما", href: "#about" },
  ];
  customLinks.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    links.push(link);
  });
  container.replaceChildren(...links);
}
function renderShopMenus(shop:Shop) {
  const desktopMenu = document.querySelector("#shop-desktop-menu");
  const mobileMenu = document.querySelector("#shop-mobile-menu");
  renderShopMenu(desktopMenu, shop.menu);
  renderShopMenu(mobileMenu, shop.menu);
}
function renderShopAbout(shop:Shop) {
  const aboutElement = document.querySelector("#shop-about");
  if(!aboutElement){
    return
  }
  aboutElement.textContent = shop.about;
}
function renderShopSchedule(shop:Shop) {
  const container = document.querySelector("#shop-schedule");
  if(!container){
    return
  }
  const title = document.createElement("p");
  title.textContent = "ساعات کاری:";
  const scheduleItems = shop.schedule.map((item) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${item.days}: ${item.time}`;
    return paragraph;
  });
  container.replaceChildren(title, ...scheduleItems);
}

function renderShopContact(shop:Shop) {
  const phoneElement = document.querySelector("#shop-phone");
  const addressElement = document.querySelector("#shop-address");
  const phoneLink = document.querySelector<HTMLAnchorElement>( '.footer-social-link[aria-label="تماس تلفنی"]', );
    if(!phoneElement||!addressElement||!phoneLink){
    return
  }
  phoneElement.textContent = shop.phone;
  addressElement.textContent = shop.address;
  const normalizedPhone = shop.phone.replace(/[^\d+]/g, "");
  phoneLink.href = `tel:${normalizedPhone}`;
}

function renderShopCopyright(shop: Shop) {
  const copyrightElement = document.querySelector("#shop-copyright");
    if(!copyrightElement){
    return
  }
  copyrightElement.textContent = shop.copyright.replace(shop.name, "تازه‌خانه");
}
function renderShopNotice(shop: Shop) {
  const noticeElement = document.querySelector("#shop-notice");
    if(!noticeElement){
    return
  }
  noticeElement.textContent = shop.notice;
}
function setupCarouselControls(container:HTMLElement, startButton:HTMLButtonElement, endButton:HTMLButtonElement) {
  startButton.addEventListener("click", () => {
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  });
  endButton.addEventListener("click", () => {
    container.scrollTo({
      left: -container.scrollWidth,
      behavior: "smooth",
    });
  });
}
async function loadAllData() {
  try {
    const [products, offers, stock, shop, categories, home] = await Promise.all(
      [
        fetchJSON<Product[]>("/api/products.json"),
        fetchJSON<Offer[]>("/api/offers.json"),
        fetchJSON<Stock>("/api/stock.json"),
        fetchJSON<Shop>("/api/shop.json"),
        fetchJSON<Category[]>("/api/categories.json"),
        fetchJSON<Home>("/api/home.json"),
      ],
    );
    const offersMap = new Map(offers.map((offer) => [offer.productId, offer]));
    productSearch =new Fuse(products,{
      keys: ["name"],
      threshold: 0.35,
      ignoreLocation:true,
    });
    updateSearchPlaceholder(products.length);
    renderShopNotice(shop);
    renderShopMenus(shop);
    renderShopAbout(shop);
    renderShopSchedule(shop);
    renderShopContact(shop);
    renderShopCopyright(shop);
    renderShopHelp(shop);
    renderCategories(categories);
    renderCategoryDropdown(categories);
    renderFooterCategories(categories);
    renderHero(home.hero);
    renderSideBanner(home.side);
    renderPromoBanners(home.promos);
    renderHomeCarousels(home.carousels, products, offersMap, stock, categories);
  } catch (error) {
    console.error("Failed to load API data:", error);
    showError(
      document.querySelector("#category-grid"),
      "دریافت اطلاعات فروشگاه با مشکل مواجه شد.",
    );
    showError(
      document.querySelector("#home-featured-carousels"),
      "دریافت پیشنهادها با مشکل مواجه شد.",
    );
    showError(
      document.querySelector("#home-category-carousels"),
      "دریافت محصولات با مشکل مواجه شد.",
    );
  } finally {
    document.querySelectorAll("[aria-busy='true']").forEach((element) => {
      element.setAttribute("aria-busy", "false");
    });
  }
}
loadAllData();
const lightButton = document.querySelector<HTMLButtonElement>("#theme-light-button");
const darkButton = document.querySelector<HTMLButtonElement>("#theme-dark-button");
function setTheme(theme:"light"| "dark") {
  document.documentElement.dataset.theme = theme;
  lightButton?.setAttribute("aria-pressed", String(theme === "light"));
  darkButton?.setAttribute("aria-pressed", String(theme === "dark"));
}
lightButton?.addEventListener("click", () => {
  setTheme("light");
});
darkButton?.addEventListener("click", () => {
  setTheme("dark");
});
setTheme("light");
document.querySelector(".search")?.addEventListener("submit", (event) => {
  event.preventDefault();
});

function setupProductsSearch(){
  const searchInput=document.querySelector<HTMLInputElement>("#site-search");
  const resultContainer=document.querySelector<HTMLDivElement>("#search-result");
  if(!searchInput || !resultContainer){
    return;
  }
  searchInput.addEventListener("input", () => {
    const query =searchInput.value.trim();
    if(!query || !productSearch){
      resultContainer.replaceChildren();
      resultContainer.hidden=true;
      return;
    }

    const matches=productSearch.search(query, {limit:4
    });
    resultContainer.replaceChildren();
    if(matches.length===0){
      const message=document.createElement("p");
      message.textContent="محصولی پیدا نشد."
      resultContainer.append(message);
    }else{
      matches.forEach(({ item }) => {
        const result=document.createElement("div");
        result.className="search-result-item";
        result.textContent=item.name;
        result.addEventListener("click", () => {
          resultContainer.hidden=true;

          const productCard=document.querySelector<HTMLElement>(`.product-card[data-api-product="${item.id}"]`);
           if(!productCard){
            return;
          }
          productCard.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
          productCard.classList.add("product-highlight");
          setTimeout(() => {
            productCard.classList.remove("product-highlight");
          },2500);
        });
        resultContainer.append(result);
      });
    }
    resultContainer.hidden=false;
  });
searchInput.addEventListener("click", () => {
  if (searchInput.value.trim() && resultContainer.hasChildNodes()) {
    resultContainer.hidden = false;
  }
});
const searchForm=searchInput.closest(".search");
  document.addEventListener("click", (event) => {
    const target=event.target;
    if(!(target instanceof Node) || !searchForm){
      return;
    }
    if (!searchForm.contains(target)) {
    resultContainer.hidden = true;
  }
  });
}
setupProductsSearch();
