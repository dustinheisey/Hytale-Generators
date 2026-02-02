import { u } from "@util";
import { syncJson, syncLang, syncTexture, meta } from "@meta";

export const data = (config: AlloyConfig): AlloyData => {
  const {
    id,
    categories,
    outputQuantity,
    processingTime,
    model,
    texture,
    maxStack,
    inputs,
  } = config;

  return {
    TranslationProperties: {
      Name: `server.items.Alloy_${u(id)}.name`,
      ...(config.description
        ? { Description: `server.items.Alloy_${u(id)}.description` }
        : ""),
    },
    Categories: categories || [
      "Items",
      "Unified_Materials.Alloys",
    ],
    Recipe: {
      Input: inputs,
      BenchRequirement: [
        {
          Type: "Processing",
          Id: "Furnace",
          RequiredTierLevel: 2,
        },
      ],
      OutputQuantity: outputQuantity || 2,
      TimeSeconds: processingTime || meta.processingTime,
    },
    Model: `Resources/Materials/${model || "Ingot"}.blockymodel`,
    Texture: `Resources/Alloys/${texture || u(id)}.png`,
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
    MaxStack: maxStack || meta.maxStack,
  };
};

/** Generate a single alloy JSON */
export function generateAlloy(alloy: AlloyConfig) {
  const description = alloy.description || null;

  syncLang({
    name: {
      key: `items.Alloy_${u(alloy.id)}.name`,
      value: `${alloy.name || u(alloy.id)} Ingot`,
    },
    ...(description && {
      description: {
        key: `items.Alloy_${u(alloy.id)}.description`,
        value: description,
      },
    }),
  });

  syncTexture({
    color: alloy.color,
    inputFile: `assets/ingot/ingot-mask-${alloy.variant || "medium"}.png`,
    outputFile: `dist/Common/Resources/Alloys/${u(alloy.id)}.png`,
  });

  syncJson(
    `Server/Item/Items/Alloys/Alloy_${u(alloy.id)}`,
    data(alloy),
  );
}

/** Generate all alloy JSONs */
export function generateAlloys(alloys: AlloyConfig[]) {
  alloys.forEach((alloy) => generateAlloy(alloy));
}
