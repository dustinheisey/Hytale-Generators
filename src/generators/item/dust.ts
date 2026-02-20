import { global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "../item/item.types.js";

export type DustData = Required<Pick<ItemData, CommonTypes | ItemTypes> & { PlayerAnimationsId: "Item" }>;

export interface DustOptions {
  name?: string;
  baseName?: string;
  description?: string;
  categories?: Tab[];
  model?: string;
  mask?: string;
  maskVariant?: MaskVariant;
  texture?: string;
  textureOut?: string;
  maxStack?: number;
}

export function dust(id: string, color: string, options?: DustOptions) {
  const modId = global().modId;

  syncJson<DustData>(
    `Server/Item/Items/Dusts/Dust${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Dust${id}.name`,
        description: `server.items.${modId}.Dust${id}.description`
      },
      categories: options?.categories ?? ["Items"],
      model: `Resources/${options?.model ?? "Dust"}.blockymodel`,
      texture: `Resources/Dusts/${options?.texture ?? id}.png`,
      resourceTypes: [
        {
          id: "Dusts"
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
        family: ["Dusts"]
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
      key: `items.${modId}.Dust${id}.name`,
      value: options?.name ?? `${options?.baseName ?? id} Dust`
    },
    {
      key: `items.${modId}.Dust${id}.description`,
      value: options?.description ?? `Can be processed into an <b>${id} Ingot</b> at a <b>Furnace</b>`
    }
  ]);

  syncTexture({
    color: color,
    inputFile: options?.mask ?? `assets/dust/dust-mask-${options?.maskVariant ?? "base"}.png`,
    outputFile: options?.textureOut ?? `dist/Common/Resources/Dusts/${id}.png`
  });
}
