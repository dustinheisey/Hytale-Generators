import { u } from "@text";
import { deriveEffectColors } from "@color";

export const gem = (config: GemConfig): GemData => {
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
      Name: `server.items.Rock_Gem_${u(id)}.name`,
      ...(config.description
        ? { Description: `server.items.Rock_Gem_${u(id)}.description` }
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
          Texture: `Resources/Ores/Gem_Textures/${texture || u(id)}.png`,
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
