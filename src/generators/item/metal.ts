import type { SetOptional } from "type-fest";
import type { BlockType, DustConfig, IngotConfig, OreBlockConfig, OreConfig } from "../../index.js";
import { dust, ingot, ore, oreBlock, syncLang, u } from "../../index.js";

export type Filter = Lowercase<BlockType> | "ore" | "dust" | "ingot" | "potion" | "gas_block" | "fluid" | "bucket";

export interface MetalConfig {
  include?: Filter[];
  exclude?: Filter[];
  id: string;
  color: string;
  icon?: boolean;
  ores?: SetOptional<OreConfig, "id" | "color">;
  ore?: SetOptional<OreConfig, "id" | "color">;
  oreBlock?: SetOptional<OreBlockConfig, "id" | "color">;
  dust?: SetOptional<DustConfig, "id" | "color">;
  ingot?: SetOptional<IngotConfig, "id" | "color">;
}

export const blockTypes = ["stone", "basalt", "sandstone", "slate", "shale", "volcanic"];

export function shouldInclude(type: Filter, include?: Filter[], exclude?: Filter[]): boolean {
  if (include?.length && exclude?.length)
    throw new Error(`oreBlock options cannot have both "include" and "exclude". Pick one.`);
  if (include?.length) return include.includes(type);
  if (exclude?.length) return !exclude.includes(type);
  return type !== "gas_block" && type !== "bucket" && type !== "fluid" && type !== "potion";
}
export function metal(config: MetalConfig) {
  blockTypes.forEach(type => {
    if (shouldInclude(type as Filter, config.include, config.exclude)) {
      oreBlock({ ...config, ...config.ores, ...config.oreBlock, type: type as Lowercase<BlockType> });
    }
  });

  if (shouldInclude("ore", config.include, config.exclude)) ore({ ...config, ...config.ores, ...config.ore });
  if (shouldInclude("dust", config.include, config.exclude)) dust({ ...config, ...config.dust });
  if (shouldInclude("ingot", config.include, config.exclude)) ingot({ ...config, ...config.ingot });
}

export function metals(icon: boolean, groups: Record<string, MetalConfig[]>) {
  for (const configs of Object.values(groups))
    configs.forEach(config => {
      metal({ ...config, icon });
    });
}

export function renameMetals(metals: { id: string; name: string; include?: Filter[]; exclude?: Filter[] }[]) {
  metals.forEach(metal => {
    blockTypes.forEach(type => {
      if (shouldInclude(type as Filter, metal.include, metal.exclude)) {
        syncLang([
          {
            key: `items.Ore_${metal.id}_${u(type)}_Override.name`,
            value: `${metal.name} Ore - ${u(type)}`
          }
        ]);
      }
    });

    if (shouldInclude("ore", metal.include, metal.exclude))
      syncLang([
        {
          key: `items.Ore_${metal.id}_Override.name`,
          value: `${metal.name} Ore`
        },
        {
          key: `items.Ore_${metal.id}_Override.description`,
          value: `Can be processed into an <b>${metal.id} Ingot</b> at a <b>Furnace</b>, or ground into <b>${metal.id} Dust</b> at a <b>Salvager's Workbench</b>`
        }
      ]);

    if (shouldInclude("ingot", metal.include, metal.exclude)) {
      syncLang([
        {
          key: `items.Ingredient_Bar_${metal.id}_Override.name`,
          value: `${metal.name} Ingot`
        }
      ]);
    }
  });
}
