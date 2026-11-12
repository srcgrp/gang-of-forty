import { useState } from "react";
import type { CartLine } from "../types";

const KEY = "consumed_stock";

function read(): Record<number, number> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed as Record<number, number>;
  } catch {
    return {};
  }
}

function write(data: Record<number, number>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function useConsumedStock() {
  const [consumed, setConsumed] = useState<Record<number, number>>(read);

  // ✅ functional update: همیشه از state فعلی می‌خواند، نه closure قدیمی
  const consume = (cart: CartLine[]): void => {
    setConsumed((prev) => {
      const next = { ...prev };
      for (const item of cart) {
        next[item.id] = (next[item.id] ?? 0) + item.quantity;
      }
      write(next);
      return next;
    });
  };

  const reset = (): void => {
    write({});
    setConsumed({});
  };

  return { consumed, consume, reset };
}
