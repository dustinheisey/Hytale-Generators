import { builder, thing } from "@";
import type { OreBlockCfg } from "./ore-block.types";

export const oreBlock = builder({
  build: (cfg: OreBlockCfg, g) => thing(cfg, g, []),
  defaults: { group: "Ore", categories: ["Blocks.Ores"] }
});
