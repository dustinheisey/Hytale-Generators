import { type BlockCfg } from "@";

export type Strata = "Stone" | "Basalt" | "Sandstone" | "Slate" | "Shale" | "Volcanic";

export interface HasStrata {
  strata: Strata;
}

export type OreBlockCfg = BlockCfg & HasStrata;