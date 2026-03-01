import {
  builder,
  fragments,
  global,
  HasBlock,
  HasId,
  HasItem,
  HasLang,
  HasTexture,
  json,
  lang,
  type Builder
} from "hytale-generators";

export interface HasBench {
  outputSlotsCount: number;
  inputFilterValidIngredients: boolean;
}

export type BenchCfg = HasId & HasLang & HasTexture & HasItem & HasBlock & HasBench;

export const bench: Builder<BenchCfg> = builder((cfg: BenchCfg) => {
  const { modId } = global();
  const { withTranslationProperties, withIcon } = fragments;
  const {
    id,
    name,
    baseName,
    description,
    model,
    texture,
    particleColor,
    blockSoundSetId,
    particleSetId,
    outputSlotsCount,
    inputFilterValidIngredients,
    maxStack
  } = cfg;
  json(`Server/Item/Items/Benches/${id}`, {
    ...withTranslationProperties(cfg),
    ...withIcon(cfg),
    categories: ["Furniture.Benches", "Waste.Tools"],
    blockType: {
      material: "Solid" as const,
      drawType: "Model" as const,
      opacity: "Transparent" as const,
      customModel: model || `Blocks/Benches/${id}.blockymodel`,
      customModelTexture: texture || [
        {
          texture: `Blocks/Benches/${id}.png`,
          weight: 1
        }
      ],
      variantRotation: "NESW",
      bench: {
        type: "Processing",
        input: [
          {
            filterValidIngredients: inputFilterValidIngredients !== undefined ? inputFilterValidIngredients : true
          }
        ],
        localOpenSoundEventId: "SFX_Workbench_Open",
        localCloseSoundEventId: "SFX_Workbench_Close",
        completedSoundEventId: "SFX_Workbench_Craft",
        failedSoundEventId: "SFX_Generic_Crafting_Failed",
        benchUpgradeSoundEventId: "SFX_Workbench_Upgrade_Start_Default",
        benchUpgradeCompletedSoundEventId: "SFX_Workbench_Upgrade_Complete_Default",
        outputSlotsCount: outputSlotsCount || 6,
        id: id
      },
      state: {
        id: "processingBench"
      },
      gathering: {
        breaking: {
          gatherType: "Benches",
          dropList: {
            container: {
              type: "Multiple" as const,
              containers: [
                {
                  type: "Single" as const,
                  item: { itemId: id }
                }
              ] as const
            }
          }
        }
      },
      hitboxType: id,
      blockParticleSetId: particleSetId || "Wood",
      particleColor: particleColor || "#6e4a2f",
      support: {
        down: [
          {
            faceType: "Full"
          }
        ]
      },
      blockSoundSetId: blockSoundSetId || "Stone",
      interactions: {
        use: "Open_Processing_Bench"
      }
    },
    playerAnimationsId: "Block" as const,
    iconProperties: {
      scale: 0.5,
      rotation: [22.5, 45, 22.5],
      translation: [1, -17.4]
    },
    tags: {
      type: ["Bench"]
    },
    maxStack: maxStack || 1,
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
});
