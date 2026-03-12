import {
  type HasAnyInput,
  type HasAnyOutput,
  type HasMultipleInputs,
  type HasMultipleOutputs,
  type HasSingleInput,
  type HasSingleOutput,
  type HasTier,
  type HasTime,
  type Ingredient,
  type HasRecipeCategories
} from "@";

export function parseIngredients(input: string | string[]): Ingredient[] {
  const arr = typeof input === "string" ? [input] : input;
  return arr.map(input => {
    const match = input.match(/^\s*(?<qty>\d+)\s*[xX]\s+(?<id>.+?)\s*$/);
    const quantity = match?.groups?.qty ? Number(match.groups.qty) : 1;
    const id = (match?.groups?.id ?? input).trim();

    if (id.startsWith("#")) return { TagId: id.slice(1), Quantity: quantity };
    if (id.startsWith("$")) return { ResourceTypeId: id.slice(1), Quantity: quantity };
    return { ItemId: id, Quantity: quantity };
  });
}

/** `{ input: parseIngredients(cfg.input) }` */
export const withSingleInput = (cfg: HasSingleInput) => ({ input: parseIngredients(cfg.input) });

/** `{ input: parseIngredients(cfg.input) }` */
export const withMultipleInputs = (cfg: HasMultipleInputs) => ({ input: parseIngredients(cfg.input) });

/** `{ input: parseIngredients(cfg.input) }` */
export const withAnyInput = (cfg: HasAnyInput) => ({ input: parseIngredients(cfg.input) });

/**
 * `{
 *   primaryOutput: parseIngredients(cfg.output)[0],
 *   output: parseIngredients(cfg.output)
 * }`
 */
export const withAnyOutput = (cfg: HasAnyOutput) => ({
  primaryOutput: parseIngredients(cfg.output)[0],
  output: parseIngredients(cfg.output)
});

/**
 * `{
 *   primaryOutput: parseIngredients(cfg.output)[0],
 *   output: parseIngredients(cfg.output)
 * }`
 */
export const withSingleOutput = (cfg: HasSingleOutput) => ({
  primaryOutput: parseIngredients(cfg.output)[0],
  output: parseIngredients(cfg.output)
});

/**
 * `{
 *   primaryOutput: parseIngredients(cfg.output)[0],
 *   output: parseIngredients(cfg.output)
 * }`
 */
export const withMultipleOutput = (cfg: HasMultipleOutputs) => ({
  primaryOutput: parseIngredients(cfg.output)[0],
  output: parseIngredients(cfg.output)
});

/** `{ timeSeconds: cfg.time }` */
export const withTime = (cfg: HasTime) => ({ timeSeconds: cfg.time });
export const withCraftingBench =
  <K extends number>(bench: string) =>
  (cfg: HasRecipeCategories<string> & HasTier<K>) => ({
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: bench,
        ...(cfg.tier ? { requiredTierLevel: cfg.tier } : {}),
        categories: cfg.categories
      }
    ]
  });
export const withProcessingBench =
  <K extends number>(bench: string) =>
  (cfg: HasTier<K>) => ({
    benchRequirement: [
      {
        type: "Processing" as const,
        id: bench,
        ...(cfg.tier ? { requiredTierLevel: cfg.tier } : {})
      }
    ]
  });
export const withStructuralBench =
  <K extends number>(bench: string) =>
  (cfg: HasTier<K>) => ({
    benchRequirement: [
      {
        type: "StructuralCrafting" as const,
        id: bench,
        ...(cfg.tier ? { requiredTierLevel: cfg.tier } : {})
      }
    ]
  });
