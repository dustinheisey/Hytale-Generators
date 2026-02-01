declare interface ThingsConfig extends ThingConfig {
  id: string;
  color: string;
  include?: Kind[];
  exclude?: Kind[];
  processingTime?: number;
  ores?: Omit<ThingConfig, "id">;
  oreBlock?: Omit<OreBlockConfig, "id">;
  ore?: Omit<OreConfig, "id">;
  gem?: Omit<GemConfig, "id">;
  dust?: Omit<DustConfig, "id">;
  ingot?: Omit<IngotConfig, "id">;
  alloy?: Omit<AlloyConfig, "id">;
}

declare interface ElementsConfig {
  reactiveNonmetals: ThingsConfig[];
  alkaliMetals: ThingsConfig[];
  alkalineEarthMetals: ThingsConfig[];
  transitionMetals: ThingsConfig[];
  postTransitionMetals: ThingsConfig[];
  metalloids: ThingsConfig[];
  lanthanides: ThingsConfig[];
  actinides: ThingsConfig[];
}

/*
- categories
- model
- texture
- max stack
- gem: color: particle, light, sparks, radius
- ? resource type
- ? tags: type, family
- ? item sound set id?
- ? item level
- ? type
- ? ore: particle color
*/
