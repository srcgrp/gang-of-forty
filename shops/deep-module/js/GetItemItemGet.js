

const API_BASE = "../../api";
const DEFAULT_TIMEOUT = 8000;        // ۸ ثانیه
const MAX_RETRIES = 3;                // حداکثر ۳ بار تلاش
const CACHE_PREFIX = "shop_cache_";
const CACHE_TTL = 1000 * 60 * 30;    // ۳۰ دقیقه

// ═══════════════════════════════════════════════════
// کلاس خطای اختصاصی
// ═══════════════════════════════════════════════════
export class ApiError extends Error {
  constructor(message, { type = "unknown", status = null, url = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.type = type;     // "network" | "timeout" | "http" | "parse" | "abort" | "offline"
    this.status = status;
    this.url = url;
  }

  get userMessage() {
    switch (this.type) {
      case "offline":
        return "اتصال اینترنت را بررسی کنید";
      case "timeout":
        return "پاسخی از سرور دریافت نشد";
      case "network":
        return "ارتباط با سرور برقرار نشد";
      case "http":
        if (this.status === 404) return "اطلاعات مورد نظر یافت نشد";
        if (this.status >= 500) return "سرور با مشکل مواجه است";
        return `خطای سرور (${this.status})`;
      case "parse":
        return "پاسخ سرور نامعتبر بود";
      default:
        return "خطای نامشخصی رخ داد";
    }
  }
}

// ═══════════════════════════════════════════════════
// fetch با timeout
// ═══════════════════════════════════════════════════
async function fetchWithTimeout(url, { timeout = DEFAULT_TIMEOUT, signal } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("timeout"), timeout);

  // اگه signal بیرونی لغو شد، این یکی هم لغو بشه
  const onAbort = () => controller.abort("external");
  if (signal) {
    if (signal.aborted) controller.abort("external");
    else signal.addEventListener("abort", onAbort, { once: true });
  }

  try {
    return await fetch(url, { signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") {
      if (controller.signal.reason === "timeout") {
        throw new ApiError("درخواست منقضی شد", { type: "timeout", url });
      }
      throw new ApiError("درخواست لغو شد", { type: "abort", url });
    }
    // خطای شبکه یا آفلاین
    if (!navigator.onLine) {
      throw new ApiError("دستگاه آفلاین است", { type: "offline", url });
    }
    throw new ApiError("خطای شبکه", { type: "network", url });
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener("abort", onAbort);
  }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ═══════════════════════════════════════════════════
// Cache Helpers
// ═══════════════════════════════════════════════════
function cacheKey(url) {
  return CACHE_PREFIX + url.replace(/[^\w]/g, "_");
}

function readCache(url) {
  try {
    const raw = localStorage.getItem(cacheKey(url));
    if (!raw) return null;
    const { data, time } = JSON.parse(raw);
    if (Date.now() - time > CACHE_TTL) {
      localStorage.removeItem(cacheKey(url));
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(url, data) {
  try {
    localStorage.setItem(cacheKey(url), JSON.stringify({ data, time: Date.now() }));
  } catch {
    /* ignore quota errors */
  }
}

export function clearCache() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(CACHE_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}

// ═══════════════════════════════════════════════════
// Core: getJSON با retry + timeout + cache fallback
// ═══════════════════════════════════════════════════
export async function getJSON(path, options = {}) {
  const url = `${API_BASE}/${path}`;
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = MAX_RETRIES,
    signal,
    useCache = true,
    onRetry = null,
  } = options;

  // اگه کاربر آفلاینه، مستقیم برو سر کش
  if (!navigator.onLine) {
    const cached = useCache ? readCache(url) : null;
    if (cached) return cached;
    throw new ApiError("دستگاه آفلاین است", { type: "offline", url });
  }

  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, { timeout, signal });

      if (!res.ok) {
        throw new ApiError(`HTTP ${res.status}`, {
          type: "http",
          status: res.status,
          url,
        });
      }

      let data;
      try {
        data = await res.json();
      } catch {
        throw new ApiError("پاسخ سرور نامعتبر بود", { type: "parse", url });
      }

      if (useCache) writeCache(url, data);
      return data;
    } catch (err) {
      lastError = err instanceof ApiError ? err : new ApiError("خطای نامشخص", { url });

      // این خطاها رو retry نکن
      const shouldRetry =
        lastError.type === "network" ||
        lastError.type === "timeout" ||
        (lastError.type === "http" && lastError.status >= 500);

      if (!shouldRetry || attempt === retries || signal?.aborted) break;

      // Backoff نمایی: 0.5s, 1s, 2s
      const waitMs = Math.min(500 * Math.pow(2, attempt), 3000);
      if (onRetry) onRetry({ attempt: attempt + 1, waitMs, error: lastError });
      await delay(waitMs);
    }
  }

  // Fallback به کش
  if (useCache) {
    const cached = readCache(url);
    if (cached) {
      console.warn(`📦 استفاده از کش برای: ${path}`);
      return cached;
    }
  }

  throw lastError;
}

// ═══════════════════════════════════════════════════
// API shortcuts
// ═══════════════════════════════════════════════════
export const api = {
  products: (opts) => getJSON("products.json", opts),
  categories: (opts) => getJSON("categories.json", opts),
  shop: (opts) => getJSON("shop.json", opts),
  home: (opts) => getJSON("home.json", opts),
  offers: (opts) => getJSON("offers.json", opts),
  stock: (opts) => getJSON("stock.json", opts),
};

// ═══════════════════════════════════════════════════
// Online/Offline watcher
// ═══════════════════════════════════════════════════
export function watchConnectivity({ onOnline, onOffline } = {}) {
  const online = () => onOnline?.();
  const offline = () => onOffline?.();
  window.addEventListener("online", online);
  window.addEventListener("offline", offline);
  return () => {
    window.removeEventListener("online", online);
    window.removeEventListener("offline", offline);
  };
}