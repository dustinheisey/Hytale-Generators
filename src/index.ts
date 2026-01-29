import { elements } from "./configs.ts";
import gem from "./generators/gem.ts";
import ingot from "./generators/ingot.ts";
import oreBlock from "./generators/ore-block.ts";
import ore from "./generators/ore.ts";
import { generateTintedTextureFromMask, uppercase } from "@util";

elements.forEach((material) => {
  const config = typeof material === "string" ? {} : material;
  const id = typeof material === "string" ? material : material.id;
  const color = typeof material === "string"
    ? "#FFFFFF"
    : material?.config?.color || "#000012"; // Default to white if no color is provided

  ingot(id, config);
  // gem(id, config);
  ore(id, config);
  oreBlock(id, "stone", config);
  oreBlock(id, "basalt", config);
  oreBlock(id, "sandstone", config);
  oreBlock(id, "shale", config);
  oreBlock(id, "slate", config);
  oreBlock(id, "volcanic", config);

  generateTintedTextureFromMask({
    texturePath: `src/textures/ore-mask.png`,
    color,
    outPath: `dist/Common/Resources/Ores/Ore_Textures/${uppercase(id)}.png`,
  }).then(() => {
    console.log("Tinted texture generated successfully.");
  }).catch((err) => {
    console.error(err);
  });

  generateTintedTextureFromMask({
    texturePath: `src/textures/ingot-mask.png`,
    color,
    outPath: `dist/Common/Resources/Materials/Ingot_Textures/${
      uppercase(id)
    }.png`,
  }).then(() => {
    console.log("Tinted texture generated successfully.");
  }).catch((err) => {
    console.error(err);
  });
});
