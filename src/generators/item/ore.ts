import { builder, global, json, lang, resourceType, texture, u, type ItemBlockCfg } from "#hg/index";

export type OreCfg = ItemBlockCfg;

export const ore = builder({
  init: (id: string) => ({ id }),
  build: (cfg: OreCfg) => {
    const { modId, items } = global();
    json(`${items.json}/Ore/${cfg.id}/Ore_${cfg.id}`, {
      translationProperties: {
        name: `${items.lang}.${modId}.Ore_${cfg.id}.name`,
        description: `${items.lang}.${modId}.Ore_${cfg.id}.description`
      },
      categories: cfg.categories ?? ["Blocks.Ores", `${modId}.Ores`],
      model: `Resources/Ores/${cfg.model ?? "Ore_Large"}.blockymodel`,
      texture: `Resources/Ores/${cfg.texture ?? cfg.id}.png`,
      ...(cfg.icon ? { icon: `${items.icon}/Ore_${cfg.id}.png` } : {}),
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

    lang({
      [`${items.langRoot}.${modId}.Ore_${cfg.id}.name`]: cfg.name ?? `${cfg.baseName ?? cfg.id} Ore`,
      [`${items.langRoot}.${modId}.Ore_${cfg.id}.description`]: cfg.description
    });

    texture(
      cfg.color,
      cfg.mask ?? `Ores/Ore${cfg.baseMask ? `_${u(cfg.baseMask)}` : ""}`,
      cfg.textureOut ?? `Resources/Ores/${cfg.id}`
    );

    resourceType(`Salvage_${cfg.id}`).icon("Rock").build();
  }
});
