import type { Shop } from "../types/shop.ts";

function isLink(x: unknown): x is { label: string; href: string } {
  return (
    typeof x === "object" &&
    x !== null &&
    "label" in x &&
    typeof x.label === "string" &&
    "href" in x &&
    typeof x.href === "string"
  );
}

function isHours(x: unknown): x is { open: string; close: string } {
  return (
    typeof x === "object" &&
    x !== null &&
    "open" in x &&
    typeof x.open === "string" &&
    "close" in x &&
    typeof x.close === "string"
  );
}

function isSlot(x: unknown): x is { days: string; time: string } {
  return (
    typeof x === "object" &&
    x !== null &&
    "days" in x &&
    typeof x.days === "string" &&
    "time" in x &&
    typeof x.time === "string"
  );
}

export function isShop(x: unknown): x is Shop {
  if (typeof x !== "object" || x === null) return false;
  if (!("name" in x) || typeof x.name !== "string") return false;
  if (!("slogan" in x) || typeof x.slogan !== "string") return false;
  if (!("owner" in x) || typeof x.owner !== "string") return false;
  if (!("city" in x) || typeof x.city !== "string") return false;
  if (!("phone" in x) || typeof x.phone !== "string") return false;
  if (!("hours" in x) || !isHours(x.hours)) return false;
  if (!("deliveryFee" in x) || typeof x.deliveryFee !== "number") return false;
  if (!("freeDeliveryOver" in x) || typeof x.freeDeliveryOver !== "number")
    return false;
  if (!("currency" in x) || typeof x.currency !== "string") return false;
  if (!("notice" in x) || typeof x.notice !== "string") return false;
  if (!("about" in x) || typeof x.about !== "string") return false;
  if (!("address" in x) || typeof x.address !== "string") return false;
  if (!("schedule" in x) || !Array.isArray(x.schedule)) return false;
  if (!x.schedule.every(isSlot)) return false;
  if (!("menu" in x) || !Array.isArray(x.menu) || !x.menu.every(isLink))
    return false;
  if (!("help" in x) || !Array.isArray(x.help) || !x.help.every(isLink))
    return false;
  if (!("copyright" in x) || typeof x.copyright !== "string") return false;
  return true;
}
