export function u(str: string): string {
  return str.replace(
    /(^|[ _])([a-z])/g,
    (_, separator: string, char: string) => separator + char.toUpperCase(),
  );
}
