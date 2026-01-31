import { u } from "@text";

export const ore = (config: OreConfig): OreData => {
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
    Texture: `Resources/Ores/Ore_Textures/${texture || u(id)}.png`,
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
