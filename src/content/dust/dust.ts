import { syncJson, syncLang, syncTexture } from "@sync";
import { u } from "@text";

export const data = (config: DustConfig): DustData => {
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

export function generateDust(config: ElementConfig) {
  const description = config?.dust?.description || config.description || null;

  syncLang({
    name: {
      key: `items.Dust_${u(config.id)}.name`,
      value: `${config?.dust?.name || config.name || u(config.id)} Dust`,
    },
    ...(description && {
      description: {
        key: `items.Dust_${u(config.id)}.description`,
        value: description,
      },
    }),
  });

  syncTexture({
    color: config?.dust?.color || config.color,
    inputFile: "assets/dust-mask.png",
    outputFile: `dist/Common/Resources/Dusts/${u(config.id)}.png`,
  });

  syncJson(`Server/Item/Kits/${u(config.id)}/Dust_${u(config.id)}`, data(config));
}
