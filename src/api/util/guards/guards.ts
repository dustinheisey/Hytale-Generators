import type { AnyObj, OrString } from "#hg";

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function orString<Value extends { id: string }>(value: OrString<Value>): Value {
  return typeof value === "string" ? ({ id: value } as Value) : value;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isObj(value: unknown): value is AnyObj {
  return value !== null && typeof value === "object";
}
export function isNonArrayObj(value: unknown): value is AnyObj {
  return isObj(value) && !Array.isArray(value);
}
