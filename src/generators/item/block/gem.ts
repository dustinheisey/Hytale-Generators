import type { BlockCfg, Builder } from "hytale-generators";
import { builder, deriveEffectColors, global, json, lang, texture } from "hytale-generators";

export type GemCfg = BlockCfg;

export const Gem: Builder<GemCfg> = builder((cfg: GemCfg) => {
  const { modId } = global();
  const { light, interact, sparks } = deriveEffectColors(cfg.color);
  json(`Server/Item/Items/Gems/Rock_Gem_${cfg.id}`, {
    translationProperties: {
      name: `server.items.${global().modId}.Rock_Gem_${cfg.id}.name`,
      description: `server.items.${global().modId}.Rock_Gem_${cfg.id}.description`
    },
    ...(cfg.icon ? { icon: `Icons/ItemsGenerated/Rock_Gem_${cfg.id}.png` } : {}),
    categories: cfg.categories ?? ["Blocks.Ores", `${global().modId}.Gems`],
    playerAnimationsId: "Block" as const,
    blockType: {
      material: "Solid" as const,
      drawType: "Model" as const,
      opacity: "Transparent" as const,
      customModel: `Resources/Ores/${cfg.model ?? "Gem"}.blockymodel`,
      customModelTexture: [
        {
          texture: `Resources/Gems/${cfg.texture ?? cfg.id}.png`,
          weight: 1
        }
      ],
      group: "Stone",
      flags: {},
      gathering: {
        breaking: {
          gatherType: "Rocks"
        }
      },
      variantRotation: "DoublePipe",
      randomRotation: "YawStep90" as const,
      blockParticleSetId: "Crystal",
      particleColor: interact,
      blockSoundSetId: "Gem",
      ambientSoundEventId: "SFX_Gem_Emit_Loop",
      light: {
        color: light,
        radius: 0
      },
      particles: [
        {
          color: sparks,
          systemId: "Block_Gem_Sparks"
        }
      ]
    },
    tags: {
      type: ["Rock"],
      family: ["Gem"]
    },
    itemSoundSetId: "ISS_Blocks_Stone",
    maxStack: cfg.maxStack ?? 100
  });

  lang([
    {
      key: `items.${modId}.Rock_Gem_${cfg.id}.name`,
      value: cfg.name ?? cfg.name ?? cfg.id
    },
    ...(cfg.description
      ? [
          {
            key: `items.${modId}.Rock_Gem_${cfg.id}.description`,
            value: cfg.description ?? cfg.description
          }
        ]
      : [])
  ]);

  texture({
    color: cfg.color,
    inputFile: cfg.mask ?? `Gems/Gem${cfg.baseMask ? `_${cfg.baseMask}` : ""}`,
    outputFile: cfg.textureOut ?? `Resources/Gems/${cfg.id}`
  });
});
