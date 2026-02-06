export interface TranslationProperties {
  Name: string;
  Description?: string;
}

export type Tab =
  | "Items"
  | "Blocks.Ores"
  | "Unified_Materials.Gems"
  | "Unified_Materials.Ores"
  | "Unified_Materials.Dusts"
  | "Unified_Materials.Ingots"
  | "Unified_Materials.Alloys";

export interface Tags {
  Type: string[];
  Family?: string[];
}

export interface IconProperties {
  Scale: number;
  Translation: number[];
  Rotation: number[];
}

export interface ItemEntity {
  ParticleSystemId: null;
}

export interface ThingConfig {
  Id: string;
  Name?: string;
  Description?: string;
  Color?: string;
  Categories?: Tab[];
  Model?: string;
  Texture?: string;
  MaxStack?: number;
}

export interface ThingData {
  TranslationProperties: TranslationProperties;
  Categories: Tab[];
  Tags: Tags;
  MaxStack: number;
}

export interface ResourceType {
  Id: string;
}

export interface BlockType {
  Material: string;
  DrawType: string;
  CustomModel: string;
  CustomModelTexture: CustomModelTexture[];
  Group: string;
  Flags: Record<PropertyKey, never>;
  RandomRotation: string;
  Gathering: Gathering;
  BlockParticleSetId: string;
  ParticleColor: string;
  BlockSoundSetId: string;
}

export interface CustomModelTexture {
  Texture: string;
  Weight: number;
}

export interface Gathering {
  Breaking: Breaking;
}

export interface Breaking {
  GatherType: string;
  DropList?: DropList;
}

export interface DropList {
  Container: DropListContainer;
}

export interface DropListContainer {
  Type: string;
  Containers: ContainerElement[];
}

export interface ContainerElement {
  Type: string;
  Item: Item;
}

export interface Item {
  ItemId: string;
}

export interface Texture {
  Weight: number;
  All?: string;
  Sides?: string;
  UpDown?: string;
}

export type { JsonConfig } from "./util/syncJson.ts";
export type { LangConfig } from "./util/syncLang.ts";
export type { TextureConfig } from "./util/syncTexture.ts";
