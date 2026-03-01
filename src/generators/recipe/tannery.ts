import type { Builder, HasId, HasSingleInput, HasSingleOutput, HasTier, HasTime } from "hytale-generators";
import { builder, json, parseIngredients } from "hytale-generators";

export type TanneryCfg = HasId & HasSingleInput & HasSingleOutput & HasTime & HasTier<2>;

export const tannery: Builder<TanneryCfg> = builder((cfg: TanneryCfg) => {
  const { id, input, output, tier, time } = cfg;
  json(`/Server/Item/Recipes/Tannery/Tannery_${id}`, {
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
});
