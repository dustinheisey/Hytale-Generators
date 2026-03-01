import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTier, HasTime } from "hytale-generators";
import { builder, json, parseIngredients, spreadItems } from "hytale-generators";

export type FarmingCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasTier<9> &
  HasCategories<"Farming" | "Seeds" | "Saplings" | "Essence" | "Planters" | "Decorative">;

export const farming: Builder<FarmingCfg> = builder((cfg: FarmingCfg) => {
  const { id, input, output, time, tier, categories } = cfg;
  json(`/Server/Item/Recipes/Farming/Farming_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: "Farming_Bench" as const,
        ...(tier ? { requiredTierLevel: tier } : {}),
        categories: spreadItems(categories)
      }
    ],
    timeSeconds: time
  });
});
