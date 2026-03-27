import { type ThingCfg, type HasBlockType, type HasRenderDeployablePreview, type HasVariant } from "@";

export type BlockCfg = ThingCfg & HasBlockType & HasRenderDeployablePreview & HasVariant;

// export type HasItemBlock = 
//   HasPlayerAnimationsID<"Block"> &
//   HasNullItemEntity &
//   HasItemSoundSetId

// export type HasPlayerAnimationsID<T extends "Block" | "Item"> = { playerAnimationsId: T };
// export type HasNullItemEntity = { itemEntity: { particleSystemId: undefined } };


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