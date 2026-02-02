// - include/exclude
// - lang overrides
// - color overrides
// - recipe overrides
// - gem color overrides
// - item level overrides
// - hardness & tier

declare interface ThingData {
  TranslationProperties: TranslationProperties;
  Categories: Tab[];
  Tags: Tags;
  MaxStack: number;
}

declare interface ThingConfig {
  id: string;
  name?: string;
  description?: string;
  color?: string;
  categories?: Tab[];
  model?: string;
  texture?: string;
  maxStack?: number;
  inputs?: Input[];
}

declare type Kind =
  | "ingot"
  | "alloy"
  | "dust"
  | "gem"
  | "ore"
  | "ore_stone"
  | "ore_basalt"
  | "ore_sandstone"
  | "ore_slate"
  | "ore_shale"
  | "ore_volcanic";

declare type Block =
  | "stone"
  | "basalt"
  | "sandstone"
  | "slate"
  | "shale"
  | "volcanic";

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
