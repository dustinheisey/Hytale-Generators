import { syncLang, syncTexture } from "@sync";
import { u } from "@text";
import { generateRecipe } from "@generators";

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

  generateRecipe({
    id: `Furnace/Furnace_${u(element.id)}_Dust`,
    bench: "Furnace",
    inputs: [
      {
        ItemId: `Dust_${u(element.id)}`,
        Quantity: 1,
      },
    ],
    outputs: [
      {
        ItemId: `Ingot_${u(element.id)}`,
        Quantity: 1,
      },
    ],
    processingTime: element?.ingot?.processingTime || element.processingTime ||
      15,
  });
}
