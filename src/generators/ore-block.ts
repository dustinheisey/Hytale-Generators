import { syncLang } from "@sync";
import { u } from "@text";

export function generateOreBlock(type: Block, element: ElementConfig) {
  const description = element?.oreBlock?.description ||
    element?.ores?.description ||
    element.description || null;

  syncLang({
    name: {
      key: `items.Ore_${u(element.id)}_${u(type)}.name`,
      value: `${
        element?.oreBlock?.name || element?.ores?.name || element.name ||
        u(element.id)
      } Ore - ${u(type)}`,
    },
    ...(description && {
      description: {
        key: `items.Ore_${u(element.id)}_${u(type)}.description`,
        value: description,
      },
    }),
  });
}
