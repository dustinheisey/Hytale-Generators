import { u } from "@text";
import { syncJson, syncLang, syncTexture } from "@sync";
import { include } from "@include";

export const data = (config: OreConfig): OreData => {
  const {
    id,
    categories,
    processingTime,
    model,
    texture,
    itemLevel,
    maxStack,
  } = config;
  return {
    TranslationProperties: {
      Name: `server.items.Ore_${u(id)}.name`,
      ...(config.description
        ? { Description: `server.items.Ore_${u(id)}.description` }
        : ""),
    },
    Categories: categories || [
      "Blocks.Ores",
      "Unified_Materials.Ores",
    ],
    Recipe: {
      Input: [
        {
          ResourceTypeId: `Salvage_${u(id)}`,
          Quantity: 1,
        },
      ],
      BenchRequirement: [
        {
          Type: "Processing",
          Id: "Salvagebench",
        },
      ],
      TimeSeconds: processingTime || 15,
    },
    Model: `Resources/Ores/${model || "Ore_Large"}.blockymodel`,
    Texture: `Resources/Ores/${texture || u(id)}.png`,
    ItemLevel: itemLevel || 10,
    PlayerAnimationsId: "Block",
    IconProperties: {
      Scale: 0.57323,
      Translation: [
        -3.6,
        -16.200001,
      ],
      Rotation: [
        22.5,
        45,
        22.5,
      ],
    },
    Tags: {
      Type: [
        "Ore",
      ],
    },
    ItemEntity: {
      ParticleSystemId: null,
    },
    MaxStack: maxStack || 25,
    ItemSoundSetId: "ISS_Blocks_Stone",
    DropOnDeath: true,
  };
};

export function generateOre(config: ThingsConfig) {
  if (include("ore", config)) {
    const description = config?.ore?.description || config?.ores?.description ||
      config.description || null;

    syncLang({
      name: {
        key: `items.Ore_${u(config.id)}.name`,
        value: `${
          config?.ore?.name || config?.ores?.name || config.name ||
          u(config.id)
        } Ore`,
      },
      ...(description && {
        description: {
          key: `items.Ore_${u(config.id)}.description`,
          value: description,
        },
      }),
    });

    syncTexture({
      color: config?.ore?.color || config?.ores?.color || config.color,
      inputFile: "assets/ore-mask.png",
      outputFile: `dist/Common/Resources/Ores/${u(config.id)}.png`,
    });

    syncJson(
      `Server/Item/Elements/${u(config.id)}/Ore_${u(config.id)}`,
      data(config),
    );
  }
}
