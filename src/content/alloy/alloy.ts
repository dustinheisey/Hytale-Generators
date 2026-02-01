import { u } from "@text";
import { syncJson, syncLang, syncTexture } from "@sync";

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
          Type: "Crafting",
          Id: "Workbench",
        },
      ],
      OutputQuantity: outputQuantity || 2,
      TimeSeconds: processingTime || 10,
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
    MaxStack: maxStack || 25,
  };
};

export function generateAlloy(config: AlloyConfig) {
  const description = config.description || null;

  syncLang({
    name: {
      key: `items.Alloy_${u(config.id)}.name`,
      value: `${config.name || u(config.id)} Ingot`,
    },
    ...(description && {
      description: {
        key: `items.Alloy_${u(config.id)}.description`,
        value: description,
      },
    }),
  });

  syncTexture({
    color: config.color,
    inputFile: `assets/ingot/ingot-mask-${config.variant || "medium"}.png`,
    outputFile: `dist/Common/Resources/Alloys/${u(config.id)}.png`,
  });

  syncJson(
    `Server/Item/Alloys/Alloy_${u(config.id)}`,
    data(config),
  );
}
