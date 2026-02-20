import { furnace, global, join, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "../item/item.types.js";

type AlloyInput = { id: string; name: string };

export type AlloyData = Required<
  Pick<ItemData, CommonTypes | ItemTypes> & {
    PlayerAnimationsId: "Item";
  }
>;

export interface AlloyOptions {
  baseName?: string;
  name?: string;
  description?: string;
  categories?: Tab[];
  mask?: string;
  maskVariant?: MaskVariant;
  model?: string;
  texture?: string;
  textureOut?: string;
  maxStack?: number;
}

export function alloy(id: string, color: string, inputs: AlloyInput[], options?: AlloyOptions) {
  const modId = global().modId;

  syncJson<AlloyData>(
    `Server/Item/Items/Alloys/Alloy${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Alloy${id}.name`,
        description: `server.items.${modId}.Alloy${id}.description`
      },
      categories: options?.categories ?? ["Items"],
      model: `Resources/Materials/${options?.model ?? "Ingot"}.blockymodel`,
      texture: `Resources/Alloys/${options?.texture ?? id}.png`,
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
        type: ["Ingredient"]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      maxStack: options?.maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

  furnace(
    `Alloy${id}FromIngots`,
    inputs.map(input => input.id),
    `2x Alloy${id}`,
    20,
    2
  );

  syncLang([
    {
      key: `items.${modId}.Alloy${id}.name`,
      value: options?.name ?? `${options?.baseName ?? id} Ingot`
    },
    {
      key: `items.${modId}.Alloy${id}.description`,
      value: options?.description ?? `Alloy of ${join(inputs.map(input => input.name))}`
    }
  ]);

  syncTexture({
    color: color,
    inputFile: options?.mask ?? `assets/ingot/ingot-mask-${options?.maskVariant ?? "base"}.png`,
    outputFile: options?.textureOut ?? `dist/Common/Resources/Alloys/${id}.png`
  });
}
