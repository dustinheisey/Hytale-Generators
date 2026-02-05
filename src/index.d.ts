declare type Tab =
  | "Items"
  | "Blocks.Ores"
  | "Unified_Materials.Gems"
  | "Unified_Materials.Ores"
  | "Unified_Materials.Dusts"
  | "Unified_Materials.Ingots"
  | "Unified_Materials.Alloys";

// - include/exclude
// - lang overrides
// - color overrides
// - recipe overrides
// - gem color overrides
// - item level overrides
// - hardness & tier

declare interface TranslationProperties {
  Name: string;
  Description?: string;
}

declare interface IconProperties {
  Scale: number;
  Translation: number[];
  Rotation: number[];
}

declare interface ResourceType {
  Id: string;
}

declare interface Tags {
  Type: string[];
  Family?: string[];
}

declare interface ItemEntity {
  ParticleSystemId: null;
}

declare interface BlockType {
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

declare interface CustomModelTexture {
  Texture: string;
  Weight: number;
}

declare interface Gathering {
  Breaking: Breaking;
}

declare interface Breaking {
  GatherType: string;
  DropList?: DropList;
}

declare interface DropList {
  Container: DropListContainer;
}

declare interface DropListContainer {
  Type: string;
  Containers: ContainerElement[];
}

declare interface ContainerElement {
  Type: string;
  Item: Item;
}

declare interface Item {
  ItemId: string;
}

declare interface Texture {
  Weight: number;
  All?: string;
  Sides?: string;
  UpDown?: string;
}

declare interface Light {
  Color: string;
  Radius: number;
}

declare interface Particle {
  Color: string;
  SystemId: string;
}

declare interface GlobalConfig {
  MaxStack: number;
  TimeSeconds: number;
}

declare interface ThingData {
  TranslationProperties: TranslationProperties;
  Categories: Tab[];
  Tags: Tags;
  MaxStack: number;
}

declare interface ThingConfig {
  Id: string;
  Name?: string;
  Description?: string;
  Color?: string;
  Categories?: Tab[];
  Model?: string;
  Texture?: string;
  MaxStack?: number;
}

declare interface ThingData {
  TranslationProperties: TranslationProperties;
  Categories: Tab[];
  Tags: Tags;
  MaxStack: number;
}
