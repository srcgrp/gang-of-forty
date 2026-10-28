import type { Shop, ScheduleRow } from "../types";

import { isRecord, isArrayOf, isLink } from "./guard-basics";

export function isScheduleRow(x: unknown): x is ScheduleRow {
  return (
    isRecord(x) &&
    typeof x.days === "string" &&
    typeof x.time === "string"
  );
}

export function isShop(x: unknown): x is Shop {
  if (!isRecord(x)) return false;

  return (
    typeof x.slogan === "string" &&
    typeof x.phone === "string" &&
    typeof x.notice === "string" &&
    typeof x.about === "string" &&
    typeof x.address === "string" &&
    isArrayOf(x.schedule, isScheduleRow) &&
    isArrayOf(x.menu, isLink) &&
    isArrayOf(x.help, isLink)
  );
}