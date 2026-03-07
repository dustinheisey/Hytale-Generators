import type { HasAnyOutput, HasId, HasSingleInput, HasTime } from "#hg/index";
import { builder, json, parseIngredients } from "#hg/index";

export type SalvageRecipeCfg = HasId & HasSingleInput & HasAnyOutput & HasTime;

export const salvage = builder({
  init: (id: string) => ({ id }),
  build: (cfg: SalvageRecipeCfg) => {
    const { id, input, output, time } = cfg;

    json(`/Server/Item/Recipes/Salvage/Salvage_${id}`, {
      input: parseIngredients(input),
      primaryOutput: parseIngredients(output)[0],
      output: parseIngredients(output),
      benchRequirement: [
        {
          type: "Processing" as const,
          id: "Salvagebench" as const
        }
      ],
      timeSeconds: time
    });
  }
});
