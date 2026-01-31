import { syncLang, syncTexture } from "@sync";
import { u } from "@text";

export function generateGem(element: ElementConfig) {
  const description = element?.gem?.description || element.description || null;

  syncLang({
    name: {
      key: `items.Gem_${u(element.id)}.name`,
      value: `${element?.gem?.name || element.name || u(element.id)}`,
    },
    ...(description && {
      description: {
        key: `items.Gem_${u(element.id)}.description`,
        value: description,
      },
    }),
  });

  syncTexture({
    color: element?.gem?.color || element.color,
    inputFile: "src/textures/gem-mask.png",
    outputFile: `dist/Common/Resources/Gems/${u(element.id)}.png`,
  });
}
