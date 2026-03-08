import type { HasIcon, HasId, ItemCfg } from "#hg/index";
import { global, json, lang, makeGroup, texture, u } from "#hg/index";
import type { SetOptional } from "type-fest";

export type MaterialCfg = SetOptional<ItemCfg, "color"> & HasId & HasIcon;

export const materials = makeGroup<MaterialCfg>()({
  types: [
    { id: "Dust", defaults: {} },
    { id: "Bar", defaults: { baseName: "Ingot", baseModel: "Ingot", resourceType: "Metal_Bars" } },
    {
      id: "Alloy",
      defaults: { id: "Bar", mask: "Bars/Bar", baseName: "Ingot", baseModel: "Ingot", resourceType: "Metal_Bars" }
    }
  ] as const,
  build: (cfg: MaterialCfg, spec) => {
    const { modId } = global();

    json(`Server/Item/Items/${spec.id}s/Ingredient_${spec.defaults.id ?? spec.id}_${cfg.id}`, {
      translationProperties: {
        name: `server.items.${modId}.Ingredient_${spec.defaults.id ?? spec.id}_${cfg.id}.name`,
        description: `server.items.${modId}.Ingredient_${spec.defaults.id ?? spec.id}_${cfg.id}.description`
      },
      categories: cfg.categories ?? ["Items", `${modId}.${spec.id}s`],
      model: `${cfg.model ?? `Items/${cfg.baseModel ?? spec.id}`}.blockymodel`,
      texture: `${cfg.texture ?? `Items/${spec.id}s/${cfg.baseTexture ?? cfg.id}`}.png`,
      ...(cfg.icon ? { icon: `Icons/ItemsGenerated/Ingredient_${cfg.baseIconPath ?? spec.id}_${cfg.id}.png` } : {}),
      resourceTypes: [
        {
          id: spec.defaults.resourceType ?? cfg.resourceType ?? `${spec.id}s`
        }
      ],
      playerAnimationsId: "Item" as const,
      ...(cfg.quality ? { quality: cfg.quality } : {}),
      ...(cfg.level ? { itemLevel: cfg.level } : {}),
      IconProperties: cfg.iconProperties ?? {
        Scale: 1,
        Translation: [0, -3],
        Rotation: [22.5, 45, 22.5]
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
        key: `items.${modId}.Ingredient_${spec.defaults.id ?? spec.id}_${cfg.id}.name`,
        value:
          cfg.name?.replace(/_/g, " ") ??
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          `${cfg.id?.replace(/_/g, " ")} ${cfg.baseName?.replace(/_/g, " ") ?? spec.id.replace(/_/g, " ")}`
      },
      ...(cfg.description
        ? [
            {
              key: `items.${modId}.Ingredient_${spec.defaults.id ?? spec.id}_${cfg.id}.description`,
              value: cfg.description ?? cfg.description
            }
          ]
        : [])
    ]);

    if (cfg.color)
      texture(
        cfg.color,
        cfg.mask ?? `${spec.id}s/${spec.id}${cfg.baseMask ? `_${u(cfg.baseMask)}` : ""}`,
        cfg.textureOut ?? `Items/${spec.id}s/${cfg.id}`
      );
  }
});
