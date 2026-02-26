import { global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "./item/item.types.js";

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

  syncJson<IngotData>(
    `${outDir}/Server/Item/Items/Bars/Ingredient_Bar_${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ingredient_Bar_${id}.name`,
        description: `server.items.${modId}.Ingredient_Bar_${id}.description`
      },
      categories: categories ?? ["Items", `${modId}.Ingots`],
      model: `Resources/Materials/${model ?? "Ingot"}.blockymodel`,
      texture: `Resources/Ingots/${texture ?? id}.png`,
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
        type: ["Ingredient"],
        family: ["Metal_Bars"]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      maxStack: maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

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
  ]);

  syncTexture({
    color: color,
    inputFile: mask ?? `ingot/ingot-mask-${maskVariant ?? "medium"}`,
    outputFile: textureOut ?? `Resources/Ingots/${id}`
  });

  // furnace(`Ingredient_Bar_${id}_From_Ore`, `Ore_${id}`, `Ingredient_Bar_${id}`, time ?? 14);

  // furnace(
  //   `Ingredient_Bar_${id}_From_Dust`,
  //   `Ingredient_Dust_${id}`,
  //   `Ingredient_Bar_${id}`,
  //   time ?? 14
  // );
}

export function ingots(icon: boolean, configs: IngotConfig[]) {
  configs.forEach(config => {
    ingot({ ...config, icon });
  });
}
