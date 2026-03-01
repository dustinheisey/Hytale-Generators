import type { Builder, HasAnyInput, HasAnyOutput, HasId, HasTier, HasTime } from "../../index.js";
import { builder, json, parseIngredients } from "../../index.js";

export type FurnaceRecipeCfg = HasId & HasAnyInput & HasAnyOutput & HasTime & HasTier<2>;

export const furnace: Builder<FurnaceRecipeCfg> = builder((cfg: FurnaceRecipeCfg) => {
  const { id, input, output, tier, time } = cfg;
  json(`/Server/Item/Recipes/Furnace/Furnace_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Processing" as const,
        id: "Furnace" as const,
        ...(tier ? { requiredTierLevel: tier } : {})
      }
    ],
    timeSeconds: time
  });
});
