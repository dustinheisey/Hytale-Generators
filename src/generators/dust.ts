import { syncLang, syncTexture } from "@sync";
import { u } from "@text";

export function generateDust(element: ElementConfig) {
  const description = element?.dust?.description || element.description || null;

  syncLang({
    name: {
      key: `items.Dust_${u(element.id)}.name`,
      value: `${element?.dust?.name || element.name || u(element.id)} Dust`,
    },
    ...(description && {
      description: {
        key: `items.Dust_${u(element.id)}.description`,
        value: description,
      },
    }),
  });

  syncTexture({
    color: element?.dust?.color || element.color,
    inputFile: "src/textures/dust-mask.png",
    outputFile: `dist/Common/Resources/Dusts/${u(element.id)}.png`,
  });
}
