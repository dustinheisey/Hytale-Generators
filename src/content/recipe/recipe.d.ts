declare interface Input {
  ResourceTypeId?: string;
  name?: string;
  Id?: string;
  ItemId?: string;
  Quantity: number;
}

declare interface Output {
  ItemId: string;
  Quantity: number;
}

declare type CraftingType =
  | "Crafting"
  | "DiagramCrafting"
  | "StructuralCrafting"
  | "Processing";

declare type Bench =
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

declare interface BenchRequirement {
  Type: CraftingType;
  Id: Bench;
  RequiredTierLevel: number;
}

declare interface BaseRecipeData {
  Input: Input[];
  BenchRequirement: BenchRequirement[];
  TimeSeconds: number;
}

declare interface RecipeData extends BaseRecipeData {
  OutputQuantity: number;
}

declare interface ExternalRecipeData extends BaseRecipeData {
  PrimaryOutput: Output;
  Output?: Output[];
}

declare interface RecipeConfig {
  id: string;
  inputs: Input[];
  bench: Bench;
  tier: number;
  processingTime: number;
  outputs: Output[];
}
