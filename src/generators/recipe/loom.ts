import type { HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTime } from "#hg/index";
import { builder, global, json, parseIngredients, spreadItems } from "#hg/index";

export type LoomCfg = HasId & HasAnyInput & HasSingleOutput & HasTime & HasCategories<"All">;

export const loom = builder({
  init: (id: string) => ({ id }),
  build: (cfg: LoomCfg) => {
    const { id, input, output, time, categories } = cfg;
    const { recipes } = global();

    json(`${recipes.json}/Loom/Loom_${id}`, {
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
  }
});
