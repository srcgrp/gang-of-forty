import type { Shop, Schedule } from "../types";
import { createElement, createLink } from "./elements";
export function showFooter(shop: Shop): void {
  const info = document.querySelector<HTMLElement>("#shop-info");
  if (!info) {
    throw new Error("Missing element: #shop-info");
  }
  info.appendChild(createElement("h2", "", "بت‌شاپ"));
  info.appendChild(createElement("p", "", shop.about));
  info.appendChild(createElement("address", "", shop.address));
  const phone = createLink(shop.phone, "tel:" + shop.phone, "");
  phone.dir = "ltr";
  info.appendChild(phone);

  const hours = document.querySelector<HTMLElement>("#shop-hours");
  if (!hours) {
    throw new Error("Missing element: #shop-hours");
  }
  hours.appendChild(createElement("h2", "", "ساعت کاری"));
  shop.schedule.forEach(function (day: Schedule): void {
    hours.appendChild(createElement("p", "", day.days + ": " + day.time));
  });

  const bottom = document.querySelector<HTMLElement>("#footer-bottom");
  if (!bottom) {
    throw new Error("Missing element: #footer-bottom");
  }
  bottom.appendChild(
    createElement("p", "", shop.copyright.replace(shop.name, "بت‌شاپ")),
  );
  bottom.appendChild(createLink("بازگشت به بالا ↑", "#top", ""));
}
