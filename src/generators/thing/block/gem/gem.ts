import { builder, thing } from "@";
import type { GemCfg } from "./gem.types";

export const gem = builder({
  build: (cfg: GemCfg, g) => thing(cfg, g),
  defaults: { group: "Gem", categories: ["Blocks.Ores"] }
});
