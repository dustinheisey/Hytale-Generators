import { generate, shouldInclude, uppercase } from "@util";

interface IngotSchema extends ItemSchema {}

export default function ingot(
  name: string,
  config?: Config,
) {
  const json: IngotSchema = {
    TranslationProperties: {
      Name: `server.items.Ingredient_Bar_${uppercase(name)}.name`,
    },
    Model: `Resources/Materials/${config?.model || "Ingot"}.blockymodel`,
    Texture: `Resources/Materials/Ingot_Textures/${
      config?.texture || uppercase(name)
    }.png`,
    Categories: config?.categories || [
      "Items",
      "Unified_Materials.Ingots",
    ],
    Recipe: {
      Input: [
        {
          ItemId: `Ore_${uppercase(name)}`,
          Quantity: 1,
        },
      ],
      BenchRequirement: config?.benchRequirement ? [config.benchRequirement] : [
        {
          Type: "Processing",
          Id: "Furnace",
        },
      ],
      OutputQuantity: config?.outputQuantity || 1,
      TimeSeconds: config?.processingTime || 10,
    },
    ResourceTypes: [
      {
        Id: "Metal_Bars",
      },
    ],
    PlayerAnimationsId: "Item",
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
        "Ingredient",
      ],
    },
    ItemEntity: {
      ParticleSystemId: null,
    },
    ItemSoundSetId: "ISS_Items_Ingots",
    DropOnDeath: true,
  };

  if (config?.description) {
    json.TranslationProperties.Description = `server.items.Ingredient_Bar_${
      uppercase(name)
    }.description`;
  }

  if (shouldInclude("ingot", config)) {
    generate({
      file: `${uppercase(name)}/Ingredient_Bar_${uppercase(name)}`,
      lang: {
        name: `items.Ingredient_Bar_${uppercase(name)}.name`,
        description: `items.Ingredient_Bar_${uppercase(name)}.description`,
      },
      name: `${uppercase(name)} Ingot`,
      description: config?.description || null,
      options: json,
    });
  }
}
