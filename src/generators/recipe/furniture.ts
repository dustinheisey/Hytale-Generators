import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTime } from "hytale-generators";
import { builder, json, parseIngredients, spreadItems } from "hytale-generators";

export type FurnitureCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasCategories<
    | "Furniture_Storage"
    | "Furniture_Beds"
    | "Furniture_Lighting"
    | "Furniture_Pottery"
    | "Furniture_Textiles"
    | "Furniture_Village_Walls"
    | "Furniture_Misc"
    | "Furniture_Seasonal"
  >;

export const furniture: Builder<FurnitureCfg> = builder((cfg: FurnitureCfg) => {
  const { id, input, output, time, categories } = cfg;
  json(`/Server/Item/Recipes/Furniture/Furniture_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: "Furniture_Bench" as const,
        categories: spreadItems(categories)
      }
    ],
    timeSeconds: time
  });
});
