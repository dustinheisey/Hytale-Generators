import type { Builder, HasId, HasSingleInput, HasSingleOutput } from "hytale-generators";
import { builder as generatorBuilder, json, parseIngredients } from "hytale-generators";

export type BuilderRecipeCfg = HasId & HasSingleInput & HasSingleOutput;

export const builder: Builder<BuilderRecipeCfg> = generatorBuilder((cfg: BuilderRecipeCfg) => {
  const { id, input, output } = cfg;

  json(`/Server/Item/Recipes/Builder/Builder_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    benchRequirement: [
      {
        type: "StructuralCrafting",
        id: "Builders"
      }
    ]
  });
});
