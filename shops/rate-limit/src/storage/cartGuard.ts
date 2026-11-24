import type { Cart, CartLine } from "../types";

const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null && !Array.isArray(x);

const isQuantity = (x: unknown): x is number =>
  typeof x === "number" && Number.isInteger(x) && x > 0;

const isLine = (x: unknown): x is CartLine =>
  isObject(x) &&
  typeof x.id === "number" &&
  typeof x.name === "string" &&
  typeof x.price === "number" &&
  isQuantity(x.quantity);

export const isCart = (x: unknown): x is Cart =>
  isObject(x) &&
  Object.entries(x).every(([key, line]) => isLine(line) && String(line.id) === key);
