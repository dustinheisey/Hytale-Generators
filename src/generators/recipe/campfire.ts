import type { Builder, HasId, HasSingleInput, HasSingleOutput, HasTime } from "../../index.js";
import { builder, json, parseIngredients } from "../../index.js";

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
        id: "Campfire" as const
      }
    ],
    timeSeconds: time
  });
});
