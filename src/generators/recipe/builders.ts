import type { HasId, HasSingleInput, HasSingleOutput } from "#hg/index";
import { builder, global, json, parseIngredients } from "#hg/index";

export type BuilderRecipeCfg = HasId & HasSingleInput & HasSingleOutput;

export const builders = builder({
  init: (id: string) => ({ id }),
  build: (cfg: BuilderRecipeCfg) => {
    const { id, input, output } = cfg;
    const { recipes } = global();

    json(`${recipes.json}/Builder/Builder_${id}`, {
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
