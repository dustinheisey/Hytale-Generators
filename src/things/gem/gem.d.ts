declare interface GemConfig extends ThingConfig {
  color: string;
  variant?: "light" | "medium" | "dark";
  effectColor?: {
    interact?: string;
    light?: string;
    sparks?: string;
    radius?: number;
  };
}

declare interface GemData extends ThingData {
  PlayerAnimationsId: string;
  BlockType: BlockType & {
    Opacity: string;
    VariantRotation: string;
    AmbientSoundEventId: string;
    Light: Light;
    Particles: Particle[];
  };
  ItemSoundSetId: string;
}
