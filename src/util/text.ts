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
