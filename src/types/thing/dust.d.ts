declare interface DustConfig extends ThingConfig {
  outputQuantity?: number;
  processingTime?: number;
}

declare interface DustData extends ThingData {
  Recipe: RecipeData;
  Model: string;
  Texture: string;
  ResourceTypes: ResourceType[];
  PlayerAnimationsId: string;
  IconProperties: IconProperties;
  ItemEntity: ItemEntity;
  DropOnDeath: boolean;
}
