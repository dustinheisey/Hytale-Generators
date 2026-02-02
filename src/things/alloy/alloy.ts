import { join, u } from "@util";
import { meta, syncJson, syncLang, syncTexture } from "@meta";

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
      Name: `server.items.unified_materials.Alloy_${u(id)}.name`,
      Description: `server.items.unified_materials.Alloy_${u(id)}.description`,
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
      TimeSeconds: processingTime || 20,
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
  const materials = join(alloy.inputs.map((input) => input.name!));

  syncLang({
    name: {
      key: `items.unified_materials.Alloy_${u(alloy.id)}.name`,
      value: `${alloy.name || u(alloy.id)} Ingot`,
    },
    description: {
      key: `items.unified_materials.Alloy_${u(alloy.id)}.description`,
      value: `Alloy of ${materials}`,
    },
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
