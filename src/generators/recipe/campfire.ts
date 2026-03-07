import type { HasId, HasSingleInput, HasSingleOutput, HasTime } from "#hg/index";
import { builder, json, parseIngredients } from "#hg/index";

export type CampfireCfg = HasId & HasSingleInput & HasSingleOutput & HasTime;

export const campfire = builder({
  init: (id: string) => ({ id }),
  build: (cfg: CampfireCfg) => {
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
  }
});
