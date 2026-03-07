import type { HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTier, HasTime } from "#hg/index";
import { builder, json, parseIngredients, spreadItems } from "#hg/index";

type Categories = "Workbench_Survival" | "Workbench_Tools" | "Workbench_Crafting" | "Workbench_Tinkering";
export type WorkbenchCfg = HasId & HasAnyInput & HasSingleOutput & HasTime & HasTier<3> & HasCategories<Categories>;

export const workbench = builder({
  init: (id: string) => ({ id }),
  build: (cfg: WorkbenchCfg) => {
    const { id, input, output, time, tier, categories } = cfg;
    json(`/Server/Item/Recipes/Workbench/Workbench_${id}`, {
      input: parseIngredients(input),
      primaryOutput: parseIngredients(output)[0],
      output: parseIngredients(output),
      benchRequirement: [
        {
          type: "Crafting" as const,
          id: "Workbench_Bench" as const,
          ...(tier ? { requiredTierLevel: tier } : {}),
          categories: spreadItems(categories)
        }
      ],
      timeSeconds: time
    });
  }
});
