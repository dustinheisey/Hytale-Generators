import { u } from "@text";
import { deriveEffectColors } from "@color";
import { syncJson, syncLang, syncTexture } from "@sync";
import { include } from "@include";

export const data = (config: GemConfig): GemData => {
  const {
    id,
    categories,
    model,
    texture,
    color,
    maxStack,
  } = config;

  const { light, interact, sparks } = deriveEffectColors(color || "#000000");

  return {
    TranslationProperties: {
      Name: `server.items.Gem_${u(id)}.name`,
      ...(config.description
        ? { Description: `server.items.Gem_${u(id)}.description` }
        : ""),
    },
    Categories: categories || [
      "Blocks.Ores",
      "Unified_Materials.Gems",
    ],
    PlayerAnimationsId: "Block",
    BlockType: {
      Material: "Solid",
      DrawType: "Model",
      Opacity: "Transparent",
      CustomModel: `Resources/Ores/${model || "Gem"}.blockymodel`,
      CustomModelTexture: [
        {
          Texture: `Resources/Gems/${texture || u(id)}.png`,
          Weight: 1,
        },
      ],
      Group: "Stone",
      Flags: {},
      Gathering: {
        Breaking: {
          GatherType: "Rocks",
        },
      },
      VariantRotation: "DoublePipe",
      RandomRotation: "YawStep90",
      BlockParticleSetId: "Crystal",
      ParticleColor: config?.effectColor?.interact || interact,
      BlockSoundSetId: "Gem",
      AmbientSoundEventId: "SFX_Gem_Emit_Loop",
      Light: {
        Color: config?.effectColor?.light || light,
        Radius: config?.effectColor?.radius || 0,
      },
      Particles: [
        {
          Color: config?.effectColor?.sparks || sparks,
          SystemId: "Block_Gem_Sparks",
        },
      ],
    },
    Tags: {
      Type: [
        "Rock",
      ],
      Family: [
        "Gem",
      ],
    },
    ItemSoundSetId: "ISS_Blocks_Stone",
    MaxStack: maxStack || 25,
  };
};

export function generateGem(config: ThingsConfig) {
  if (include("gem", config)) {
    const description = config?.gem?.description || config.description || null;

    syncLang({
      name: {
        key: `items.Gem_${u(config.id)}.name`,
        value: `${config?.gem?.name || config.name || u(config.id)}`,
      },
      ...(description && {
        description: {
          key: `items.Gem_${u(config.id)}.description`,
          value: description,
        },
      }),
    });

    syncTexture({
      color: config?.gem?.color || config.color,
      inputFile: "assets/gem-mask.png",
      outputFile: `dist/Common/Resources/Gems/${u(config.id)}.png`,
    });

    syncJson(
      `Server/Item/Elements/${u(config.id)}/Gem_${u(config.id)}`,
      data(config),
    );
  }
}
