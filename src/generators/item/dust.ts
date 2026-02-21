import { global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemData, ItemTypes, MaskVariant } from "../item/item.types.js";

export type DustData = Required<Pick<ItemData, CommonTypes | ItemTypes> & { PlayerAnimationsId: "Item" }>;

export interface DustConfig {
  id: string;
  color: string;
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
  const modId = global().modId;

  syncJson<DustData>(
    `${global().outDir}/Server/Item/Items/Dusts/Dust${config.id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Dust${config.id}.name`,
        description: `server.items.${modId}.Dust${config.id}.description`
      },
      categories: config.categories ?? ["Items"],
      model: `Resources/${config.model ?? "Dust"}.blockymodel`,
      texture: `Resources/Dusts/${config.texture ?? config.id}.png`,
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
      maxStack: config.maxStack ?? 100,
      itemSoundSetId: "ISS_Items_Ingots",
      dropOnDeath: true
    })
  );

  syncLang([
    {
      key: `items.${modId}.Dust${config.id}.name`,
      value: config.name ?? `${config.baseName ?? config.id} Dust`
    },
    {
      key: `items.${modId}.Dust${config.id}.description`,
      value: config.description ?? `Can be processed into an <b>${config.id} Ingot</b> at a <b>Furnace</b>`
    }
  ]);

  syncTexture({
    color: config.color,
    inputFile: config.mask ?? `dust/dust-mask-${config.maskVariant ?? "base"}`,
    outputFile: config.textureOut ?? `Resources/Dusts/${config.id}`
  });
}

export function dusts(configs: DustConfig[]) {
  configs.forEach(config => dust(config));
}
