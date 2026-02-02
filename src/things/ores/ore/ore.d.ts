declare interface OreConfig extends ThingConfig {
  processingTime?: number;
  outputQuantity?: number;
  itemLevel?: number;
}

declare interface OreData extends ThingData {
  Recipe: Partial<RecipeData>;
  Model: string;
  Texture: string;
  ItemLevel: number;
  PlayerAnimationsId: string;
  IconProperties: IconProperties;
  ItemEntity: ItemEntity;
  ItemSoundSetId: string;
  DropOnDeath: boolean;
}
