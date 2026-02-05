import { alloy, dust, gem, ingot, ore, oreBlock } from "hytale-generators";
import type { Block, OreBlockConfig } from "./ore-block.ts";
import type { OreConfig } from "./ore.ts";
import type { GemConfig } from "./gem.ts";
import type { DustConfig } from "./dust.ts";
import type { IngotConfig } from "./ingot.ts";
import type { AlloyConfig } from "./alloy.ts";

declare type Kind =
  | "Ingot"
  | "Alloy"
  | "Dust"
  | "Gem"
  | "Ore"
  | "Ore_Stone"
  | "Ore_Basalt"
  | "Ore_Sandstone"
  | "Ore_Slate"
  | "Ore_Shale"
  | "Ore_Volcanic";

export interface ThingsConfig extends ThingConfig {
  Id: string;
  Color: string;
  Include?: Kind[];
  Exclude?: Kind[];
  TimeSeconds?: number;
  Ores?: Partial<ThingConfig>;
  OreBlock?: Partial<OreBlockConfig>;
  Ore?: Partial<OreConfig>;
  Gem?: Partial<GemConfig>;
  Dust?: Partial<DustConfig>;
  Ingot?: Partial<IngotConfig>;
  Alloy?: Partial<AlloyConfig>;
}

declare type ElementsConfig = Record<string, ThingsConfig[]>;

const include = (kind: Kind, config: ThingsConfig): boolean => {
  const { Include, Exclude } = config;

  if (Include && Include?.includes(kind)) return true;
  if (Exclude && !Exclude?.includes(kind)) return true;
  if (!Include && !Exclude) return true;
  return false;
};

export const element = (config: ThingsConfig) => {
  const blocks: Block[] = [
    "Basalt",
    "Sandstone",
    "Shale",
    "Slate",
    "Stone",
    "Volcanic",
  ];
  blocks.forEach((block) =>
    include(`Ore_${block}`, config) &&
    oreBlock({ ...config, ...config.Ores, ...config.OreBlock, Type: block })
  );
  include("Ore", config) && ore({ ...config, ...config.Ores, ...config.Ore });
  include("Dust", config) && dust({ ...config, ...config.Dust });

  include("Ingot", config) && ingot({ ...config, ...config.Ingot });
};

/** Generate all JSONs associated with each element */
export const elements = (configs: ElementsConfig) => {
  Object.values(configs).flat().forEach((config) => element(config));
};

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
