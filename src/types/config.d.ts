declare type Config = {
  description?: string;
  model?: string;
  texture?: string;
  categories?: Tab[];
  color?: string;
  particleColor?: string;
  lightColor?: string;
  sparksColor?: string;
  benchRequirement?: {
    Type: "Processing" | "Crafting";
    Id: string;
  };
  outputQuantity?: number;
  processingTime?: number;
  itemLevel?: number;
  include?: Filter[];
  exclude?: Filter[];
};

declare type MaterialConfig = { id: string; config?: Config } | string;

declare type Filter =
  | "ingot"
  | "gem"
  | "ore"
  | "ore_stone"
  | "ore_basalt"
  | "ore_sandstone"
  | "ore_slate"
  | "ore_shale"
  | "ore_volcanic";

declare type BlockType =
  | "stone"
  | "basalt"
  | "sandstone"
  | "slate"
  | "shale"
  | "volcanic";

declare type Tab =
  | "Items"
  | "Blocks.Ores"
  | "Unified_Materials.Gems"
  | "Unified_Materials.Ores"
  | "Unified_Materials.Ingots"
  | "Unified_Materials.Alloys";
