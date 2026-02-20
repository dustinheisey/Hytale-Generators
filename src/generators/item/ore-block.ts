import type { Simplify } from "type-fest";
import type { BlockTexture, Tab } from "../../index.js";
import { global, syncJson, syncLang, toPascal } from "../../index.js";
import type { BlockTypes, CommonTypes, ItemData } from "../item/item.types.js";

export type BlockType = "Stone" | "Basalt" | "Sandstone" | "Slate" | "Shale" | "Volcanic";

export const blockTypes: BlockType[] = ["Basalt", "Sandstone", "Shale", "Slate", "Stone", "Volcanic"];

export type OreBlockData = Required<
  Simplify<
    Pick<ItemData, CommonTypes | BlockTypes> & {
      PlayerAnimationsId: "Block";
    }
  >
>;

export interface OreBlockOptions {
  name?: string;
  baseName?: string;
  description?: string;
  categories?: Tab[];
  model?: string;
  texture?: string;
  drops?: string[];
}

function computeBlockTexture(block: BlockType): BlockTexture {
  let texture;
  switch (block) {
    case "Sandstone":
      texture = {
        weight: 1,
        sides: "/Rock_Sandstone_Side.png",
        upDown: "/Rock_Sandstone_Top.png"
      };
    case "Shale":
      texture = {
        weight: 1,
        all: "/Rock_Shale.png"
      };
    case "Stone":
      texture = {
        weight: 1,
        all: "/Rock_Stone.png"
      };
    case "Slate":
      texture = {
        sides: "/Rock_Slate_Cracked.png",
        upDown: "/Rock_Slate_Cracked.png",
        weight: 1
      };
    case "Volcanic":
      texture = {
        weight: 1,
        all: "/Rock_Volcanic.png"
      };
    case "Basalt":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Basalt.png"
      };
  }
  return toPascal(texture);
}

export function oreBlock(id: string, type: BlockType, color: string, options?: OreBlockOptions) {
  const modId = global().modId;

  syncJson<OreBlockData>(
    `Server/Item/Items/OreBlocks/OreBlock${id}${type}`,
    toPascal({
      translationProperties: {
        name: `server.items.${modId}.Ore${id}${type}.name`,
        description: `server.items.${modId}.Ore${id}${type}.description`
      },
      categories: options?.categories ?? ["Blocks.Ores"],
      blockType: {
        material: "Solid" as const,
        drawType: "CubeWithModel" as const,
        customModel: `Resources/Ores/${options?.model ?? "Ore_Large"}.blockymodel`,
        customModelTexture: [
          {
            texture: `Resources/Ores/${options?.texture ?? id}.png`,
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
                  ...(options?.drops && options?.drops.length > 0
                    ? options?.drops.map(itemId => ({
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
        textures: [computeBlockTexture(type)],
        blockSoundSetId: "Ore",
        particleColor: color
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
      key: `items.${global().modId}.Ore${id}${type}.name`,
      value: options?.name ?? `${options?.baseName ?? id} Ore - ${type}`
    },
    ...(options?.description
      ? [
          {
            key: `items.${modId}.Ore${id}${type}.description`,
            value: options.description
          }
        ]
      : [])
  ]);
}
