import type { Flatten } from "@hg";

export function flatten<T>(value: Flatten<T>): T[] {
  if (Array.isArray(value)) return value;

  // object: recurse
  const out: T[] = [];
  for (const v of Object.values(value)) out.push(...flatten(v));
  return out;
}
