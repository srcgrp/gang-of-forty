import type { Link } from "../types";

export function isLink(x: unknown): x is Link {
  return (
    isRecord(x) &&
    typeof x.label === "string" &&
    typeof x.href === "string"
  );
}

export function isRecord(
  x: unknown,
): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) &&
    x.every((item) => typeof item === "string");
}

export function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}