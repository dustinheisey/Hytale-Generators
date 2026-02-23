import { global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "../item/item.types.js";

export type AlloyInput = { id: string; name: string };

export type AlloyData = Required<
  Pick<ItemData, CommonTypes | ItemTypes> & {
    PlayerAnimationsId: "Item";
  }
>;

export interface AlloyConfig {
  id: string;
  color: string;
  icon?: boolean;
  inputs: AlloyInput[];
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

export function alloy(config: AlloyConfig) {
  const { modId } = global();

  const {
    id,
    categories,
    model,
    texture,
    icon,
    maxStack,
    name,
    baseName,
    description,
    color,
    mask,
    textureOut,
    maskVariant
  } = config;

  syncJson<AlloyData>(
    `${global().outDir}/Server/Item/Items/Alloys/Ingredient_Bar_${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ingredient_Bar_${id}.name`,
        description: `server.items.${modId}.Ingredient_Bar_${id}.description`
      },
      categories: categories ?? ["Items", `${modId}.Alloys`],
      model: `Resources/Materials/${model ?? "Ingot"}.blockymodel`,
      texture: `Resources/Alloys/${texture ?? id}.png`,
      ...(icon ? { icon: `Icons/ItemsGenerated/Ingredient_Bar_${id}.png` } : {}),
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
      maxStack: maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

  // furnace(
  //   `Ingredient_Bar_${id}`,
  //   inputs.map(input => input.id),
  //   `2x Alloy${id}`,
  //   20,
  //   2
  // );

  syncLang([
    {
      key: `items.${modId}.Ingredient_Bar_${id}.name`,
      value: name ?? `${baseName ?? id} Ingot`
    },
    ...(description
      ? [
          {
            key: `items.${modId}.Ingredient_Bar_${id}.description`,
            value: description
          }
        ]
      : [])
    // {
    //   key: `items.${modId}.Ingredient_Bar_${id}.description`,
    //   value: description ?? `Alloy of ${join(inputs.map(input => input.name))}`
    // }
  ]);

  syncTexture({
    color: color,
    inputFile: mask ?? `ingot/ingot-mask-${maskVariant ?? "base"}`,
    outputFile: textureOut ?? `Resources/Alloys/${id}`
  });
}

export function alloys(icon: boolean, configs: AlloyConfig[]) {
  configs.forEach(config => {
    alloy({ ...config, icon });
  });
}
