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

function write(data: Record<number, number>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function useConsumedStock() {
  const [consumed, setConsumed] = useState<Record<number, number>>(read);

  const consume = (cart: CartLine[]) => {
    const next = { ...consumed };
    for (const item of cart) {
      next[item.id] = (next[item.id] ?? 0) + item.quantity;
    }
    write(next);
    setConsumed(next);
  };

  const reset = () => {
    write({});
    setConsumed({});
  };

  return { consumed, consume, reset };
}
