import type { OmitDeep } from "type-fest";
import { deriveEffectColors, global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { BlockTypes, CommonTypes, ItemData, MaskVariant } from "../item/item.types.js";

export type GemData = Required<
  OmitDeep<Pick<ItemData, CommonTypes | BlockTypes>, "BlockType.Gathering.Breaking"> & { PlayerAnimationsId: "Block" }
>;

export interface GemConfig {
  id: string;
  color: string;
  name?: string;
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

export function gem(config: GemConfig) {
  const modId = global().modId;
  const { light, interact, sparks } = deriveEffectColors(config.color);
  const categories: Tab[] = config.categories ?? (["Blocks.Ores"] as Tab[]);

  syncJson<GemData>(
    `Server/Item/Items/Gems/Gem${config.id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Gem${config.id}.name`,
        description: `server.items.${modId}.Gem${config.id}.description`
      },
      categories,
      playerAnimationsId: "Block" as const,
      blockType: {
        material: "Solid" as const,
        drawType: "Model" as const,
        opacity: "Transparent" as const,
        customModel: `Resources/Ores/${config.model ?? "Gem"}.blockymodel`,
        customModelTexture: [
          {
            texture: `Resources/Gems/${config.texture ?? config.id}.png`,
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
      maxStack: config.maxStack ?? 100
    })
  );

  syncLang([
    {
      key: `items.${modId}.Gem${config.id}.name`,
      value: config.name ?? config.id
    },
    ...(config.description
      ? [
          {
            key: `items.${modId}.Gem${config.id}.description`,
            value: config.description
          }
        ]
      : [])
  ]);

  syncTexture({
    color: config.color,
    inputFile: config.mask ?? `assets/gem/gem-mask-${config.maskVariant ?? "base"}.png`,
    outputFile: config.textureOut ?? `dist/Common/Resources/Gems/${config.id}.png`
  });
}

export function gems(configs: GemConfig[]) {
  configs.forEach(config => gem(config));
}
