import {
  type HasAnyInput,
  type HasAnyOutput,
  type HasMultipleInputs,
  type HasMultipleOutputs,
  type HasSingleInput,
  type HasSingleOutput,
  type HasTime,
  type Ingredient,
  type HasRecipeCategories
} from "@";

export function parseIngredient(input: string): Ingredient {
  const match = input.match(/^\s*(?<qty>\d+)\s*[xX]\s+(?<id>.+?)\s*$/);
  const quantity = match?.groups?.qty ? Number(match.groups.qty) : 1;
  const id = (match?.groups?.id ?? input).trim();

  if (id.startsWith("#")) return { TagId: id.slice(1), Quantity: quantity };
  if (id.startsWith("$")) return { ResourceTypeId: id.slice(1), Quantity: quantity };
  return { ItemId: id, Quantity: quantity };
}

export function parseIngredients(input: string[]): Ingredient[] {
  return input.map(parseIngredient);
}

/** `{ input: parseIngredient(cfg.input) }` */
export const withSingleInput = (cfg: HasSingleInput) => ({
  input: parseIngredients(Array.isArray(cfg.input) ? cfg.input : [cfg.input])
});

/** `{ input: parseIngredients(cfg.input) }` */
export const withMultipleInputs = (cfg: HasMultipleInputs) => ({
  input: parseIngredients(Array.isArray(cfg.input) ? cfg.input : [cfg.input])
});

/** `{ input: parseIngredients(cfg.input) }` — normalizes single or multiple inputs to array */
export const withAnyInput = (cfg: HasAnyInput) => ({
  input: parseIngredients(Array.isArray(cfg.input) ? cfg.input : [cfg.input])
});

/** `{ primaryOutput: Ingredient, output: Ingredient[] }` */
export const withSingleOutput = (cfg: HasSingleOutput) => {
  const output = parseIngredient(cfg.output);
  return { primaryOutput: output, output: [output] };
};

/** `{ primaryOutput: Ingredient, output: Ingredient[] }` */
export const withMultipleOutput = (cfg: HasMultipleOutputs) => {
  const output = parseIngredients(cfg.output);
  return { primaryOutput: output[0], output };
};

/** `{ primaryOutput: Ingredient, output: Ingredient[] }` — normalizes single or multiple outputs to array */
export const withAnyOutput = (cfg: HasAnyOutput) => {
  const output = parseIngredients(Array.isArray(cfg.output) ? cfg.output : [cfg.output]);
  return { primaryOutput: output[0], output };
};

/** `{ timeSeconds: cfg.time }` */
export const withTime = (cfg: HasTime) => ({ timeSeconds: cfg.time });

export const withCraftingBench = <K extends number>(bench: string, cfg: HasRecipeCategories<string> & { tier?: K }) => {
  if (!cfg.categories.length) throw new Error(`withCraftingBench: categories is required`);
  return {
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: bench,
        ...(cfg.tier ? { requiredTierLevel: cfg.tier } : {}),
        categories: cfg.categories
      }
    ]
  };
};

export const withProcessingBench = (bench: string, cfg: { tier?: number } | object) => ({
  benchRequirement: [
    {
      type: "Processing" as const,
      id: bench,
      ...("tier" in cfg && cfg.tier ? { requiredTierLevel: cfg.tier } : {})
    }
  ]
});

export const withStructuralBench = (bench: string, cfg: { tier?: number } | object) => ({
  benchRequirement: [
    {
      type: "StructuralCrafting" as const,
      id: bench,
      ...("tier" in cfg && cfg.tier ? { requiredTierLevel: cfg.tier } : {})
    }
  ]
});
