import { meta, syncJson, syncLang, syncTexture } from "@meta";
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
      Name: `server.items.unified_materials.Dust_${u(id)}.name`,
      Description: `server.items.unified_materials.Dust_${u(id)}.description`,
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
      TimeSeconds: processingTime || meta.processingTime,
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
export function generateDust(dust: ThingsConfig) {
  if (include("dust", dust)) {
    syncLang({
      name: {
        key: `items.unified_materials.Dust_${u(dust.id)}.name`,
        value: `${dust?.dust?.name || dust.name || u(dust.id)} Dust`,
      },
      description: {
        key: `items.unified_materials.Dust_${u(dust.id)}.description`,
        value: `Can be processed into an <b>${
          u(dust.id)
        } Ingot</b> at a <b>Furnace</b>`,
      },
    });

    syncTexture({
      color: dust?.dust?.color || dust.color,
      inputFile: "assets/dust-mask.png",
      outputFile: `dist/Common/Resources/Dusts/${u(dust.id)}.png`,
    });

    syncJson(
      `Server/Item/Items/Elements/${u(dust.id)}/Dust_${u(dust.id)}`,
      data(dust),
    );
  }
}

/** Generate all dust JSONs */
export function generateDusts(dusts: ThingsConfig[]) {
  dusts.forEach((dust) => generateDust(dust));
}
