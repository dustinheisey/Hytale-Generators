import type { Flatten, OrString } from "../index.js";

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

export function flatten<T>(value: Flatten<T>): T[] {
  if (Array.isArray(value)) return value;

  // object: recurse
  const out: T[] = [];
  for (const v of Object.values(value)) out.push(...flatten(v));
  return out;
}

export function include<T extends string>(type: T, cfg: { id: string; include?: T[]; exclude?: T[] }) {
  const { include, exclude } = cfg;
  return include ? include.includes(type) : exclude ? !exclude.includes(type) : true;
}
