import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTime } from "hytale-generators";
import { builder, json, parseIngredients, spreadItems } from "hytale-generators";

export type LoomCfg = HasId & HasAnyInput & HasSingleOutput & HasTime & HasCategories<"All">;

export const loom: Builder<LoomCfg> = builder((cfg: LoomCfg) => {
  const { id, input, output, time, categories } = cfg;
  json(`/Server/Item/Recipes/Loom/Loom_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: "Loombench" as const,
        categories: spreadItems(categories)
      }
    ],
    timeSeconds: time
  });
});
