export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0;
}
export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
export function isNonNegativeNumber(value: unknown): value is number {
  return isFiniteNumber(value) && value >= 0;
}
export function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}
export function isSafeHref(value: unknown): value is string {
  if (!isNonEmptyString(value)) return false;
  const href = value.trim();
  if (href.startsWith("#")) return true;
  if (href.startsWith("//") || href.includes("\\")) return false;
  if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href)) return true;
  try {
    return ["http:", "https:", "mailto:", "tel:"].includes(
      new URL(href).protocol,
    );
  } catch {
    return false;
  }
}
