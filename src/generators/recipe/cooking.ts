import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTime } from "hytale-generators";
import { builder, json, parseIngredients, spreadItems } from "hytale-generators";

export type CookingCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasCategories<"Prepared" | "Baked" | "Ingredients">;

export const cooking: Builder<CookingCfg> = builder((cfg: CookingCfg) => {
  const { id, input, output, time, categories } = cfg;
  json(`/Server/Item/Recipes/Cooking/Cooking_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: "Cookingbench" as const,
        categories: spreadItems(categories)
      }
    ],
    timeSeconds: time
  });
});
