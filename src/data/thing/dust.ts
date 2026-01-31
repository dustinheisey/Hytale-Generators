import { u } from "@text";

export const dust = (config: DustConfig): DustData => {
  const {
    id,
    categories,
    outputQuantity,
    processingTime,
    model,
    texture,
    maxStack,
  } = config;

  return {
    TranslationProperties: {
      Name: `server.items.Ingredient_Dust_${u(id)}.name`,
      ...(config.description
        ? {
          Description: `server.items.Ingredient_Dust_${u(id)}.description`,
        }
        : ""),
    },
    Categories: categories || [
      "Items",
      "Unified_Materials.Dusts",
    ],
    Recipe: {
      Input: [
        {
          ItemId: `Ore_${u(id)}`,
          Quantity: 1,
        },
      ],
      BenchRequirement: [
        {
          Type: "Processing",
          Id: "Salvagebench",
        },
      ],
      OutputQuantity: outputQuantity || 2,
      TimeSeconds: processingTime || 10,
    },
    Model: `Resources/Materials/${model || "Ingot"}.blockymodel`,
    Texture: `Resources/Materials/Ingot_Textures/${texture || u(id)}.png`,
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
    ResourceTypes: [
      {
        Id: "Dusts",
      },
    ],
    PlayerAnimationsId: "Item",
    Tags: {
      Type: [
        "Ingredient",
      ],
      Family: [
        "Dust",
      ],
    },
    ItemEntity: {
      ParticleSystemId: null,
    },
    DropOnDeath: true,
    MaxStack: maxStack || 25,
  };
};
