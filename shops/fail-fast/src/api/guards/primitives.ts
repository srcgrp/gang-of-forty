/**
 * Primitive type guards for runtime validation.
 */

export function isString(value: unknown): value is string {
  return typeof value === "string"
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !Number.isNaN(value)
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString)
}
