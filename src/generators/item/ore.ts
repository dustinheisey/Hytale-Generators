import { global, resourceType, salvage, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemBlockTypes, ItemData, MaskVariant } from "../item/item.types.js";

export type OreData = Required<Pick<ItemData, CommonTypes | ItemBlockTypes> & { PlayerAnimationsId: "Block" }>;

export interface OreConfig {
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
  level?: number;
  maxStack?: number;
}

export function ore(config: OreConfig) {
  const modId = global().modId;

  syncJson<OreData>(
    `Server/Item/Items/Ores/Ore${config.id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ore${config.id}.name`,
        description: `server.items.${modId}.Ore${config.id}.description`
      },
      categories: config.categories ?? ["Blocks.Ores"],
      model: `Resources/Ores/${config.model ?? "Ore_Large"}.blockymodel`,
      texture: `Resources/Ores/${config.texture ?? config.id}.png`,
      itemLevel: config.level ?? 10,
      playerAnimationsId: "Block" as const,
      iconProperties: {
        scale: 0.58823,
        rotation: [22.5, 45, 22.5],
        translation: [0, -13.5]
      },
      tags: {
        type: ["Ore"]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      maxStack: config.maxStack ?? 100,
      itemSoundSetId: "ISS_Blocks_Stone",
      dropOnDeath: true
    })
  );

  salvage(`Ore${config.id}FromSalvage`, `$Salvage${config.id}`, `Ore${config.id}`, 4);

  syncLang([
    {
      key: `items.${modId}.Ore${config.id}.name`,
      value: config.name ?? `${config.baseName ?? config.id} Ore`
    },
    {
      key: `items.${modId}.Ore${config.id}.description`,
      value:
        config.description ??
        `Can be processed into an <b>${config.id} Ingot</b> at a <b>Furnace</b>, or ground into <b>${config.id} Dust</b> at a <b>Salvager's Workbench</b>`
    }
  ]);

  syncTexture({
    color: config.color,
    inputFile: config.mask ?? `assets/ore/ore-mask-${config.maskVariant ?? "base"}.png`,
    outputFile: config.textureOut ?? `dist/Common/Resources/Ores/${config.id}.png`
  });

  resourceType(`Salvage${config.id}`, "Rock");
}

export function ores(configs: OreConfig[]) {
  configs.forEach(config => ore(config));
}
