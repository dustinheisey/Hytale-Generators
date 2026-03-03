import type { OrString } from "../index.js";

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export const isNumber = (arg: unknown) => typeof arg === "number";

export function orString<T extends { id: string }>(value: OrString<T>): T {
  return typeof value === "string" ? ({ id: value } as T) : value;
}
