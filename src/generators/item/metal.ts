import type { SetOptional } from "type-fest";
import type { BlockType, DustConfig, IngotConfig, OreBlockConfig, OreConfig } from "../../index.js";
import { dust, ingot, ore, oreBlock } from "../../index.js";

type Filter = Lowercase<BlockType> | "ore" | "dust" | "ingot";
export interface MetalConfig {
  include?: Filter[];
  exclude?: Filter[];
  id: string;
  color: string;
  ores?: SetOptional<OreConfig, "id" | "color">;
  ore?: SetOptional<OreConfig, "id" | "color">;
  oreBlock?: SetOptional<OreBlockConfig, "id" | "color">;
  dust?: SetOptional<DustConfig, "id" | "color">;
  ingot?: SetOptional<IngotConfig, "id" | "color">;
}

export function shouldInclude(type: Filter, include?: Filter[], exclude?: Filter[]): boolean {
  if (include?.length && exclude?.length)
    throw new Error(`oreBlock options cannot have both "include" and "exclude". Pick one.`);
  if (include?.length) return include?.includes(type);
  if (exclude?.length) return !exclude.includes(type);
  return true;
}
export function metal(config: MetalConfig) {
  const blockTypes = ["stone", "basalt", "sandstone", "slate", "shale", "volcanic"];

  blockTypes.forEach(type => {
    if (shouldInclude(type as Filter)) {
      oreBlock({ ...config, ...config?.ores, ...config?.oreBlock, type: type as Lowercase<BlockType> });
    }
  });

  if (shouldInclude("ore")) ore({ ...config, ...config?.ores, ...config?.ore });
  if (shouldInclude("dust")) dust({ ...config, ...config?.dust });
  if (shouldInclude("ingot")) ingot({ ...config, ...config?.ingot });
}

export function metals(groups: Record<string, MetalConfig[]>) {
  for (const configs of Object.values(groups)) configs.forEach(config => metal(config));
}
