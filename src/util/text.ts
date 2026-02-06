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

/**
 *
 * @param strs - individual string array
 * @returns - single string joining each item in array with , or and
 */
export function join(strs: string[]) {
  if (!Array.isArray(strs)) throw new TypeError("strings must be an array");

  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];
  if (strs.length === 2) return `${strs[0]} and ${strs[1]}`;

  const head = strs.slice(0, -1).join(", ");
  const last = strs[strs.length - 1];
  return `${head} and ${last}`;
}
