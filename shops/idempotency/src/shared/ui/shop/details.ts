import type { Shop } from "../../types";

export function renderShopAbout(shop: Shop): void {
  const aboutElement = document.querySelector("#shop-about");

  if (!aboutElement) {
    throw new Error("Shop about element is missing from the DOM.");
  }

  aboutElement.textContent = shop.about;
}

export function renderShopSchedule(shop: Shop): void {
  const container = document.querySelector("#shop-schedule");

  if (!container) {
    throw new Error("Shop schedule container is missing from the DOM.");
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

export function renderShopNotice(shop: Shop): void {
  const noticeElement = document.querySelector("#shop-notice");

  if (!noticeElement) {
    throw new Error("Shop notice element is missing from the DOM.");
  }

  noticeElement.textContent = shop.notice;
}