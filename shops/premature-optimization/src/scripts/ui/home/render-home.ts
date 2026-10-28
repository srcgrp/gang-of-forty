import type { BannerData, Category, Home, Promo } from "../../types";
import { makeElement, appendLink } from "../shared/make-element";
function banner(
  data: BannerData | null | undefined,
  variant: string,
): HTMLElement | null {
  if (!data) return null;
  const article = makeElement("article", variant),
    content = makeElement("div", `banner-content ${variant}-content`);
  content.append(
    makeElement("h2", `banner-title ${variant}-title`, data.title || ""),
    makeElement("p", `banner-details ${variant}-details`, data.text || ""),
  );
  if (data.cta)
    appendLink(
      content,
      data.cta.label || "مشاهده",
      data.cta.href || "#",
      `banner-button ${variant}-button`,
    );
  const art = makeElement("span", "banner-art");
  if (data.emoji?.endsWith(".svg")) {
    const img = makeElement("img");
    img.src = data.emoji;
    img.alt = data.name ?? data.title;
    art.append(img);
  } else art.textContent = data.emoji || "🛍️";
  article.append(content, art);
  return article;
}
function renderPromos(container: HTMLElement, promos: Promo[]): void {
  container.replaceChildren();
  promos.forEach((promo, index) => {
    const variant = index % 2 ? "banner-bread" : "banner-breakfast",
      article = makeElement("article", variant),
      content = makeElement("div", "banner-content"),
      icon = makeElement("span", "promo-emoji");
    content.append(makeElement("h2", "banner-title", promo.text || ""));
    appendLink(content, "دیدن محصولات", promo.href || "#", "promo-link");
    if (promo.emoji?.endsWith(".svg")) {
      const img = makeElement("img");
      img.src = promo.emoji;
      img.alt = promo.name ?? promo.text;
      icon.append(img);
    } else icon.textContent = promo.emoji || "🛍️";
    article.append(content, icon);
    container.append(article);
  });
}
export function renderHome(home: Home): void {
  const banners = document.querySelector<HTMLElement>("#home-banners"),
    promos = document.querySelector<HTMLElement>("#home-promos");
  if (banners) {
    banners.replaceChildren();
    const hero = banner(home.hero, "banner-fruit"),
      side = banner(home.side, "banner-sale");
    if (hero) banners.append(hero);
    if (side) banners.append(side);
  }
  if (promos) renderPromos(promos, home.promos || []);
}
export function renderCategories(categories: Category[]): void {
  const menu = document.querySelector<HTMLDivElement>("#category-menu-links"),
    cards = document.querySelector<HTMLDivElement>("#category-cards"),
    footer = document.querySelector<HTMLDivElement>("#footer-category-links");
  if (!menu || !cards || !footer) return;
  menu.replaceChildren();
  cards.replaceChildren();
  footer.replaceChildren();
  categories.forEach((category) => {
    const href = `#${category.slug}`;
    appendLink(
      menu,
      `${category.emoji || "🛒"} ${category.name}`,
      href,
      "hidden-content-links",
    );
    const card = appendLink(cards, "", href, "categories-box"),
      icon = makeElement("span", "categories-icon");
    icon.style.backgroundColor = category.color || "var(--light-blue)";
    if (category.image?.endsWith(".svg")) {
      const img = makeElement("img");
      img.src = category.image;
      img.alt = category.name;
      icon.append(img);
    } else icon.textContent = category.emoji || "🛒";
    card.append(icon, makeElement("p", "categories-name", category.name));
    appendLink(footer, category.name, href);
  });
}
