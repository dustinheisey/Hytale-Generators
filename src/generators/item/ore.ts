import type { Builder, ItemBlockCfg } from "../../index.js";
import { builder, global, json, lang, resourceType, texture } from "../../index.js";

export type OreCfg = ItemBlockCfg;

export const ore: Builder<OreCfg> = builder((cfg: OreCfg) => {
  const { modId } = global();
  json(`Server/Item/Items/Ore/${cfg.id}/Ore_${cfg.id}`, {
    translationProperties: {
      name: `server.items.${global().modId}.Ore_${cfg.id}.name`,
      description: `server.items.${global().modId}.Ore_${cfg.id}.description`
    },
    categories: cfg.categories ?? ["Blocks.Ores", `${global().modId}.Ores`],
    model: `Resources/Ores/${cfg.model ?? "Ore_Large"}.blockymodel`,
    texture: `Resources/Ores/${cfg.texture ?? cfg.id}.png`,
    ...(cfg.icon ? { icon: `Icons/ItemsGenerated/Ore_${cfg.id}.png` } : {}),
    itemLevel: cfg.level ?? 10,
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
    maxStack: cfg.maxStack ?? 100,
    itemSoundSetId: "ISS_Blocks_Stone",
    dropOnDeath: true
  });

  lang([
    {
      key: `items.${modId}.Ore_${cfg.id}.name`,
      value: cfg.name ?? `${cfg.baseName ?? cfg.id} Ore`
    },
    ...(cfg.description
      ? [
          {
            key: `items.${modId}.Ore_${cfg.id}.description`,
            value: cfg.description ?? cfg.description
          }
        ]
      : [])
  ]);

  texture({
    color: cfg.color,
    inputFile: cfg.mask ?? `Ore/Ore${cfg.baseMask ? `_${cfg.baseMask}` : ""}`,
    outputFile: cfg.textureOut ?? `Resources/Ores/${cfg.id}`
  });

  resourceType(`Salvage_${cfg.id}`).icon("Rock").build();
});
