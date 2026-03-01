import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTier, HasTime } from "../../index.js";
import { builder, json, parseIngredients, spreadItems } from "../../index.js";

export type AlchemyCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasTier<2> &
  HasCategories<"Alchemy_Potions" | "Alchemy_Potions_Misc" | "Alchemy_Bombs">;

export const alchemy: Builder<AlchemyCfg> = builder((cfg: AlchemyCfg) => {
  const { id, input, output, time, tier, categories } = cfg;
  json(`/Server/Item/Recipes/Alchemy/Alchemy_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: "Alchemy_Bench" as const,
        ...(tier ? { requiredTierLevel: tier } : {}),
        categories: spreadItems(categories)
      }
    ],
    timeSeconds: time
  });
});
