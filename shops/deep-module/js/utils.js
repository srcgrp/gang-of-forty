// ═══════════════════════════════════════════════════
// utils.js — توابع کمکی
// ═══════════════════════════════════════════════════

export function escapeHTML(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatPrice(num) {
  const n = Number(num);
  if (!Number.isFinite(n) || n < 0) return "۰ تومان";
  return n.toLocaleString("fa-IR") + " تومان";
}

export function safeInt(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return min;
  return Math.min(Math.max(n, min), max);
}

export function safeHref(url) {
  if (!url || typeof url !== "string") return "#";
  const trimmed = url.trim();
  if (/^#[a-zA-Z0-9_\-:.]*$/.test(trimmed)) return trimmed;
  if (/^tel:\+?[0-9\-() ]+$/.test(trimmed)) return trimmed;
  if (/^mailto:[^\s@]+@[^\s@]+$/.test(trimmed)) return trimmed;
  return "#";
}

export function isValidProduct(p) {
  return (
    p &&
    typeof p === "object" &&
    Number.isInteger(p.id) &&
    p.id > 0 &&
    typeof p.name === "string" &&
    p.name.length > 0 &&
    typeof p.price === "number" &&
    Number.isFinite(p.price) &&
    p.price >= 0
  );
}

export function isValidCategory(c) {
  return (
    c &&
    typeof c === "object" &&
    Number.isInteger(c.id) &&
    c.id > 0 &&
    typeof c.name === "string" &&
    c.name.length > 0
  );
}
