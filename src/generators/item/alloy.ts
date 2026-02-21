import { furnace, global, join, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
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

  syncJson<AlloyData>(
    `${global().outDir}/Server/Item/Items/Alloys/Ingredient_Bar_${config.id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ingredient_Bar_${config.id}.name`,
        description: `server.items.${modId}.Ingredient_Bar_${config.id}.description`
      },
      categories: config?.categories ?? ["Items", `${modId}.Alloys`],
      model: `Resources/Materials/${config?.model ?? "Ingot"}.blockymodel`,
      texture: `Resources/Alloys/${config?.texture ?? config.id}.png`,
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
        type: ["Ingredient"]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      maxStack: config?.maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

  furnace(
    `Ingredient_Bar_${config.id}`,
    config.inputs.map(input => input.id),
    `2x Alloy${config.id}`,
    20,
    2
  );

  syncLang([
    {
      key: `items.${modId}.Ingredient_Bar_${config.id}.name`,
      value: config?.name ?? `${config?.baseName ?? config.id} Ingot`
    },
    {
      key: `items.${modId}.Ingredient_Bar_${config.id}.description`,
      value: config?.description ?? `Alloy of ${join(config.inputs.map(input => input.name))}`
    }
  ]);

  syncTexture({
    color: config.color,
    inputFile: config?.mask ?? `ingot/ingot-mask-${config?.maskVariant ?? "base"}`,
    outputFile: config?.textureOut ?? `Resources/Alloys/${config.id}`
  });
}

export function alloys(icon: boolean, configs: AlloyConfig[]) {
  configs.forEach(config => alloy({ ...config, icon }));
}
