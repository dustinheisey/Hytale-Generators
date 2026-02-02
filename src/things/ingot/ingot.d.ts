declare interface IngotConfig extends ThingConfig {
  outputQuantity?: number;
  processingTime?: number;
  variant?: "lightest" | "light" | "medium" | "dark"
}

declare interface IngotData extends ThingData {
  Recipe: RecipeData;
  Model: string;
  Texture: string;
  ResourceTypes: ResourceType[];
  PlayerAnimationsId: string;
  IconProperties: IconProperties;
  ItemEntity: ItemEntity;
  ItemSoundSetId: string;
  DropOnDeath: boolean;
}
