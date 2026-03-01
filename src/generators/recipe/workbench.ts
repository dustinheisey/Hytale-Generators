import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTier, HasTime } from "hytale-generators";
import { builder, json, parseIngredients, spreadItems } from "hytale-generators";

export type WorkbenchCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasTier<3> &
  HasCategories<"Workbench_Survival" | "Workbench_Tools" | "Workbench_Crafting" | "Workbench_Tinkering">;

export const workbench: Builder<WorkbenchCfg> = builder((cfg: WorkbenchCfg) => {
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
});
