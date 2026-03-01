import type { Builder, HasSingleInput, HasSingleOutput, HasId, HasTime } from "hytale-generators";
import { builder, json, parseIngredients } from "hytale-generators";

export type CampfireCfg = HasId & HasSingleInput & HasSingleOutput & HasTime;

export const campfire: Builder<CampfireCfg> = builder((cfg: CampfireCfg) => {
  const { id, input, output, time } = cfg;
  json(`/Server/Item/Recipes/Campfire/Campfire_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Processing" as const,
        id: "Campfire" as const,
      }
    ],
    timeSeconds: time
  });
});
