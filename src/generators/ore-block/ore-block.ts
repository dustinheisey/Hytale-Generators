import { generate, shouldInclude, uppercase } from "@util";

export function oreBlock(
  name: string,
  type: BlockType,
  config?: Config,
) {
  const json: OreBlockSchema = {
    TranslationProperties: {
      Name: `server.items.Ore_${uppercase(name)}_${uppercase(type)}.name`,
    },
    Categories: [
      "Blocks.Ores",
    ],
    BlockType: {
      Material: "Solid",
      DrawType: "CubeWithModel",
      CustomModel: "Resources/Ores/Ore_Large.blockymodel",
      CustomModelTexture: [
        {
          Texture: `Resources/Ores/Ore_Textures/${uppercase(name)}.png`,
          Weight: 1,
        },
      ],
      Group: uppercase(type),
      Flags: {},
      RandomRotation: "YawStep90",
      Gathering: {
        Breaking: {
          GatherType: `Ore${uppercase(name)}`,
          DropList: {
            Container: {
              Type: "Multiple",
              Containers: [
                {
                  Type: "Single",
                  Item: {
                    ItemId: `Ore_${uppercase(name)}`,
                  },
                },
                {
                  Type: "Single",
                  Item: {
                    ItemId: `Rock_${uppercase(type)}_Cobble`,
                  },
                },
              ],
            },
          },
        },
      },
      BlockParticleSetId: "Ore",
      Textures: [
        {
          Weight: 1,
          All: `BlockTextures/Rock_${uppercase(type)}.png`,
        },
      ],
      ParticleColor: config?.particleColor || "#000000",
      BlockSoundSetId: "Ore",
    },
    PlayerAnimationsId: "Block",
    Tags: {
      Type: [
        "Ore",
      ],
      Family: [
        "Gold",
      ],
    },
    MaxStack: 25,
    ItemSoundSetId: "ISS_Blocks_Stone",
  };

  if (config?.description) {
    json.TranslationProperties.Description = `server.items.Ore_${
      uppercase(name)
    }_${uppercase(type)}.description`;
  }

  if (shouldInclude(`ore_${type}`, config)) {
    generate(
      `${uppercase(name)}/Ore_${uppercase(name)}_${uppercase(type)}`,
      json,
    );
  }
}
