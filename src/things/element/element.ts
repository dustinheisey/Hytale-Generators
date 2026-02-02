import {
  generateDust,
  generateIngot,
  generateOre,
  generateOreBlock,
} from "@things";

/** Generate all JSONs associated with a single element */
export function generateElement(element: ThingsConfig) {
  const { dust, ingot, ores, ore, oreBlock } = element;

  generateDust({ ...element, ...dust });
  generateIngot({ ...element, ...ingot });
  generateOre({ ...element, ...ores, ...ore });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "stone" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "basalt" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "sandstone" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "shale" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "slate" });
  generateOreBlock({ ...element, ...ores, ...oreBlock, type: "volcanic" });
}

/** Generate all JSONs associated with each element */
export function generateElements(elements: ElementsConfig) {
  Object.values(elements).flat().forEach((element) => generateElement(element));
}
