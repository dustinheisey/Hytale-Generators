import { generate, shouldInclude, uppercase } from "@util";

export function ore(
  name: string,
  config?: Config,
) {
  const json: OreSchema = {
    TranslationProperties: {
      Name: `server.items.Ore_${uppercase(name)}.name`,
    },
    Categories: config?.categories || [
      "Items",
    ],
    Recipe: {
      Input: [
        {
          ResourceTypeId: `Salvage_${uppercase(name)}`,
          Quantity: 1,
        },
      ],
      BenchRequirement: [
        {
          Type: "Processing",
          Id: "Salvagebench",
        },
      ],
      TimeSeconds: config?.processingTime || 4,
    },
    Model: `Resources/Ores/${config?.model || "Ore_Large"}.blockymodel`,
    Texture: `Resources/Ores/Ore_Textures/${
      config?.texture || uppercase(name)
    }.png`,
    ItemLevel: config?.itemLevel || 5,
    PlayerAnimationsId: "Block",
    IconProperties: {
      Scale: 1,
      Translation: [
        0,
        -3,
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
    MaxStack: 25,
    ItemSoundSetId: "ISS_Blocks_Stone",
    DropOnDeath: true,
  };

  if (config?.description) {
    json.TranslationProperties.Description = `server.items.Ore_${
      uppercase(name)
    }.description`;
  }

  if (shouldInclude("ore", config)) {
    generate(`${uppercase(name)}/${uppercase(name)}_Ore`, json);
  }
}
