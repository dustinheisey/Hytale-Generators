declare interface Input {
  ResourceTypeId?: string;
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
  | "Salvagebench"
  | "Alchemybench"
  | "Arcanebench"
  | "Armourbench"
  | "Buildersbench"
  | "Farmingbench"
  | "Furniturebench"
  | "Workbench"
  | "Campfirebench"
  | "Cookingbench"
  | "Furnace"
  | "Tannerybench"
  | "Lumbermillbench"
  | "Weaponbench"
  | "Armorybench"
  | "Loombench"
  | "Troughbench";

declare interface BenchRequirement {
  Type: CraftingType;
  Id: Bench;
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
  processingTime: number;
  outputs: Output[];
}
