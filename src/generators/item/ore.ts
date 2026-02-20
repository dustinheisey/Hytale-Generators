import { global, resourceType, salvage, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { CommonTypes, ItemBlockTypes, ItemData, MaskVariant } from "../item/item.types.js";

export type OreData = Required<Pick<ItemData, CommonTypes | ItemBlockTypes> & { PlayerAnimationsId: "Block" }>;

export interface OreOptions {
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

export function ore(id: string, color: string, options?: OreOptions) {
  const modId = global().modId;

  syncJson<OreData>(
    `Server/Item/Items/Ores/Ore${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ore${id}.name`,
        description: `server.items.${modId}.Ore${id}.description`
      },
      categories: options?.categories ?? ["Blocks.Ores"],
      model: `Resources/Ores/${options?.model ?? "Ore_Large"}.blockymodel`,
      texture: `Resources/Ores/${options?.texture ?? id}.png`,
      itemLevel: options?.level ?? 10,
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
      maxStack: options?.maxStack ?? 100,
      itemSoundSetId: "ISS_Blocks_Stone",
      dropOnDeath: true
    })
  );

  salvage(`Ore${id}FromSalvage`, `$Salvage${id}`, `Ore${id}`, 4);

  syncLang([
    {
      key: `items.${modId}.Ore${id}.name`,
      value: options?.name ?? `${options?.baseName ?? id} Ore`
    },
    {
      key: `items.${modId}.Ore${id}.description`,
      value:
        options?.description ??
        `Can be processed into an <b>${id} Ingot</b> at a <b>Furnace</b>, or ground into <b>${id} Dust</b> at a <b>Salvager's Workbench</b>`
    }
  ]);

  syncTexture({
    color: color,
    inputFile: options?.mask ?? `assets/ore/ore-mask-${options?.maskVariant ?? "base"}.png`,
    outputFile: options?.textureOut ?? `dist/Common/Resources/Ores/${id}.png`
  });

  resourceType(`Salvage${id}`, "Rock");
}
