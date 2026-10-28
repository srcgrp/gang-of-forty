import type { Shop, MenuLink } from "../types";
import { createLink } from "./elements";
export function showShop(shop: Shop): void {
  const notice = document.querySelector<HTMLElement>("#notice");
  const slogan = document.querySelector<HTMLElement>("#slogan");

  if (!notice || !slogan) {
    throw new Error("عناصر پیام و شعار فروشگاه پیدا نشدند");
  }

  notice.textContent = shop.notice;
  slogan.textContent = shop.slogan;

  const mainLinks = document.querySelector<HTMLElement>("#main-links");
  const mobileLinks = document.querySelector<HTMLElement>("#mobile-links");

  if (!mainLinks || !mobileLinks) {
    throw new Error("منوی اصلی یا منوی موبایل پیدا نشد");
  }

  shop.menu.forEach(function (item: MenuLink): void {
    mainLinks.appendChild(createLink(item.label, item.href, ""));
    mobileLinks.appendChild(createLink(item.label, item.href, ""));
  });
}
