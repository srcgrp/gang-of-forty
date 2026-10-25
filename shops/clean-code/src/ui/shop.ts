import type { FrozenShop } from "../types/shop.ts";

export function fillShop(shop: FrozenShop): void {
  const notice = document.querySelector<HTMLParagraphElement>(".banner p");
  const slogan = document.querySelector<HTMLParagraphElement>(".slogan");
  const about = document.querySelector<HTMLParagraphElement>("#about");
  const address = document.querySelector<HTMLParagraphElement>("#address");
  const hoursWeek = document.querySelector<HTMLParagraphElement>("#hours-week");
  const hoursFri = document.querySelector<HTMLParagraphElement>("#hours-fri");
  const phone = document.querySelector<HTMLAnchorElement>("#phone");
  const copyRight = document.querySelector<HTMLParagraphElement>("#copyright");

  if (
    !notice ||
    !slogan ||
    !about ||
    !address ||
    !hoursWeek ||
    !hoursFri ||
    !phone ||
    !copyRight
  )
    throw new Error("index.html is missing an element");

  notice.textContent = shop.notice;
  slogan.textContent = shop.slogan;
  about.textContent = shop.about;
  address.textContent = shop.address;
  hoursWeek.textContent = shop.schedule[0].days + ": " + shop.schedule[0].time;
  hoursFri.textContent = shop.schedule[1].days + ": " + shop.schedule[1].time;
  phone.textContent = shop.phone;
  phone.setAttribute("href", "tel:" + shop.phone);
  phone.setAttribute("dir", "ltr");
  copyRight.textContent = shop.copyright.replace(
    "سوپرمارکت مینا",
    "سوپرمارکت تمیز",
  );
}
