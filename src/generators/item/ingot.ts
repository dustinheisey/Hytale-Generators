import { furnace, global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "../item/item.types.js";

export type IngotData = Required<
  Pick<ItemData, CommonTypes | ItemTypes> & {
    PlayerAnimationsId: "Item";
  }
>;

export interface IngotOptions {
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

export function ingot(id: string, color: string, options?: IngotOptions) {
  const modId = global().modId;
  syncJson<IngotData>(
    `Server/Item/Items/Ingots/Ingot${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ingot${id}.name`,
        description: `server.items.${modId}.Ingot${id}.description`
      },
      categories: options?.categories ?? ["Items"],
      model: `Resources/Materials/${options?.model ?? "Ingot"}.blockymodel`,
      texture: `Resources/Ingots/${options?.texture ?? id}.png`,
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
      maxStack: options?.maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

  syncLang([
    {
      key: `items.${global().modId}.Ingot${id}.name`,
      value: options?.name ?? `${options?.baseName ?? id} Ingot`
    },
    ...(options?.description
      ? [
          {
            key: `items.${modId}.Ingot${id}.description`,
            value: options.description
          }
        ]
      : [])
  ]);

  syncTexture({
    color: color,
    inputFile: options?.mask ?? `assets/ingot/ingot-mask-${options?.maskVariant ?? "base"}.png`,
    outputFile: options?.textureOut ?? `dist/Common/Resources/Ingots/${id}.png`
  });

  furnace(`${id}IngotFromOre`, `Ore${id}`, `Ingot${id}`, options?.time ?? 14);

  furnace(`${id}IngotFromDust`, `Dust${id}`, `Ingot${id}`, options?.time ?? 14);
}
