import type { OrString } from "#hg/index";

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export const isNumber = (arg: unknown) => typeof arg === "number";

export function orString<T extends { id: string }>(value: OrString<T>): T {
  return typeof value === "string" ? ({ id: value } as T) : value;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
