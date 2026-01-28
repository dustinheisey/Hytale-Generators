import { elements } from "@configs";
import { gem, ingot, ore, oreBlock } from "@generators";

elements.forEach((material) => {
  const config = typeof material === "string" ? {} : material;
  const id = typeof material === "string" ? material : material.id;

  ingot(id, config);
  // gem(id, config);
  ore(id, config);
  oreBlock(id, "stone", config);
  oreBlock(id, "basalt", config);
  oreBlock(id, "sandstone", config);
  oreBlock(id, "shale", config);
  oreBlock(id, "slate", config);
  oreBlock(id, "volcanic", config);
});
