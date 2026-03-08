import { assertNonEmpty } from "#hg/index";
/**
 *
 * @param str - string to capitalize
 * @returns capitalized string preserving _ separators
 */
export function uSep(str: string): string {
  return str.replace(
    /(^|[ _])([a-z])/g,
    (_: string, separator: string, char: string) => separator + char.toUpperCase()
  );
}

/**
 *
 * @param str - string to capitalize
 * @returns capitalized string
 */
export function u(str: string): string {
  return str
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(^|\s)([a-z])/g, (_: string, separator: string, char: string) => separator + char.toUpperCase());
}

export function expectDefined<T>(value: T | undefined, message = "Unexpected undefined"): T {
  if (value === undefined) {
    throw new Error(message);
  }
  return value;
}

/**
 *
 * @param strs - individual string array
 * @returns - single string joining each item in array with , or and
 */
export function join(strs: string[]): string {
  if (!Array.isArray(strs)) throw new TypeError("strings must be an array");

  if (strs.length === 0) return "";

  if (strs.length === 1) {
    assertNonEmpty(strs);
    return `<b>${strs[0]}</b>`;
  }

  if (strs.length === 2) {
    const first = expectDefined(strs[0]);
    const second = expectDefined(strs[1]);
    return `<b>${first}</b> and <b>${second}</b>`;
  }

  assertNonEmpty(strs);

  const head = strs.slice(0, -1).join("</b>, <b>");
  const last = expectDefined(strs.at(-1), "Expected last string");
  return `<b>${head}</b> and <b>${last}</b>`;
}

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type Pascal<T> = T extends Primitive
  ? T
  : T extends readonly (infer U)[]
    ? Pascal<U>[]
    : T extends object
      ? { [K in keyof T as K extends string ? Capitalize<K> : K]: Pascal<T[K]> }
      : T;

export function toPascal<T>(input: T): Pascal<T>;
export function toPascal(input: unknown): unknown {
  if (Array.isArray(input)) {
    return (input as unknown[]).map(x => toPascal(x));
  }

  if (typeof input === "object" && input !== null) {
    const out: Record<string, unknown> = {};

    for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
      const first = expectDefined(k[0], "Expected non-empty key");
      out[first.toUpperCase() + k.slice(1)] = toPascal(v);
    }

    return out;
  }

  return input;
}
