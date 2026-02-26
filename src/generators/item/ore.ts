import { global, resourceType, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemBlockTypes, ItemData, MaskVariant } from "../item/item/item.types.js";

export type OreData = Required<Pick<ItemData, CommonTypes | ItemBlockTypes> & { PlayerAnimationsId: "Block" }>;

export interface OreConfig {
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
  level?: number;
  maxStack?: number;
}

export function ore(config: OreConfig) {
  const { modId, outDir } = global();
  const {
    id,
    categories,
    model,
    texture,
    level,
    icon,
    color,
    maskVariant,
    maxStack,
    description,
    baseName,
    name,
    mask,
    textureOut
  } = config;

  syncJson<OreData>(
    `${outDir}/Server/Item/Items/Ore/${id}/Ore_${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ore_${id}.name`,
        description: `server.items.${modId}.Ore_${id}.description`
      },
      categories: categories ?? ["Blocks.Ores", `${modId}.Ores`],
      model: `Resources/Ores/${model ?? "Ore_Large"}.blockymodel`,
      texture: `Resources/Ores/${texture ?? id}.png`,
      ...(icon ? { icon: `Icons/ItemsGenerated/Ore_${id}.png` } : {}),
      itemLevel: level ?? 10,
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
      maxStack: maxStack ?? 100,
      itemSoundSetId: "ISS_Blocks_Stone",
      dropOnDeath: true
    })
  );

  // salvage(`Ore_${id}`, `$Salvage_${id}`, `Ore_${id}`, 4);

  syncLang([
    {
      key: `items.${modId}.Ore_${id}.name`,
      value: name ?? `${baseName ?? id} Ore`
    },
    // {
    //   key: `items.${modId}.Ore_${id}.description`,
    //   value:
    //     description ??
    //     `Can be processed into an <b>${id} Ingot</b> at a <b>Furnace</b>, or ground into <b>${id} Dust</b> at a <b>Salvager's Workbench</b>`
    // },
    ...(description
      ? [
          {
            key: `items.${modId}.Ore_${id}.description`,
            value: description
          }
        ]
      : [])
  ]);

  syncTexture({
    color: color,
    inputFile: mask ?? `ore/ore-mask-${maskVariant ?? "base"}`,
    outputFile: textureOut ?? `Resources/Ores/${id}`
  });

  resourceType(`Salvage_${id}`, "Rock");
}

export function ores(icon: boolean, configs: OreConfig[]) {
  configs.forEach(config => {
    ore({ ...config, icon });
  });
}
