import { createGenerator, globalConfig } from "../index.ts";

export interface Put {
  ItemId?: string;
  ResourceTypeId?: string;
  Quantity: number;
}

type CraftingType = "Crafting" | "DiagramCrafting" | "StructuralCrafting" | "Processing";

type Bench =
  | "Salvage_Bench"
  | "Alchemy_Bench"
  | "Arcane_Bench"
  | "Armour_Bench"
  | "Builders_Bench"
  | "Farming_Bench"
  | "Furniture_Bench"
  | "Workbench"
  | "Campfire_Bench"
  | "Cooking_Bench"
  | "Furnace"
  | "Tannery_Bench"
  | "Lumbermill_Bench"
  | "Weapon_Bench"
  | "Armory_Bench"
  | "Loom_Bench"
  | "Trough_Bench";

type BenchCategory = "Weapon_Misc";

type BenchConfig = Bench | { Id: Bench; Categories?: BenchCategory[]; Tier: number };

export interface RecipeConfig {
  Id: string;
  Input: Put[];
  Output: Put[];
  Bench: BenchConfig;
  TimeSeconds: number;
}

export type RecipeData = {
  Input: Put[];
  Output?: Put[];
  PrimaryOutput: Put;
  BenchRequirement: Array<{
    Type: CraftingType;
    Id: Bench;
    RequiredTierLevel: number;
    Categories?: BenchCategory[];
  }>;
  TimeSeconds: number;
};

/**
 *
 * @param bench - bench id or config with id, tier and optional categories array
 * @returns bench requirement config object
 */
function benchRequirement(bench: BenchConfig) {
  const isObj = typeof bench === "object";
  const id = isObj ? bench.Id : bench;

  let type: CraftingType;

  switch (id) {
    case "Alchemy_Bench":
      type = "Crafting";
      break;
    case "Arcane_Bench":
      type = "Crafting";
      break;
    case "Armory_Bench":
      type = "DiagramCrafting";
      break;
    case "Armour_Bench":
      type = "Crafting";
      break;
    case "Builders_Bench":
      type = "StructuralCrafting";
      break;
    case "Campfire_Bench":
      type = "Processing";
      break;
    case "Cooking_Bench":
      type = "Crafting";
      break;
    case "Farming_Bench":
      type = "Crafting";
      break;
    case "Furnace":
      type = "Processing";
      break;
    case "Furniture_Bench":
      type = "Crafting";
      break;
    case "Loom_Bench":
      type = "Crafting";
      break;
    case "Lumbermill_Bench":
      type = "Crafting";
      break;
    case "Salvage_Bench":
      type = "Processing";
      break;
    case "Tannery_Bench":
      type = "Processing";
      break;
    case "Trough_Bench":
      type = "Crafting";
      break;
    case "Weapon_Bench":
      type = "Crafting";
      break;
    case "Workbench":
      type = "Crafting";
      break;
    default:
      type = "Crafting";
  }

  return {
    Type: type,
    Id: id,
    RequiredTierLevel: isObj ? bench.Tier : 1,
    ...(isObj && bench.Categories?.length ? { Categories: bench.Categories } : {})
  };
}

export const recipe = createGenerator<RecipeConfig, RecipeData>({
  json: {
    path: c => `Server/Item/Recipes/${c.Id}`,
    data: c => ({
      Input: c.Input,
      PrimaryOutput: c.Output[0],
      ...(c.Output.length > 1 && { Output: c.Output.slice(1) }),
      BenchRequirement: [
        {
          ...benchRequirement(c.Bench)
        }
      ],
      TimeSeconds: c.TimeSeconds || globalConfig.TimeSeconds
    })
  }
});
