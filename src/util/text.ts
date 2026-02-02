// Keeps separators (space/underscore) but uppercases the first letter after them:
// "test_two" -> "Test_Two", "test two" -> "Test Two"
export function uSep(str: string): string {
  return str.replace(
    /(^|[ _])([a-z])/g,
    (_: string, separator: string, char: string) =>
      separator + char.toUpperCase(),
  );
}

// Turns underscores into spaces AND title-cases words:
// "test_two" -> "Test Two", "test  two" -> "Test Two"
export function u(str: string): string {
  return str
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(
      /(^|\s)([a-z])/g,
      (_: string, separator: string, char: string) =>
        separator + char.toUpperCase(),
    );
}

export function join(items: string[]) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");

  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  const head = items.slice(0, -1).join(", ");
  const last = items[items.length - 1];
  return `${head} and ${last}`;
}
