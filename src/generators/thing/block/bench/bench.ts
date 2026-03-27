import { builder, thing } from "@";
import type { BenchCfg } from "./bench.types";

export const bench = builder({
  build: (cfg: BenchCfg, g) => thing(cfg, g),
  defaults: { group: "Bench", categories: ["Furniture.Benches"] }
});
