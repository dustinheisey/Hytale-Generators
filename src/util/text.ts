export function u(str: string): string {
  return str.replace(/\b[a-z]/g, (c) => c.toUpperCase());
}
