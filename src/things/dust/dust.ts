import { syncJson, syncLang, syncTexture, meta } from "@meta";
import { include, u } from "@util";

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
      Name: `server.items.Dust_${u(id)}.name`,
      ...(config.description
        ? {
          Description: `server.items.Dust_${u(id)}.description`,
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
          Id: "Salvage_Bench",
          RequiredTierLevel: 1,
        },
      ],
      OutputQuantity: outputQuantity || 2,
      TimeSeconds: processingTime || 14,
    },
    Model: `Resources/Dusts/${model || "Dust"}.blockymodel`,
    Texture: `Resources/Dusts/${texture || u(id)}.png`,
    IconProperties: {
      Scale: 1,
      Rotation: [
        22.5,
        45,
        22.5,
      ],
      Translation: [
        0,
        -3,
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
    MaxStack: maxStack || meta.maxStack,
  };
};

/** Generate a single dust JSON */
export function generateDust(config: ThingsConfig) {
  if (include("dust", config)) {
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

    syncJson(
      `Server/Item/Items/Elements/${u(config.id)}/Dust_${u(config.id)}`,
      data(config),
    );
  }
}

/** Generate all dust JSONs */
export function generateDusts(dusts: ThingsConfig[]) {
  dusts.forEach((dust) => generateDust(dust));
}
