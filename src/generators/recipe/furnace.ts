import type { HasAnyInput, HasAnyOutput, HasId, HasTier, HasTime } from "#hg/index";
import { builder, global, json, parseIngredients } from "#hg/index";

export type FurnaceRecipeCfg = HasId & HasAnyInput & HasAnyOutput & HasTime & HasTier<2>;

export const furnace = builder({
  init: (id: string) => ({ id }),
  build: (cfg: FurnaceRecipeCfg) => {
    const { id, input, output, tier, time } = cfg;
    json(`${global().paths.recipe.json}/Furnace/Furnace_${id}`, {
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
  }
});
