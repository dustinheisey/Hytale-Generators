import { u } from "@text";

export const oreBlock = (config: OreBlockConfig): OreBlockData => {
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
          Texture: `Resources/Ores/Ore_Textures/${texture || u(id)}.png`,
          Weight: 1,
        },
      ],
      Group: "Stone",
      Flags: {},
      RandomRotation: "YawStep90",
      Gathering: {
        Breaking: {
          GatherType: `Ore${u(id)}`,
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
        {
          Weight: 1,
          All: `BlockTextures/Rock_${u(type)}.png`,
        },
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
    MaxStack: maxStack || 25,
    ItemSoundSetId: "ISS_Blocks_Stone",
  };
};

// oreBlock({ id: "Acanthite", type: "basalt", color: "#432344" });
