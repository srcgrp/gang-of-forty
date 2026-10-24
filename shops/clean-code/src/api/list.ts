export function keepList<T>(
  raw: unknown,
  guard: (item: unknown) => item is T,
  label: string,
): T[] {
  if (!Array.isArray(raw)) throw new Error("bad " + label);
  const list = raw.filter(guard);
  const dropped = raw.length - list.length;
  if (dropped > 0) console.log(dropped + " " + label + " dropped");
  return list;
}
