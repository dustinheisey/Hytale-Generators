import { furnace, global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "./item.types.js";

export type IngotData = Required<
  Pick<ItemData, CommonTypes | ItemTypes> & {
    PlayerAnimationsId: "Item";
  }
>;

export interface IngotConfig {
  id: string;
  color: string;
  icon?: boolean;
  name?: string;
  baseName?: string;
  description?: string;
  time?: number;
  categories?: Tab[];
  model?: string;
  mask?: string;
  maskVariant?: MaskVariant;
  texture?: string;
  textureOut?: string;
  level?: number;
  maxStack?: number;
}

export function ingot(config: IngotConfig) {
  const { modId } = global();
  syncJson<IngotData>(
    `${global().outDir}/Server/Item/Items/Bars/Ingredient_Bar_${config.id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ingredient_Bar_${config.id}.name`,
        description: `server.items.${modId}.Ingredient_Bar_${config.id}.description`
      },
      categories: config.categories ?? ["Items", `${modId}.Ingots`],
      model: `Resources/Materials/${config.model ?? "Ingot"}.blockymodel`,
      texture: `Resources/Ingots/${config.texture ?? config.id}.png`,
      ...(config.icon ? { icon: `Icons/ItemsGenerated/Ingredient_Bar_${config.id}.png` } : {}),
      resourceTypes: [
        {
          id: "Metal_Bars"
        }
      ],
      playerAnimationsId: "Item" as const,
      iconProperties: {
        scale: 1,
        translation: [0, -3],
        rotation: [22.5, 45, 22.5]
      },
      tags: {
        type: ["Ingredient"],
        family: ["Metal_Bars"]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      maxStack: config.maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

  syncLang([
    {
      key: `items.${global().modId}.Ingredient_Bar_${config.id}.name`,
      value: config.name ?? `${config.baseName ?? config.id} Ingot`
    },
    ...(config.description
      ? [
          {
            key: `items.${modId}.Ingredient_Bar_${config.id}.description`,
            value: config.description
          }
        ]
      : [])
  ]);

  syncTexture({
    color: config.color,
    inputFile: config.mask ?? `ingot/ingot-mask-${config.maskVariant ?? "base"}`,
    outputFile: config.textureOut ?? `Resources/Ingots/${config.id}`
  });

  furnace(`Ingredient_Bar_${config.id}_From_Ore`, `Ore_${config.id}`, `Ingredient_Bar_${config.id}`, config.time ?? 14);

  furnace(
    `Ingredient_Bar_${config.id}_From_Dust`,
    `Ingredient_Dust_${config.id}`,
    `Ingredient_Bar_${config.id}`,
    config.time ?? 14
  );
}

export function ingots(icon: boolean, configs: IngotConfig[]) {
  configs.forEach(config => ingot({ ...config, icon }));
}
