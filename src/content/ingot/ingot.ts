import { u } from "@text";
import { syncJson, syncLang, syncTexture } from "@sync";
import { include } from "@include";
import { generateRecipe } from "../recipe/recipe.ts";

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
        },
      ],
      OutputQuantity: outputQuantity || 1,
      TimeSeconds: processingTime || 14,
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
    MaxStack: maxStack || 25,
  };
};

export function generateIngot(config: ThingsConfig) {
  if (include("ingot", config)) {
    const description = config?.ingot?.description || config.description ||
      null;

    syncLang({
      name: {
        key: `items.Ingot_${u(config.id)}.name`,
        value: `${config?.ingot?.name || config.name || u(config.id)} Ingot`,
      },
      ...(description && {
        description: {
          key: `items.Ingot_${u(config.id)}.description`,
          value: description,
        },
      }),
    });

    syncTexture({
      color: config?.ingot?.color || config.color,
      inputFile: `assets/ingot/ingot-mask-${
        config?.ingot?.variant || "medium"
      }.png`,
      outputFile: `dist/Common/Resources/Ingots/${u(config.id)}.png`,
    });

    generateRecipe({
      id: `Furnace/Furnace_${u(config.id)}_Dust`,
      bench: "Furnace",
      inputs: [
        {
          ItemId: `Dust_${u(config.id)}`,
          Quantity: 1,
        },
      ],
      outputs: [
        {
          ItemId: `Ingot_${u(config.id)}`,
          Quantity: 1,
        },
      ],
      processingTime: config?.ingot?.processingTime || config.processingTime ||
        15,
    });

    syncJson(
      `Server/Item/Items/Elements/${u(config.id)}/Ingot_${u(config.id)}`,
      data(config),
    );
  }
}
