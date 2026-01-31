import { dust, ingot, ore, oreBlock } from "@data";
import { syncJson, syncTexture } from "@sync";
import { u } from "@text";

import { elements } from "../../configs/elements.ts";

export function generateElements(elements: ElementConfig[]) {
  elements.forEach((element) => {
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Stone`,
      oreBlock({ ...element, ...element?.oreBlock, type: "stone" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Basalt`,
      oreBlock({ ...element, ...element?.oreBlock, type: "basalt" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Sandstone`,
      oreBlock({ ...element, ...element?.oreBlock, type: "sandstone" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Shale`,
      oreBlock({ ...element, ...element?.oreBlock, type: "shale" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Slate`,
      oreBlock({ ...element, ...element?.oreBlock, type: "slate" }),
    );
    syncJson(
      `Ore_Blocks/Ore_${u(element.id)}_Volcanic`,
      oreBlock({ ...element, ...element?.oreBlock, type: "volcanic" }),
    );

    syncJson(
      `Ores/Ore_${u(element.id)}`,
      ore({ ...element, ...element?.ore }),
    );

    syncJson(
      `Dusts/Dust_${u(element.id)}`,
      dust({ ...element, ...element?.dust }),
    );

    syncJson(
      `Ingots/Ingot_${u(element.id)}`,
      ingot({ ...element, ...element?.ingot }),
    );

    syncTexture({
      inputFile: `src/textures/ore-mask.png`,
      color: element?.ores?.color || element.color,
      outputFile: `dist/Common/Resources/Ores/Ore_Textures/${
        u(element.id)
      }.png`,
    });

    syncTexture({
      inputFile: `src/textures/dust-mask.png`,
      color: element?.dust?.color || element.color,
      outputFile: `dist/Common/Resources/Materials/Dust_Textures/${
        u(element.id)
      }.png`,
    });

    syncTexture({
      inputFile: `src/textures/ingot-mask.png`,
      color: element?.ingot?.color || element.color,
      outputFile: `dist/Common/Resources/Materials/Ingot_Textures/${
        u(element.id)
      }.png`,
    });
  });
}

generateElements(elements);

