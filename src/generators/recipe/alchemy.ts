import type { HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTier, HasTime } from "#hg/index";
import { builder, global, json, parseIngredients, spreadItems } from "#hg/index";

export type AlchemyCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasTier<2> &
  HasCategories<"Alchemy_Potions" | "Alchemy_Potions_Misc" | "Alchemy_Bombs">;

export const alchemy = builder({
  init: (id: string) => ({ id }),
  build: (cfg: AlchemyCfg) => {
    const { id, input, output, time, tier, categories } = cfg;
    const { recipes } = global();

    json(`${recipes.json}/Alchemy/Alchemy_${id}`, {
      input: parseIngredients(input),
      primaryOutput: parseIngredients(output)[0],
      output: parseIngredients(output),
      benchRequirement: [
        {
          type: "Crafting" as const,
          id: "Alchemybench" as const,
          ...(tier ? { requiredTierLevel: tier } : {}),
          categories: spreadItems(categories)
        }
      ],
      timeSeconds: time
    });
  }
});
