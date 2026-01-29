import { elements } from "./configs.ts";
import gem from "./generators/gem.ts";
import ingot from "./generators/ingot.ts";
import oreBlock from "./generators/ore-block.ts";
import ore from "./generators/ore.ts";
import { generateTintedTextureFromMask } from "./textures.ts";
import { uppercase } from "@util";

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

  ["ore", "gem", "ingot"].forEach((item) =>
    generateTintedTextureFromMask({
      texturePath: `src/textures/${item}-mask.png`,
      color,
      outPath: `dist/textures/${item}s/${uppercase(id)}.png`,
    }).then(() => {
      console.log("Tinted texture generated successfully.");
    }).catch((err) => {
      console.error(err);
    })
  );
});
