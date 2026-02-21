import type { Simplify } from "type-fest";
import type { BlockTexture, Tab } from "../../index.js";
import { global, syncJson, syncLang, toPascal } from "../../index.js";
import type { BlockTypes, CommonTypes, ItemData } from "../item/item.types.js";

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
  color: string;
  name?: string;
  baseName?: string;
  description?: string;
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
        sides: "/Rock_Sandstone_Side.png",
        upDown: "/Rock_Sandstone_Top.png"
      };
    case "shale":
      texture = {
        weight: 1,
        all: "/Rock_Shale.png"
      };
    case "stone":
      texture = {
        weight: 1,
        all: "/Rock_Stone.png"
      };
    case "slate":
      texture = {
        sides: "/Rock_Slate_Cracked.png",
        upDown: "/Rock_Slate_Cracked.png",
        weight: 1
      };
    case "volcanic":
      texture = {
        weight: 1,
        all: "/Rock_Volcanic.png"
      };
    case "basalt":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Basalt.png"
      };
  }
  return toPascal(texture);
}

export function oreBlock(config: OreBlockConfig) {
  const modId = global().modId;
  const type = toPascal(config.type);

  syncJson<OreBlockData>(
    `Server/Item/Items/OreBlocks/OreBlock${config.id}${type}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ore${config.id}${type}.name`,
        description: `server.items.${modId}.Ore${config.id}${type}.description`
      },
      categories: config.categories ?? ["Blocks.Ores"],
      blockType: {
        material: "Solid" as const,
        drawType: "CubeWithModel" as const,
        customModel: `Resources/Ores/${config.model ?? "Ore_Large"}.blockymodel`,
        customModelTexture: [
          {
            texture: `Resources/Ores/${config.texture ?? config.id}.png`,
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
                  ...(config.drops && config.drops.length > 0
                    ? config.drops.map(itemId => ({
                        type: "Single" as const,
                        item: { itemId }
                      }))
                    : [
                        {
                          type: "Single" as const,
                          item: { itemId: `Ore${config.id}${type}` }
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
      maxStack: 25,
      itemSoundSetId: "ISS_Blocks_Stone"
    })
  );

  syncLang([
    {
      key: `items.${global().modId}.Ore${config.id}${type}.name`,
      value: config.name ?? `${config.baseName ?? config.id} Ore - ${type}`
    },
    ...(config.description
      ? [
          {
            key: `items.${modId}.Ore${config.id}${type}.description`,
            value: config.description
          }
        ]
      : [])
  ]);
}

export function oreBlocks(configs: OreBlockConfig[]) {
  configs.forEach(config => oreBlock(config));
}
