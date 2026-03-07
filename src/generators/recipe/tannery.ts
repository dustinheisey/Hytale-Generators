import type { HasId, HasSingleInput, HasSingleOutput, HasTier, HasTime } from "#hg/index";
import { builder, json, parseIngredients, global } from "#hg/index";

export type TanneryCfg = HasId & HasSingleInput & HasSingleOutput & HasTime & HasTier<2>;

export const tannery = builder({
  init: (id: string) => ({ id }),
  build: (cfg: TanneryCfg) => {
    const { id, input, output, tier, time } = cfg;
    const { recipes } = global();

    json(`${recipes.json}/Tannery/Tannery_${id}`, {
      input: parseIngredients(input),
      primaryOutput: parseIngredients(output)[0],
      output: parseIngredients(output),
      benchRequirement: [
        {
          type: "Processing" as const,
          id: "Tannery" as const,
          ...(tier ? { requiredTierLevel: tier } : {})
        }
      ],
      timeSeconds: time
    });
  }
});
