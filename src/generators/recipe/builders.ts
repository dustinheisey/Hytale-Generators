import type { HasId, HasSingleInput, HasSingleOutput } from "../../index.js";
import { builder, json, parseIngredients } from "../../index.js";

export type BuilderRecipeCfg = HasId & HasSingleInput & HasSingleOutput;

export const builders = builder({
  init: (id: string) => ({ id }),
  build: (cfg: BuilderRecipeCfg) => {
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
  }
});
