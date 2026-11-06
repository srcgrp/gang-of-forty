import type { Category, Shop } from "../types";
import { h } from "./dom";
import { safeHref } from "./format";

export function renderFooter(shop: Shop, categories: Category[]): void {
  const name = document.getElementById("footer-name");
  if (name && shop.name) name.textContent = String(shop.name).slice(0, 50);
  const about = document.getElementById("footer-about");
  if (about && shop.about) about.textContent = String(shop.about).slice(0, 300);
  
  const phone = document.querySelector<HTMLAnchorElement>("#footer-phone");
  if (phone && shop.phone) {
    const p = String(shop.phone).replace(/[^\d+\-\s()]/g, "").slice(0, 20);
    phone.textContent = p;
    phone.href = `tel:${p.replace(/[^\d+]/g, "")}`;
  }
  const links = document.getElementById("footer-links");
  if (links && categories.length > 0) {
    links.replaceChildren();
    for (const cat of categories.slice(0, 5)) {
      const li = h("li");
      const a = h("a", undefined, cat.name);
      a.href = `#cat-${cat.id}`;
      li.appendChild(a);
      links.appendChild(li);
    }
  }
  const help = document.getElementById("footer-help");
  if (help && Array.isArray(shop.help)) {
    help.replaceChildren();
    for (const item of shop.help.slice(0, 10)) {
      const li = h("li");
      const a = h("a", undefined, item.label ?? "");
      a.href = safeHref(item.href);
      li.appendChild(a);
      help.appendChild(li);
    }
  }
  const schedule = document.getElementById("footer-schedule");
  if (schedule && Array.isArray(shop.schedule)) {
    schedule.replaceChildren();
    for (const item of shop.schedule.slice(0, 7)) {
      const p = h("p", "footer__text");
      p.append(item.days ?? "", document.createElement("br"), item.time ?? "");
      schedule.appendChild(p);
    }
  }
  const copy = document.getElementById("footer-copy");
  if (copy && shop.copyright) copy.textContent = String(shop.copyright).slice(0, 200);
}