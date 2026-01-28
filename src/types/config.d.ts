declare type Config = {
  description?: boolean;
  model?: string;
  texture?: string;
  categories?: string[];
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
