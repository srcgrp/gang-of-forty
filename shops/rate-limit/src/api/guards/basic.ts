export const isRecord = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null && !Array.isArray(x);

export const isString = (x: unknown): x is string => typeof x === "string";

export const isNumber = (x: unknown): x is number =>
  typeof x === "number" && Number.isFinite(x);

export const isPrice = (x: unknown): x is number => isNumber(x) && x >= 0;

export const isPercent = (x: unknown): x is number =>
  isNumber(x) && x >= 0 && x <= 100;

export const isArrayOf = <T>(
  x: unknown,
  guard: (v: unknown) => v is T
): x is T[] => Array.isArray(x) && x.every(guard);
