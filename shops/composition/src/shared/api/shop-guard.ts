import type { MenuLink, Schedule, Shop } from "../types";
import { isObject, isAmount, isList } from "./validation";

export function isMenuLink(value: unknown): value is MenuLink {
  return isObject(value) && typeof value.label === "string" &&
    typeof value.href === "string";
}

function isSchedule(value: unknown): value is Schedule {
  return isObject(value) && typeof value.days === "string" &&
    typeof value.time === "string";
}

export function isShop(value: unknown): value is Shop {
  if (!isObject(value)) return false;
  return (
    typeof value.name === "string" && typeof value.slogan === "string" &&
    typeof value.owner === "string" && typeof value.city === "string" &&
    typeof value.phone === "string" && isObject(value.hours) &&
    typeof value.hours.open === "string" && typeof value.hours.close === "string" &&
    isAmount(value.deliveryFee) && isAmount(value.freeDeliveryOver) &&
    typeof value.currency === "string" && typeof value.notice === "string" &&
    typeof value.about === "string" && typeof value.address === "string" &&
    isList(value.schedule) && value.schedule.every(isSchedule) &&
    isList(value.menu) && value.menu.every(isMenuLink) &&
    isList(value.help) && value.help.every(isMenuLink) &&
    typeof value.copyright === "string"
  );
}
