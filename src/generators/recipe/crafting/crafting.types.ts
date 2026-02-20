import type { IntClosedRange as Range } from "type-fest";
import type { Ingredient, Pascal } from "../../../index.js";

export interface CraftingBench {
  Arcanebench: { Category: "Arcane_Portals" | "Arcane_Misc" };
  Alchemybench: {
    Category: "Alchemy_Potions" | "Alchemy_Potions_Misc" | "Alchemy_Bombs";
    Tier: Range<1, 2>;
  };
  Armor_Bench: {
    Category: "Armor_Head" | "Armor_Chest" | "Armor_Hands" | "Armor_Legs" | "Weapon_Shield";
    Tier: Range<1, 3>;
  };
  Weapon_Bench: {
    Category: "Weapon_Sword" | "Weapon_Mace" | "Weapon_Battleaxe" | "Weapon_Daggers" | "Weapon_Bow";
    Tier: Range<1, 3>;
  };
  Farmingbench: {
    Category:
      | "Farming"
      | "Seeds"
      | "Saplings"
      | "Essence"
      | "Planters"
      | "Decorative";
    Tier: Range<1, 9>;
  };
  Furniture_Bench: {
    Category:
      | "Furniture_Storage"
      | "Furniture_Beds"
      | "Furniture_Lighting"
      | "Furniture_Pottery"
      | "Furniture_Textiles"
      | "Furniture_Village_Walls"
      | "Furniture_Misc"
      | "Furniture_Seasonal";
  };
  Workbench: {
    Category: "Workbench_Survival" | "Workbench_Tools" | "Workbench_Crafting" | "Workbench_Tinkering";
    Tier: Range<1, 3>;
  };
  Cookingbench: { Category: "Prepared" | "Baked" | "Ingredients" };
  Loombench: { Category: "All" };
}

export type CraftingBenchId = keyof CraftingBench;
export type CategoryFor<B extends CraftingBenchId> = CraftingBench[B]["Category"];
export type CraftingTierFor<B extends CraftingBenchId> = CraftingBench[B] extends { Tier: infer T extends number }
  ? T
  : never;
type CraftingBenchesWithTier = {
  [B in CraftingBenchId]: CraftingTierFor<B> extends never ? never : B;
}[CraftingBenchId];

export interface CraftingRecipeConfig<B extends CraftingBenchId = CraftingBenchId> {
  id: string;
  benchId: B;
  category: CategoryFor<B> | CategoryFor<B>[];
  input: string | string[];
  output: string;
  time: number;
  tier?: CraftingTierFor<B>;
}

export type CraftingRecipeData = Pascal<{
  input: Ingredient[];
  primaryOutput: Ingredient;
  benchRequirement: {
    type: "Crafting";
    id: CraftingBenchId;
    requiredTierLevel: number;
    categories: string[];
  }[];
  timeSeconds: number;
}>;

export type BenchWrapper<B extends CraftingBenchId> = B extends CraftingBenchesWithTier
  ? (
      id: string,
      category: CategoryFor<B> | CategoryFor<B>[],
      input: string | string[],
      output: string,
      time: number,
      tier?: CraftingTierFor<B>
    ) => void
  : (
      id: string,
      category: CategoryFor<B> | CategoryFor<B>[],
      input: string | string[],
      output: string,
      time: number
    ) => void;
