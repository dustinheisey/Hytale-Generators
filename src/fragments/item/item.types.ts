import type { AutoComplete, HasId } from "hytale-generators";

export type BlockTexture = {
  texture?: string;
  upDown?: string;
  all?: string;
  up?: string;
  down?: string;
  north?: string;
  south?: string;
  east?: string;
  west?: string;
  sides?: string;
  weight?: number;
};

export interface HasLang {
  name?: string;
  baseName?: string;
  description?: string;
}

export interface HasItem {
  categories?: AutoComplete<
    | "Items"
    | "Items.Tools"
    | "Items.Weapons"
    | "Items.Armors"
    | "Items.Foods"
    | "Items.Potions"
    | "Items.Recipes"
    | "Items.Ingredients"
    | "Tool.BuilderTool"
    | "Tool.BuilderToolSecondPage"
    | "Tool.ScriptedBrushes"
    | "Tool.Block"
    | "Tool.BrushFilters"
    | "Tool.Machinima"
    | "Blocks.Rocks"
    | "Blocks.Structural"
    | "Blocks.Soils"
    | "Blocks.Ores"
    | "Blocks.Plants"
    | "Blocks.Fluids"
    | "Blocks.Portals"
    | "Blocks.Deco"
    | "Furniture.Benches"
    | "Furniture.Containers"
    | "Furniture.Furniture"
    | "Furniture.Doors"
    | "Furniture.Lighting"
    | "Furniture.Beds"
    | "Furniture.Shelves"
    | "Furniture.Signs"
  >;
  level?: number;
  maxStack?: number;
  quality?: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  sound?: string;
  resourceType?: string;
}

export interface HasIcon {
  icon?: boolean;
}

export type HasTexture<T extends string> = HasIcon & {
  color: string;
  model?: string;
  baseModel?: string;
  mask?: string;
  baseMask?: AutoComplete<T>;
  texture?: string;
  textureOverride?: BlockTexture[];
  baseTexture?: string;
  textureOut?: string;
};

export interface HasBlock {
  // playerAnimationsId: "block"; TODO: should be handled in fragments
  particleColor?: string;
  blockSoundSetId?: string;
  particleSetId?: string;
  transitionTexture?: string;
  transitionToGroups?: string[];
  set?: string;
  group?: string;
}

export interface HasDrops {
  gatherType?: string;
  drops?: string | string[];
}

export interface HasStrata {
  strata: "Stone" | "Basalt" | "Sandstone" | "Slate" | "Shale" | "Volcanic";
}

export type ItemCfg<T extends string = ""> = HasId & HasLang & HasItem & HasTexture<T>;

export type ItemBlockCfg<T extends string = ""> = HasId & HasLang & HasItem & HasTexture<T> & HasBlock;

export type BlockCfg<T extends string = ""> = HasId & HasLang & HasItem & HasTexture<T> & HasBlock;
