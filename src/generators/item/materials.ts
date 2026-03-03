import type { SetOptional } from "type-fest";
import { global, makeGroup, ItemCfg, json, lang, texture } from "../../index.js";

type MaterialCfg = SetOptional<ItemCfg, "color">;

export const materials = makeGroup<MaterialCfg>()({
  types: [
    { id: "Dust", defaults: {} },
    { id: "Bar", defaults: { baseName: "Ingot" } },
    { id: "Alloy", defaults: { mask: "Bar/Bar" } }
  ],
  build: (cfg: MaterialCfg, spec) => {
    const { modId } = global();

    json(`Server/Item/Items/${spec.id}/Ingredient_${spec.id}_${cfg.id}`, {
      translationProperties: {
        name: `server.items.${modId}.Ingredient_${spec.id}_${cfg.id}.name`,
        description: `server.items.${modId}.Ingredient_${spec.id}_${cfg.id}.description`
      },
      categories: cfg.categories ?? ["Items", `${modId}.${spec.id}s`],
      model: `${cfg.model ?? `Resources/${cfg.baseModel ?? spec.id}`}.blockymodel`,
      texture: `${cfg.texture ?? `Resources/${spec.id}s/${cfg.baseTexture ?? cfg.id}`}.png`,
      ...(cfg.icon ? { icon: `Icons/ItemsGenerated/Ingredient_${spec.id}_${cfg.id}.png` } : {}),
      resourceTypes: [
        {
          id: `${spec.id}s`
        }
      ],
      playerAnimationsId: "Item" as const,
      ...(cfg.quality ? { quality: cfg.quality } : {}),
      ...(cfg.level ? { itemLevel: cfg.level } : {}),
      iconProperties: {
        scale: 1,
        translation: [0, -3],
        rotation: [22.5, 45, 22.5]
      },
      tags: {
        type: ["Ingredient"],
        family: [`${spec.id}s`]
      },
      itemEntity: {
        particleSystemId: undefined
      },
      maxStack: cfg.maxStack ?? 100,
      itemSoundSetId: cfg.sound ?? "ISS_Items_Ingots",
      dropOnDeath: true
    });

    lang([
      {
        key: `items.${modId}.Ingredient_${spec.id}_${cfg.id}.name`,
        value: cfg.name ?? `${cfg.id} ${cfg.baseName ?? spec.id}`
      },
      ...(cfg.description
        ? [
            {
              key: `items.${modId}.Ingredient_${spec.id}_${cfg.id}.description`,
              value: cfg.description ?? cfg.description
            }
          ]
        : [])
    ]);

    if (cfg.color)
      texture({
        color: cfg.color,
        inputFile: cfg.mask ?? `${spec.id}/${spec.id}${cfg.baseMask ? `_${cfg.baseMask}` : ""}`,
        outputFile: cfg.textureOut ?? `Resources/${spec.id}/${cfg.id}`
      });
  }
});