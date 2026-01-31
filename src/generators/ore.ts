import { syncLang, syncTexture } from "@sync";
import { u } from "@text";

export function generateOre(element: ElementConfig) {
  const description = element?.ore?.description || element?.ores?.description ||
    element.description || null;

  syncLang({
    name: {
      key: `items.Ore_${u(element.id)}.name`,
      value: `${
        element?.ore?.name || element?.ores?.name || element.name ||
        u(element.id)
      } Ore`,
    },
    ...(description && {
      description: {
        key: `items.Ore_${u(element.id)}.description`,
        value: description,
      },
    }),
  });

  syncTexture({
    color: element?.ore?.color || element?.ores?.color || element.color,
    inputFile: "src/textures/ore-mask.png",
    outputFile: `dist/Common/Resources/Ores/${u(element.id)}.png`,
  });
}
