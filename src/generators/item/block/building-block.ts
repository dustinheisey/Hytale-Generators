import type { BlockCfg, HasDrops } from "#hg/index";
import { builder, fragments, global, json, lang } from "#hg/index";

export type BuildingBlockCfg = BlockCfg & HasDrops;

export const buildingBlock = builder({
  init: (id: string) => ({ id }),
  build: (cfg: BuildingBlockCfg) => {
    const { modId } = global();
    const { withTranslationProperties, withIcon } = fragments;
    const {
      id,
      categories,
      name,
      baseName,
      description,
      maxStack,
      color,
      set,
      group,
      resourceType,
      model,
      texture,
      textureOverride,
      gatherType,
      transitionTexture,
      transitionToGroups,
      particleSetId,
      dropQuality,
      dropQuantity,
      drops
    } = cfg;
    json(`Server/Item/Items/Blocks/Building/${id}`, {
      ...withTranslationProperties(cfg),
      ...withIcon(cfg),
      itemLevel: 10,
      maxStack: maxStack ?? 100,
      categories: [...(categories ?? ""), `Waste.Blocks`],
      playerAnimationsId: "Block" as const,
      ...(set ? { set } : {}),
      blockType: {
        material: "Solid" as const,
        drawType: model ? ("Model" as const) : ("Cube" as const),
        ...(group ? { group } : {}),
        ...(model ? { CustomModel: `${model}.blockymodel` } : {}),
        ...(texture ? { CustomModelTexture: [{ Texture: `${texture}.png`, Weight: 1 }] } : {}),
        flags: {},
        gathering: {
          breaking: {
            gatherType: gatherType ?? "Rocks",
            ...(dropQuality ? { quality: dropQuality } : {}),
            ...(dropQuantity ? { quantity: dropQuantity } : {}),
            itemId: drops
          }
        },
        blockParticleSetId: particleSetId ?? "Stone",
        ...(!model
          ? {
              textures: textureOverride ?? [
                {
                  all: `BlockTextures/Building/${id}.png`
                }
              ]
            }
          : {}),
        particleColor: color,
        blockSoundSetId: "Stone",
        ...(transitionTexture && transitionToGroups
          ? {
              transitionTexture,
              transitionToGroups
            }
          : {})
      },
      tags: {
        type: ["Rock"]
      },
      ...(resourceType
        ? {
            resourceTypes: [
              {
                id: resourceType
              }
            ]
          }
        : {}),
      itemSoundSetId: "ISS_Blocks_Stone"
    });

    lang([
      {
        key: `items.${modId}.${id}.name`,
        value: name ?? baseName ?? id.replace(/_/g, " ")
      },
      ...(description
        ? [
            {
              key: `items.${modId}.${id}.description`,
              value: description
            }
          ]
        : [])
    ]);
  }
});
