import { furnace, global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "../item/item.types.js";

export type IngotData = Required<
  Pick<ItemData, CommonTypes | ItemTypes> & {
    PlayerAnimationsId: "Item";
  }
>;

export interface IngotConfig {
  id: string;
  color: string;
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
  const modId = global().modId;
  syncJson<IngotData>(
    `Server/Item/Items/Ingots/Ingot${config.id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ingot${config.id}.name`,
        description: `server.items.${modId}.Ingot${config.id}.description`
      },
      categories: config.categories ?? ["Items"],
      model: `Resources/Materials/${config.model ?? "Ingot"}.blockymodel`,
      texture: `Resources/Ingots/${config.texture ?? config.id}.png`,
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
      key: `items.${global().modId}.Ingot${config.id}.name`,
      value: config.name ?? `${config.baseName ?? config.id} Ingot`
    },
    ...(config.description
      ? [
          {
            key: `items.${modId}.Ingot${config.id}.description`,
            value: config.description
          }
        ]
      : [])
  ]);

  syncTexture({
    color: config.color,
    inputFile: config.mask ?? `assets/ingot/ingot-mask-${config.maskVariant ?? "base"}.png`,
    outputFile: config.textureOut ?? `dist/Common/Resources/Ingots/${config.id}.png`
  });

  furnace(`${config.id}IngotFromOre`, `Ore${config.id}`, `Ingot${config.id}`, config.time ?? 14);

  furnace(`${config.id}IngotFromDust`, `Dust${config.id}`, `Ingot${config.id}`, config.time ?? 14);
}

export function ingots(configs: IngotConfig[]) {
  configs.forEach(config => ingot(config));
}
