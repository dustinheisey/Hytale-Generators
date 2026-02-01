import { generateOreBlock } from "../ore-block/ore-block.ts";
import { generateOre } from "../ore/ore.ts";
import { generateDust } from "../dust/dust.ts";
import { generateIngot } from "../ingot/ingot.ts";

export function generateElement(config: ThingsConfig) {
  const { dust, ingot, ores, ore, oreBlock } = config;

  generateDust({ ...config, ...dust });
  generateIngot({ ...config, ...ingot });
  generateOre({ ...config, ...ores, ...ore });
  generateOreBlock({ ...config, ...ores, ...oreBlock, type: "stone" });
  generateOreBlock({ ...config, ...ores, ...oreBlock, type: "basalt" });
  generateOreBlock({ ...config, ...ores, ...oreBlock, type: "sandstone" });
  generateOreBlock({ ...config, ...ores, ...oreBlock, type: "shale" });
  generateOreBlock({ ...config, ...ores, ...oreBlock, type: "slate" });
  generateOreBlock({ ...config, ...ores, ...oreBlock, type: "volcanic" });
}
