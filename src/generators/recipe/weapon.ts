import type { Builder, HasAnyInput, HasCategories, HasId, HasSingleOutput, HasTier, HasTime } from "../../index.js";
import { builder, json, parseIngredients, spreadItems } from "../../index.js";

export type WeaponCfg = HasId &
  HasAnyInput &
  HasSingleOutput &
  HasTime &
  HasTier<3> &
  HasCategories<"Weapon_Sword" | "Weapon_Mace" | "Weapon_Battleaxe" | "Weapon_Daggers" | "Weapon_Bow">;

export const weapon: Builder<WeaponCfg> = builder((cfg: WeaponCfg) => {
  const { id, input, output, time, tier, categories } = cfg;
  json(`/Server/Item/Recipes/Weapon/Weapon_${id}`, {
    input: parseIngredients(input),
    primaryOutput: parseIngredients(output)[0],
    output: parseIngredients(output),
    benchRequirement: [
      {
        type: "Crafting" as const,
        id: "Weapon_Bench" as const,
        ...(tier ? { requiredTierLevel: tier } : {}),
        categories: spreadItems(categories)
      }
    ],
    timeSeconds: time
  });
});
