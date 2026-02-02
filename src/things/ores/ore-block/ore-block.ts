import { include, u } from "@util";
import { meta, syncJson, syncLang } from "@meta";

function computeBlockTexture(block: Block): Texture {
  switch (block) {
    case "sandstone":
      return {
        Weight: 1,
        Sides: "BlockTextures/Rock_Sandstone_Side.png",
        UpDown: "BlockTextures/Rock_Sandstone_Top.png",
      };
    case "shale":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Shale.png",
      };
    case "stone":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Stone.png",
      };
    case "slate":
      return {
        Sides: "BlockTextures/Rock_Slate_Cracked.png",
        UpDown: "BlockTextures/Rock_Slate_Cracked.png",
        Weight: 1,
      };
    case "volcanic":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Volcanic.png",
      };
    case "basalt":
      return {
        Weight: 1,
        All: "BlockTextures/Rock_Basalt.png",
      };
  }
}

export const data = (config: OreBlockConfig): OreBlockData => {
  const {
    id,
    type,
    categories,
    model,
    texture,
    maxStack,
    color,
  } = config;

  return {
    TranslationProperties: {
      Name: `server.items.Ore_${u(id)}_${u(type)}.name`,
    },
    Categories: categories || [
      "Blocks.Ores",
      "Unified_Materials.Ores",
    ],
    BlockType: {
      Material: "Solid",
      DrawType: "CubeWithModel",
      CustomModel: `Resources/Ores/${model || "Ore_Large"}.blockymodel`,
      CustomModelTexture: [
        {
          Texture: `Resources/Ores/${texture || u(id)}.png`,
          Weight: 1,
        },
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
                    ItemId: `Ore_${u(id)}`,
                  },
                },
                {
                  Type: "Single",
                  Item: {
                    ItemId: `Rock_${u(type)}_Cobble`,
                  },
                },
              ],
            },
          },
        },
      },
      BlockParticleSetId: "Ore",
      Textures: [
        computeBlockTexture(config.type),
      ],
      ParticleColor: color || "#000000",
      BlockSoundSetId: "Ore",
    },
    PlayerAnimationsId: "Block",
    Tags: {
      Type: [
        "Ore",
      ],
      Family: [
        u(id),
      ],
    },
    MaxStack: maxStack || meta.maxStack,
    ItemSoundSetId: "ISS_Blocks_Stone",
    IconProperties: {
      Scale: 0.58823,
      Rotation: [
        22.5,
        45,
        22.5,
      ],
      Translation: [
        0,
        -13.5,
      ],
    },
  };
};

type OreBlockConfig = ThingsConfig & { type: Block };

/** Generate JSONs for each block type of a single ore */
export function generateOreBlock(
  oreBlock: OreBlockConfig,
) {
  if (include(`ore_${oreBlock.type}`, oreBlock)) {
    const description = oreBlock?.oreBlock?.description ||
      oreBlock?.ores?.description ||
      oreBlock.description || null;

    syncLang({
      name: {
        key: `items.Ore_${u(oreBlock.id)}_${u(oreBlock.type)}.name`,
        value: `${
          oreBlock?.oreBlock?.name || oreBlock?.ores?.name || oreBlock.name ||
          u(oreBlock.id)
        } Ore - ${u(oreBlock.type)}`,
      },
      ...(description && {
        description: {
          key: `items.Ore_${u(oreBlock.id)}_${u(oreBlock.type)}.description`,
          value: description,
        },
      }),
    });

    syncJson(
      `Server/Item/Items/Elements/${u(oreBlock.id)}/Ore_${u(oreBlock.id)}_${
        u(oreBlock.type)
      }`,
      data(oreBlock),
    );
  }
}

/** Generate all JSONs for each block type of all ores */
export function generateOreBlocks(oreBlocks: OreBlockConfig[]) {
  oreBlocks.forEach((oreBlock) => generateOreBlock(oreBlock));
}
