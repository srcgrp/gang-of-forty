export function formatPrice(num: number): string {
  const n = Number(num);
  if (!Number.isFinite(n) || n < 0) return "۰ تومان";
  return n.toLocaleString("fa-IR") + " تومان";
}

export function faNum(n: number): string {
  return n.toLocaleString("fa-IR");
}

export function safeHref(url: string | null | undefined): string {
  if (!url) return "#";
  const t = url.trim();
  if (/^#[a-zA-Z0-9_\-:.]*$/.test(t)) return t;
  if (/^tel:\+?[0-9\-() ]+$/.test(t)) return t;
  if (/^mailto:[^\s@]+@[^\s@]+$/.test(t)) return t;
  return "#";
}

export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) : text;
}
