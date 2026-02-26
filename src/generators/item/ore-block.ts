import type { Simplify } from "type-fest";
import type { BlockTexture, Tab } from "../../index.js";
import { global, syncJson, syncLang, toPascal, u } from "../../index.js";
import type { BlockTypes, CommonTypes, ItemData } from "../item/item/item.types.js";

export type BlockType = "Stone" | "Basalt" | "Sandstone" | "Slate" | "Shale" | "Volcanic";

export type OreBlockData = Required<
  Simplify<
    Pick<ItemData, CommonTypes | BlockTypes> & {
      PlayerAnimationsId: "Block";
    }
  >
>;

export interface OreBlockConfig {
  id: string;
  type: Lowercase<BlockType>;
  icon?: boolean;
  color: string;
  name?: string;
  baseName?: string;
  description?: string;
  maxStack?: number;
  categories?: Tab[];
  model?: string;
  texture?: string;
  drops?: string[];
}

function computeBlockTexture(block: Lowercase<BlockType>): BlockTexture {
  let texture;
  switch (block) {
    case "sandstone":
      texture = {
        weight: 1,
        sides: "BlockTextures/Rock_Sandstone_Side.png",
        upDown: "BlockTextures/Rock_Sandstone_Top.png"
      };
      break;
    case "shale":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Shale.png"
      };
      break;
    case "stone":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Stone.png"
      };
      break;
    case "slate":
      texture = {
        sides: "BlockTextures/Rock_Slate_Cracked.png",
        upDown: "BlockTextures/Rock_Slate_Cracked.png",
        weight: 1
      };
      break;
    case "volcanic":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Volcanic.png"
      };
      break;
    case "basalt":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Basalt.png"
      };
      break;
  }
  return toPascal(texture);
}

export function oreBlock(config: OreBlockConfig) {
  const { modId, outDir } = global();
  const { categories, icon, id, model, texture, drops, maxStack } = config;
  const type = u(config.type);

  syncJson<OreBlockData>(
    `${outDir}/Server/Item/Items/Ore/${id}/Ore_${id}_${type}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ore_${id}_${type}.name`,
        description: `server.items.${modId}.Ore_${id}_${type}.description`
      },
      categories: categories ?? ["Blocks.Ores", `${modId}.Ores`],
      ...(icon ? { icon: `Icons/ItemsGenerated/Ore_${id}_${type}.png` } : {}),
      blockType: {
        material: "Solid" as const,
        drawType: "CubeWithModel" as const,
        customModel: `Resources/Ores/${model ?? "Ore_Large"}.blockymodel`,
        customModelTexture: [
          {
            texture: `Resources/Ores/${texture ?? id}.png`,
            weight: 1
          }
        ],
        group: "Stone",
        flags: {},
        randomRotation: "YawStep90" as const,
        gathering: {
          breaking: {
            gatherType: "OreIron",
            dropList: {
              container: {
                type: "Multiple" as const,
                containers: [
                  ...(drops && drops.length > 0
                    ? drops.map(itemId => ({
                        type: "Single" as const,
                        item: { itemId }
                      }))
                    : [
                        {
                          type: "Single" as const,
                          item: { itemId: `Ore${id}${type}` }
                        }
                      ]),
                  {
                    type: "Single" as const,
                    item: {
                      itemId: `Rock_${type}_Cobble`
                    }
                  }
                ] as const
              }
            }
          }
        },
        blockParticleSetId: "Ore",
        textures: [computeBlockTexture(config.type)],
        blockSoundSetId: "Ore",
        particleColor: config.color
      },
      playerAnimationsId: "Block" as const,
      tags: {
        Type: ["Ore"],
        Family: ["Cobalt"]
      },
      maxStack: maxStack || 100,
      itemSoundSetId: "ISS_Blocks_Stone"
    })
  );

  syncLang([
    {
      key: `items.${global().modId}.Ore_${id}_${type}.name`,
      value: config.name ?? `${config.baseName ?? id} Ore - ${type}`
    },
    ...(config.description
      ? [
          {
            key: `items.${modId}.Ore_${id}_${type}.description`,
            value: config.description
          }
        ]
      : [])
  ]);
}

export function oreBlocks(icon: boolean, configs: OreBlockConfig[]) {
  configs.forEach(config => {
    oreBlock({ ...config, icon });
  });
}
