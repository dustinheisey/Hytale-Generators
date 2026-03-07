import type { HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTime } from "#hg/index";
import { builder, json, parseIngredients, spreadItems } from "#hg/index";

export type CookingCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasCategories<"Prepared" | "Baked" | "Ingredients">;

export const cooking = builder({
  init: (id: string) => ({ id }),
  build: (cfg: CookingCfg) => {
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
  }
});
