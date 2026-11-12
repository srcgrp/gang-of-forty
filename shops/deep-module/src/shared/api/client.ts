import type { ApiErrorType } from "../types";

const BASE = import.meta.env.VITE_API_URL || "/api";
const TIMEOUT = 8000;
const RETRIES = 2;

export class ApiError extends Error {
  readonly type: ApiErrorType;
  readonly status: number | null;
  readonly url: string | null;

  constructor(
    msg: string,
    type: ApiErrorType = "unknown",
    status: number | null = null,
    url: string | null = null,
  ) {
    super(msg);
    this.name = "ApiError";
    this.type = type;
    this.status = status;
    this.url = url;
  }
}

const delay = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));

async function request(url: string, signal?: AbortSignal): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("timeout"), TIMEOUT);
  if (signal) {
    if (signal.aborted) controller.abort("external");
    else signal.addEventListener("abort", () => controller.abort("external"), { once: true });
  }
  try {
    return await fetch(url, { signal: controller.signal });
  } catch (err: unknown) {
    if (controller.signal.reason === "timeout")
      throw new ApiError("timeout", "timeout", null, url);
    if (controller.signal.aborted)
      throw new ApiError("aborted", "abort", null, url);
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function readJson(res: Response, url: string): Promise<unknown> {
  try {
    return (await res.json()) as unknown;
  } catch {
    throw new ApiError("invalid json", "parse", null, url);
  }
}

export async function getJSON(
  path: string,
  options: { signal?: AbortSignal } = {},
): Promise<unknown> {
  const url = `${BASE}/${path}`;
  let last: ApiError | null = null;
  for (let i = 0; i <= RETRIES; i++) {
    try {
      const res = await request(url, options.signal);
      if (!res.ok) throw new ApiError(`HTTP ${res.status}`, "http", res.status, url);
      return await readJson(res, url);
    } catch (err: unknown) {
      if (err instanceof ApiError) last = err;
      else if (err instanceof DOMException && err.name === "AbortError")
        last = new ApiError("aborted", "abort", null, url);
      else last = new ApiError("network", "network", null, url);
      if (i === RETRIES) break;
      await delay(500 * 2 ** i);
    }
  }
  throw last ?? new ApiError("unknown", "unknown", null, url);
}

export const api = {
  products: () => getJSON("products.json"),
  categories: () => getJSON("categories.json"),
  shop: () => getJSON("shop.json"),
  home: () => getJSON("home.json"),
  offers: () => getJSON("offers.json"),
  stock: () => getJSON("stock.json"),
};