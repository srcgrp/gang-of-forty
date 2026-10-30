export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function isFiniteNumber(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

export function isNullableString(x: unknown): x is string | null {
  return x === null || typeof x === "string";
}

export function isArrayOf<T>(
  x: unknown,
  guard: (item: unknown) => item is T,
): x is T[] {
  return Array.isArray(x) && x.every(guard);
}
