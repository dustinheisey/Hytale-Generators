import { u } from "@text";
import { syncJson, syncLang } from "@sync";
import { include } from "@include";

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
          Texture: `Resources/Ores/Ore_Textures/${texture || u(id)}.png`,
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

export function generateOreBlock(
  config: ThingsConfig & { type: Block },
) {
  if (include(`ore_${config.type}`, config)) {
    const description = config?.oreBlock?.description ||
      config?.ores?.description ||
      config.description || null;

    syncLang({
      name: {
        key: `items.Ore_${u(config.id)}_${u(config.type)}.name`,
        value: `${
          config?.oreBlock?.name || config?.ores?.name || config.name ||
          u(config.id)
        } Ore - ${u(config.type)}`,
      },
      ...(description && {
        description: {
          key: `items.Ore_${u(config.id)}_${u(config.type)}.description`,
          value: description,
        },
      }),
    });

    syncJson(
      `Server/Item/Items/Elements/${u(config.id)}/Ore_${u(config.id)}_${
        u(config.type)
      }`,
      data(config),
    );
  }
}

// oreBlock({ id: "Acanthite", type: "basalt", color: "#432344" });
