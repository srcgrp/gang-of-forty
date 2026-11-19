import type { Shop } from "../../types";
import { isRecord } from "../../validation/record";

export function isShop(x: unknown): x is Shop {
  if (!isRecord(x)) return false;

  const isLink = (item: unknown): boolean =>
    isRecord(item) &&
    typeof item.href === "string" &&
    typeof item.label === "string";

  const isSchedule = (item: unknown): boolean =>
    isRecord(item) &&
    typeof item.days === "string" &&
    typeof item.time === "string";

  return (
    Array.isArray(x.help) &&
    x.help.every(isLink) &&
    Array.isArray(x.menu) &&
    x.menu.every(isLink) &&
    Array.isArray(x.schedule) &&
    x.schedule.every(isSchedule) &&
    typeof x.about === "string" &&
    typeof x.phone === "string" &&
    typeof x.address === "string" &&
    typeof x.name === "string" &&
    typeof x.copyright === "string" &&
    typeof x.notice === "string"
  );
}