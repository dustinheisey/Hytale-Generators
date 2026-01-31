declare interface OreBlockData extends ThingData {
  BlockType: BlockType & { Textures: Texture[] };
  PlayerAnimationsId: string;
  ItemSoundSetId: string;
}

declare interface OreBlockConfig extends ThingConfig {
  hardness?: number;
  tier?: number;
  itemLevel?: number;
  type: Block;
  // dropList?: []
}
