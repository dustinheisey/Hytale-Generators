import { createGenerator, deriveEffectColors, globalConfig } from "../index.ts";
import type { BlockType, ThingConfig, ThingData } from "../index.types.ts";

interface Light {
  Color: string;
  Radius: number;
}

interface Particle {
  Color: string;
  SystemId: string;
}

export interface GemConfig extends ThingConfig {
  Color: string;
  Variant?: "Light" | "Medium" | "Dark";
  EffectColor?: {
    interact?: string;
    light?: string;
    sparks?: string;
    radius?: number;
  };
}

interface GemData extends ThingData {
  PlayerAnimationsId: string;
  BlockType: BlockType & {
    Opacity: string;
    VariantRotation: string;
    AmbientSoundEventId: string;
    Light: Light;
    Particles: Particle[];
  };
  ItemSoundSetId: string;
}

export const gem = createGenerator<GemConfig, GemData>({
  lang: c => [
    {
      key: `items.Unified_Materials.Gem_${c.Id}.name`,
      value: c.Name || c.Id
    }
  ],
  json: {
    path: c => `Server/Item/Items/Gems/Gem_${c.Id}`,
    data: c => {
      const { light, interact, sparks } = deriveEffectColors(c.Color);

      return {
        TranslationProperties: {
          Name: `server.items.Unified_Materials.Gem_${c.Id}.name`,
          Description: `server.items.Unified_Materials.Gem_${c.Id}.description`
        },
        Categories: c.Categories || ["Blocks.Ores", "Unified_Materials.Gems"],
        PlayerAnimationsId: "Block",
        BlockType: {
          Material: "Solid",
          DrawType: "Model",
          Opacity: "Transparent",
          CustomModel: `Resources/Ores/${c.Model || "Gem"}.blockymodel`,
          CustomModelTexture: [
            {
              Texture: `Resources/Gems/${c.Texture || c.Id}.png`,
              Weight: 1
            }
          ],
          Group: "Stone",
          Flags: {},
          Gathering: {
            Breaking: {
              GatherType: "Rocks"
            }
          },
          VariantRotation: "DoublePipe",
          RandomRotation: "YawStep90",
          BlockParticleSetId: "Crystal",
          ParticleColor: c.EffectColor?.interact || interact,
          BlockSoundSetId: "Gem",
          AmbientSoundEventId: "SFX_Gem_Emit_Loop",
          Light: {
            Color: c.EffectColor?.light || light,
            Radius: c.EffectColor?.radius || 0
          },
          Particles: [
            {
              Color: c.EffectColor?.sparks || sparks,
              SystemId: "Block_Gem_Sparks"
            }
          ]
        },
        Tags: {
          Type: ["Rock"],
          Family: ["Gem"]
        },
        ItemSoundSetId: "ISS_Blocks_Stone",
        MaxStack: c.MaxStack || globalConfig.MaxStack
      };
    }
  },
  texture: c => ({
    color: c.Color,
    inputFile: `src/assets/gem/gem-mask-${c.Variant || "medium"}.png`,
    outputFile: `dist/Common/Resources/Gems/${c.Id}.png`
  })
});

/**
 * Generate all gem JSONs
 * @param configs - list of gem config objects
 */
export const gems = (configs: GemConfig[]) => {
  configs.forEach(config => {
    gem(config);
  });
};
