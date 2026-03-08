import type { HasId, HasSingleInput, HasSingleOutput, HasTime } from "#hg/index";
import { builder, global, json, parseIngredients } from "#hg/index";

export type CampfireCfg = HasId & HasSingleInput & HasSingleOutput & HasTime;

export const campfire = builder({
  init: (id: string) => ({ id }),
  build: (cfg: CampfireCfg) => {
    const { id, input, output, time } = cfg;
    json(`${global().paths.recipe.json}/Campfire/Campfire_${id}`, {
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
