import { useState, useEffect } from "react";
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

export function useConsumedStock() {
  const [consumed, setConsumed] = useState<Record<number, number>>(read);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(consumed));
    } catch {
      /* ignore */
    }
  }, [consumed]);

  const consume = (cart: CartLine[]): void => {
    setConsumed((prev) => {
      const next = { ...prev };
      for (const item of cart) {
        next[item.id] = (next[item.id] ?? 0) + item.quantity;
      }
      return next;
    });
  };

  const reset = (): void => setConsumed({});

  return { consumed, consume, reset };
}
