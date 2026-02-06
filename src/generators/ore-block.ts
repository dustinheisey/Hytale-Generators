import { createGenerator, global } from "../index.ts";
import type { BlockType, IconProperties, Texture, ThingConfig, ThingData } from "../index.types.ts";

export type Block = "Stone" | "Basalt" | "Sandstone" | "Slate" | "Shale" | "Volcanic";

export interface OreBlockConfig extends ThingConfig {
  Hardness?: number;
  Tier?: number;
  ItemLevel?: number;
  Type: Block;
  Color: string;
  // dropList?: []
}

interface OreBlockData extends ThingData {
  BlockType: BlockType & { Textures: Texture[] };
  PlayerAnimationsId: string;
  ItemSoundSetId: string;
  IconProperties: IconProperties;
}

/**
 *
 * @param block - block type
 * @returns - texture config object
 */
function computeBlockTexture(block: Block): Texture {
  switch (block) {
    case "Sandstone":
      return {
        Weight: 1,
        Sides: "BlockTextures/Rock_Sandstone_Side.png",
        UpDown: "BlockTextures/Rock_Sandstone_Top.png"
      };
    case "Shale":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Shale.png"
      };
    case "Stone":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Stone.png"
      };
    case "Slate":
      return {
        Sides: "BlockTextures/Rock_Slate_Cracked.png",
        UpDown: "BlockTextures/Rock_Slate_Cracked.png",
        Weight: 1
      };
    case "Volcanic":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Volcanic.png"
      };
    case "Basalt":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Basalt.png"
      };
  }
}

export const oreBlock = createGenerator<OreBlockConfig, OreBlockData>({
  lang: c => [
    {
      key: `items.${global().ModId}.Ore_${c.Id}_${c.Type}.name`,
      value: `${c.Name || c.Id} Ore - ${c.Type}`
    }
  ],
  json: {
    path: c => `Server/Item/Items/Elements/${c.Id}/Ore_${c.Id}_${c.Type}`,
    data: c => ({
      TranslationProperties: {
        Name: `server.items.${global().ModId}.Ore_${c.Id}_${c.Type}.name`,
        Description: `server.items.${global().ModId}.Ore_${c.Id}_${c.Type}.description`
      },
      Categories: c.Categories || ["Blocks.Ores"],
      BlockType: {
        Material: "Solid",
        DrawType: "CubeWithModel",
        CustomModel: `Resources/Ores/${c.Model || "Ore_Large"}.blockymodel`,
        CustomModelTexture: [
          {
            Texture: `Resources/Ores/${c.Texture || c.Id}.png`,
            Weight: 1
          }
        ],
        Group: "Stone",
        Flags: {},
        RandomRotation: "YawStep90",
        Gathering: {
          Breaking: {
            GatherType: `OreIron`,
            DropList: {
              Container: {
                Type: "Multiple",
                Containers: [
                  {
                    Type: "Single",
                    Item: {
                      ItemId: `Ore_${c.Id}`
                    }
                  },
                  {
                    Type: "Single",
                    Item: {
                      ItemId: `Rock_${c.Type}_Cobble`
                    }
                  }
                ]
              }
            }
          }
        },
        BlockParticleSetId: "Ore",
        Textures: [computeBlockTexture(c.Type)],
        ParticleColor: c.Color,
        BlockSoundSetId: "Ore"
      },
      PlayerAnimationsId: "Block",
      Tags: {
        Type: ["Ore"],
        Family: [c.Id]
      },
      MaxStack: c.MaxStack || global().MaxStack,
      ItemSoundSetId: "ISS_Blocks_Stone",
      IconProperties: {
        Scale: 0.58823,
        Rotation: [22.5, 45, 22.5],
        Translation: [0, -13.5]
      }
    })
  }
});

/**
 * Generate all JSONs for each block type of all ores
 * @param configs - list of ore block config objects
 */
export const oreBlocks = (configs: OreBlockConfig[]) => {
  configs.forEach(config => {
    oreBlock(config);
  });
};
