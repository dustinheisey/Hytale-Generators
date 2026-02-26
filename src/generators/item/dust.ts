import { global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "../item/item/item.types.js";

export type DustData = Required<Pick<ItemData, CommonTypes | ItemTypes> & { PlayerAnimationsId: "Item" }>;

export interface DustConfig {
  id: string;
  color: string;
  icon?: boolean;
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

export function dust(config: DustConfig) {
  const { modId, outDir } = global();
  const {
    id,
    categories,
    model,
    texture,
    icon,
    name,
    baseName,
    description,
    mask,
    maskVariant,
    maxStack,
    color,
    textureOut
  } = config;

  syncJson<DustData>(
    `${outDir}/Server/Item/Items/Dusts/Ingredient_Dust_${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ingredient_Dust_${id}.name`,
        description: `server.items.${modId}.Ingredient_Dust_${id}.description`
      },
      categories: categories ?? ["Items", `${modId}.Dusts`],
      model: `Resources/${model ?? "Dust"}.blockymodel`,
      texture: `Resources/Dusts/${texture ?? id}.png`,
      ...(icon ? { icon: `Icons/ItemsGenerated/Ingredient_Dust_${id}.png` } : {}),
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
      maxStack: maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

  // salvage(`Ingredient_Dust_${id}`, `Ore_${id}`, `2x Ingredient_Dust_${id}`, 4);

  syncLang([
    {
      key: `items.${modId}.Ingredient_Dust_${id}.name`,
      value: name ?? `${baseName ?? id} Dust`
    },
    ...(description
      ? [
          {
            key: `items.${modId}.Ingredient_Dust_${id}.description`,
            value: description
          }
        ]
      : [])
    // {
    //   key: `items.${modId}.Ingredient_Dust_${id}.description`,
    //   value: description ?? `Can be processed into an <b>${id} Ingot</b> at a <b>Furnace</b>`
    // }
  ]);

  syncTexture({
    color: color,
    inputFile: mask ?? `dust/dust-mask-${maskVariant ?? "base"}`,
    outputFile: textureOut ?? `Resources/Dusts/${id}`
  });
}

export function dusts(icon: boolean, configs: DustConfig[]) {
  configs.forEach(config => {
    dust({ ...config, icon });
  });
}
