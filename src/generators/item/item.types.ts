import { type AutoComplete, type HasSimpleIcon } from "#hg";

export type IconProperties = {
  scale: number;
  rotation: [number, number, number];
  translation: [number, number];
};

export interface HasIcon extends HasSimpleIcon {
  baseIcon?: string;
  iconProperties?: IconProperties;
}

export type Tab = AutoComplete<
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

// export interface HasItem {
//   categories?: Tab | Tab[];
//   level?: number;
//   maxStack?: number;
//   quality?: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
//   sound?: string;
//   resourceType?: string;
// }

export interface HasColor {
  color: string;
}

export type HasTexture = { texture?: string; color?: string; mask?: string; baseMask?: string; textureOut?: string };

// export type HasTexture<T extends string = ""> = HasIcon &
//   HasColor & {
//     model?: string;
//     baseModel?: string;
//     mask?: string;
//     baseMask?: AutoComplete<T>;
//     texture?: string;
//     baseTexture?: string;
//     textureOut?: string;
//   };

// import type { AutoComplete } from "#hg/util/types";
// import type * as Item from "../item.types.js";

// export type BlockTexture = {
//   texture?: string;
//   upDown?: string;
//   all?: string;
//   up?: string;
//   down?: string;
//   north?: string;
//   south?: string;
//   east?: string;
//   west?: string;
//   sides?: string;
//   weight?: number;
// };

// export type HasBlockTexture<Mask extends string = ""> = Item.HasIcon &
//   Item.HasColor & {
//     model?: string;
//     baseModel?: string;
//     mask?: string;
//     baseMask?: AutoComplete<Mask>;
//     texture?: string;
//     textureOverride?: BlockTexture[];
//     baseTexture?: string;
//     textureOut?: string;
//   };

// export interface HasDrops {
//   gatherType?: string;
//   drops?: string | string[];
//   dropQuantity?: number;
//   dropQuality?: number;
// }

// export type Strata = "Stone" | "Basalt" | "Sandstone" | "Slate" | "Shale" | "Volcanic";

// export interface HasStrata {
//   strata: Strata;
// }

// export interface HasBlock {
//   // playerAnimationsId: "block"; TODO: should be handled in fragments
//   particleColor?: string;
//   blockSoundSetId?: string;
//   particleSetId?: string;
//   transitionTexture?: string;
//   transitionToGroups?: string[];
//   set?: string;
//   group?: string;
// }
