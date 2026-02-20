import type { OmitDeep } from "type-fest";
import { deriveEffectColors, global, syncJson, syncLang, syncTexture, toPascal, type Tab } from "../../index.js";
import type { BlockTypes, CommonTypes, ItemData, MaskVariant } from "../item/item.types.js";

export type GemData = Required<
  OmitDeep<Pick<ItemData, CommonTypes | BlockTypes>, "BlockType.Gathering.Breaking"> & { PlayerAnimationsId: "Block" }
>;

export interface GemOptions {
  variant?: "light" | "dark";
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

export function gem(id: string, color: string, options?: GemOptions) {
  const modId = global().modId;
  const { light, interact, sparks } = deriveEffectColors(color);
  const categories: Tab[] = options?.categories ?? (["Blocks.Ores"] as Tab[]);

  syncJson<GemData>(
    `Server/Item/Items/Gems/Gem${id}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Gem${id}.name`,
        description: `server.items.${modId}.Gem${id}.description`
      },
      categories,
      playerAnimationsId: "Block" as const,
      blockType: {
        material: "Solid" as const,
        drawType: "Model" as const,
        opacity: "Transparent" as const,
        customModel: `Resources/Ores/${options?.model ?? "Gem"}.blockymodel`,
        customModelTexture: [
          {
            texture: `Resources/Gems/${options?.texture ?? id}.png`,
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
      maxStack: options?.maxStack ?? 100
    })
  );

  syncLang([
    {
      key: `items.${modId}.Gem${id}.name`,
      value: options?.name ?? id
    },
    ...(options?.description
      ? [
          {
            key: `items.${modId}.Gem${id}.description`,
            value: options.description
          }
        ]
      : [])
  ]);

  syncTexture({
    color: color,
    inputFile: options?.mask ?? `assets/gem/gem-mask-${options?.variant ?? "base"}.png`,
    outputFile: options?.textureOut ?? `dist/Common/Resources/Gems/${id}.png`
  });
}
