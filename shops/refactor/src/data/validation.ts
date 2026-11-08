export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
export const isText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
export const isNatural = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
export const isId = (value: unknown): value is number => isNatural(value) && value > 0;
