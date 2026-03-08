import type { Ingredient } from "#hg/index";

/**
 * Map a string or string[] into an array of outputs.
 */
export function spreadItems(input: string | string[]): string[];
export function spreadItems<T>(input: string | string[], func: (input: string) => T): T[];
export function spreadItems<T>(input: string | string[], func?: (input: string) => T): (T | string)[] {
  const arr = typeof input === "string" ? [input] : input;
  if (!func) return arr;
  return arr.map(func);
}

export function parseIngredients(input: string | string[]): Ingredient[] {
  return spreadItems(input, parseIngredient);
}

export function parseIngredient(input: string): Ingredient {
  const match = input.match(/^\s*(?<qty>\d+)\s*[xX]\s+(?<id>.+?)\s*$/);
  const quantity = match?.groups?.qty ? Number(match.groups.qty) : 1;
  const id = (match?.groups?.id ?? input).trim();

  if (id.startsWith("#")) return { TagId: id.slice(1), Quantity: quantity };
  if (id.startsWith("$")) return { ResourceTypeId: id.slice(1), Quantity: quantity };
  return { ItemId: id, Quantity: quantity };
}
