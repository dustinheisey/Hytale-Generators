import type { HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTime } from "../../index.js";
import { builder, json, parseIngredients, spreadItems } from "../../index.js";

export type ArcaneCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasCategories<"Arcane_Portals" | "Arcane_Misc">;

export const arcane = builder({
  init: (id: string) => ({ id }),
  build: (cfg: ArcaneCfg) => {
    const { id, input, output, time, categories } = cfg;
    json(`/Server/Item/Recipes/Arcane/Arcane_${id}`, {
      input: parseIngredients(input),
      primaryOutput: parseIngredients(output)[0],
      output: parseIngredients(output),
      benchRequirement: [
        {
          type: "Crafting" as const,
          id: "Arcanebench" as const,
          categories: spreadItems(categories)
        }
      ],
      timeSeconds: time
    });
  }
});
