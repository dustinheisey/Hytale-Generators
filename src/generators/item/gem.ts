import type { OmitDeep } from "type-fest";
import { deriveEffectColors, global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { BlockTypes, CommonTypes, ItemData, MaskVariant } from "../item/item.types.js";

export type GemData = Required<
  OmitDeep<Pick<ItemData, CommonTypes | BlockTypes>, "BlockType.Gathering.Breaking"> & { PlayerAnimationsId: "Block" }
>;

export interface GemConfig {
  id: string;
  color: string;
  icon?: boolean;
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
  const { modId } = global();
  const { light, interact, sparks } = deriveEffectColors(config.color);

  syncJson<GemData>(
    `${global().outDir}/Server/Item/Items/Gems/Rock_Gem_${config.id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Rock_Gem_${config.id}.name`,
        description: `server.items.${modId}.Rock_Gem_${config.id}.description`
      },
      ...(config.icon ? { icon: `Icons/ItemsGenerated/Rock_Gem_${config.id}.png` } : {}),
      categories: config.categories ?? ["Blocks.Ores", `${modId}.Gems`],
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
      key: `items.${modId}.Rock_Gem_${config.id}.name`,
      value: config.name ?? config.id
    },
    ...(config.description
      ? [
          {
            key: `items.${modId}.Rock_Gem_${config.id}.description`,
            value: config.description
          }
        ]
      : [])
  ]);

  syncTexture({
    color: config.color,
    inputFile: config.mask ?? `gem/gem-mask-${config.maskVariant ?? "base"}`,
    outputFile: config.textureOut ?? `Resources/Gems/${config.id}`
  });
}

export function gems(icon: boolean, configs: GemConfig[]) {
  configs.forEach(config => gem({ ...config, icon }));
}
