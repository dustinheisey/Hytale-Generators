import { include, u } from "@util";
import { syncJson, syncLang, syncTexture, meta } from "@meta";
import { generateRecipe } from "@content";

export const data = (config: IngotConfig): IngotData => {
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
      Name: `server.items.Ingot_${u(id)}.name`,
      ...(config.description
        ? { Description: `server.items.Ingot_${u(id)}.description` }
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
          RequiredTierLevel: 1,
        },
      ],
      OutputQuantity: outputQuantity || 1,
      TimeSeconds: processingTime || meta.processingTime,
    },
    Model: `Resources/Materials/${model || "Ingot"}.blockymodel`,
    Texture: `Resources/Ingots/${texture || u(id)}.png`,
    ResourceTypes: [
      {
        Id: "Metal_Bars",
      },
    ],
    PlayerAnimationsId: "Item",
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
    MaxStack: maxStack || meta.maxStack,
  };
};

/** Generate a single ingot JSON */
export function generateIngot(ingot: ThingsConfig) {
  if (include("ingot", ingot)) {
    const description = ingot?.ingot?.description || ingot.description ||
      null;

    syncLang({
      name: {
        key: `items.Ingot_${u(ingot.id)}.name`,
        value: `${ingot?.ingot?.name || ingot.name || u(ingot.id)} Ingot`,
      },
      ...(description && {
        description: {
          key: `items.Ingot_${u(ingot.id)}.description`,
          value: description,
        },
      }),
    });

    syncTexture({
      color: ingot?.ingot?.color || ingot.color,
      inputFile: `assets/ingot/ingot-mask-${
        ingot?.ingot?.variant || "medium"
      }.png`,
      outputFile: `dist/Common/Resources/Ingots/${u(ingot.id)}.png`,
    });

    generateRecipe({
      id: `Furnace/Furnace_${u(ingot.id)}_Dust`,
      bench: "Furnace",
      tier: 1,
      inputs: [
        {
          ItemId: `Dust_${u(ingot.id)}`,
          Quantity: 1,
        },
      ],
      outputs: [
        {
          ItemId: `Ingot_${u(ingot.id)}`,
          Quantity: 1,
        },
      ],
      processingTime: ingot?.ingot?.processingTime || ingot.processingTime ||
        meta.processingTime,
    });

    syncJson(
      `Server/Item/Items/Elements/${u(ingot.id)}/Ingot_${u(ingot.id)}`,
      data(ingot),
    );
  }
}

/** Generate all ingot JSONs */
export function generateIngots(ingots: ThingsConfig[]) {
  ingots.forEach((ingot) => generateIngot(ingot));
}
