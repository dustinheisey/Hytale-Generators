import { deriveEffectColors, u } from "@util";
import { meta, syncJson, syncLang, syncTexture } from "@meta";

export const data = (config: GemConfig): GemData => {
  const {
    id,
    categories,
    model,
    texture,
    color,
    maxStack,
  } = config;

  const { light, interact, sparks } = deriveEffectColors(color);

  return {
    TranslationProperties: {
      Name: `server.items.unified_materials.Gem_${u(id)}.name`,
      Description: `server.items.unified_materials.Gem_${u(id)}.description`,
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
    MaxStack: maxStack || meta.maxStack,
  };
};

/** Generate a single gem JSON */
export function generateGem(gem: GemConfig) {
  const description = gem.description || null;

  syncLang({
    name: {
      key: `items.unified_materials.Gem_${u(gem.id)}.name`,
      value: `${gem.name || u(gem.id)}`,
    },
    ...(description && {
      description: {
        key: `items.unified_materials.Gem_${u(gem.id)}.description`,
        value: description,
      },
    }),
  });

  syncTexture({
    color: gem.color,
    inputFile: `assets/gem/gem-mask-${gem.variant || "medium"}.png`,
    outputFile: `dist/Common/Resources/Gems/${u(gem.id)}.png`,
  });

  syncJson(
    `Server/Item/Items/Gems/Gem_${u(gem.id)}`,
    data(gem),
  );
}

/** Generate all gem JSONs */
export function generateGems(gems: GemConfig[]) {
  gems.forEach((gem) => generateGem(gem));
}
