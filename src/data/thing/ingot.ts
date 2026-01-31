import { u } from "@text";

export const ingot = (config: IngotConfig): IngotData => {
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
      Name: `server.items.Ingredient_Bar_${u(id)}.name`,
      ...(config.description
        ? { Description: `server.items.Ingredient_Bar_${u(id)}.description` }
        : ""),
    },
    Categories: categories || [
      "Items",
      "Unified_Materials.Ingots",
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
          Id: "Furnace",
        },
      ],
      OutputQuantity: outputQuantity || 1,
      TimeSeconds: processingTime || 10,
    },
    Model: `Resources/Materials/${model || "Ingot"}.blockymodel`,
    Texture: `Resources/Materials/Ingot_Textures/${texture || u(id)}.png`,
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
      Family: [
        "Metal_Bar",
      ],
    },
    ItemEntity: {
      ParticleSystemId: null,
    },
    ItemSoundSetId: "ISS_Items_Ingots",
    DropOnDeath: true,
    MaxStack: maxStack || 25,
  };
};
