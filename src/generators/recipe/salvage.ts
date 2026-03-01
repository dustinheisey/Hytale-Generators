import type { Builder, HasAnyOutput, HasId, HasSingleInput, HasTime } from "hytale-generators";
import { builder, json, parseIngredients } from "hytale-generators";

export type SalvageRecipeCfg = HasId & HasSingleInput & HasAnyOutput & HasTime;

export const salvage: Builder<SalvageRecipeCfg> = builder((cfg: SalvageRecipeCfg) => {
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
});
