import { syncLang, syncTexture } from "@sync";
import { u } from "@text";

export function generateIngot(element: ElementConfig) {
  const description = element?.ingot?.description || element.description ||
    null;

  syncLang({
    name: {
      key: `items.Ingot_${u(element.id)}.name`,
      value: `${element?.ingot?.name || element.name || u(element.id)} Ingot`,
    },
    ...(description && {
      description: {
        key: `items.Ingot_${u(element.id)}.description`,
        value: description,
      },
    }),
  });

    syncTexture({
    color: element?.ingot?.color || element.color,
    inputFile: "src/textures/ingot-mask.png",
    outputFile: `dist/Common/Resources/Ingots/${u(element.id)}.png`,
  });
}
