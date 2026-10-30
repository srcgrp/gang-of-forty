import type { Category, Shop } from "../types";
import { h } from "./dom";
import { safeHref } from "./format";

export function renderShopInfo(shop: Shop, categories: Category[]): void {
  const topbar = document.getElementById("topbar-text");
  if (topbar && shop.notice) topbar.textContent = String(shop.notice).slice(0, 200);

  const brandName = document.getElementById("brand-name");
  if (brandName && shop.name) brandName.textContent = String(shop.name).slice(0, 50);

  const brandSlogan = document.getElementById("brand-slogan");
  if (brandSlogan && shop.slogan) brandSlogan.textContent = String(shop.slogan).slice(0, 100);

  const navLinks = document.getElementById("nav-links");
  if (navLinks && Array.isArray(shop.menu)) {
    navLinks.replaceChildren();
    for (const item of shop.menu.slice(0, 10)) {
      const li = h("li");
      const a = h("a", undefined, String(item.label ?? "").slice(0, 50));
      a.href = safeHref(item.href);
      li.appendChild(a);
      navLinks.appendChild(li);
    }
  }

  const megaList = document.getElementById("mega-list");
  if (megaList && categories.length > 0) {
    megaList.replaceChildren();
    for (const cat of categories) {
      const li = h("li");
      const a = h("a");
      a.href = `#cat-${cat.id}`;
      a.setAttribute("role", "menuitem");
      const emoji = h("span", undefined, cat.emoji ?? "");
      emoji.setAttribute("aria-hidden", "true");
      a.append(emoji, " " + cat.name);
      li.appendChild(a);
      megaList.appendChild(li);
    }
  }
}