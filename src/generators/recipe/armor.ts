import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTier, HasTime } from "../../index.js";
import { builder, json, parseIngredients, spreadItems } from "../../index.js";

export type ArmorCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasTier<3> &
  HasCategories<"Armor_Head" | "Armor_Chest" | "Armor_Hands" | "Armor_Legs" | "Weapon_Shield">;

export const armor: Builder<ArmorCfg> = builder((cfg: ArmorCfg) => {
  const { id, input, output, time, tier, categories } = cfg;
  json(`/Server/Item/Recipes/Armor/Armor_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: "Armor_Bench" as const,
        ...(tier ? { requiredTierLevel: tier } : {}),
        categories: spreadItems(categories)
      }
    ],
    timeSeconds: time
  });
});
