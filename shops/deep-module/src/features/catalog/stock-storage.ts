const STOCK_CONSUMED_KEY = "shop_stock_consumed";

export function readConsumedStock(): Record<number, number> {
  try {
    const raw = localStorage.getItem(STOCK_CONSUMED_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const result: Record<number, number> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const id = Number(k);
      const qty = Number(v);
      if (Number.isInteger(id) && id > 0 && Number.isFinite(qty) && qty > 0) {
        result[id] = Math.floor(qty);
      }
    }
    return result;
  } catch {
    return {};
  }
}

export function writeConsumedStock(data: Record<number, number>): void {
  try {
    localStorage.setItem(STOCK_CONSUMED_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}