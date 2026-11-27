
export function keepValid<T>(raw: unknown, isValid: (x: unknown) => x is T, name: string): T[] {
  if (!Array.isArray(raw)) {
  throw new Error(name + " is not a list");
  }
  const good = raw.filter(isValid);
  const dropped = raw.length - good.length
  if (dropped > 0) console.warn(dropped, name + " dropped")
  return good
}