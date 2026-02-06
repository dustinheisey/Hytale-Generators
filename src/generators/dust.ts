import type { IconProperties, ItemEntity, RecipeData, ResourceType, ThingConfig, ThingData } from "../index.js";
import { createGenerator, global } from "../index.js";

export interface DustConfig extends ThingConfig {
  Color: string;
  OutputQuantity?: number;
  TimeSeconds?: number;
}

interface DustData extends ThingData {
  Recipe: Omit<RecipeData, "PrimaryOutput"> & { OutputQuantity: number };
  Model: string;
  Texture: string;
  ResourceTypes: ResourceType[];
  PlayerAnimationsId: string;
  IconProperties: IconProperties;
  ItemEntity: ItemEntity;
  DropOnDeath: boolean;
}

export const dust = createGenerator<DustConfig, DustData>({
  lang: c => {
    return [
      {
        key: `items.${global().ModId}.Dust_${c.Id}.name`,
        value: `${c.Name || c.Id} Dust`
      },
      {
        key: `items.${global().ModId}.Dust_${c.Id}.description`,
        value: `Can be processed into an <b>${c.Id} Ingot</b> at a <b>Furnace</b>`
      }
    ];
  },
  json: {
    path: c => `Server/Item/Items/Elements/${c.Id}/Dust_${c.Id}`,
    data: c => {
      const g = global();
      return {
        TranslationProperties: {
          Name: `server.items.${global().ModId}.Dust_${c.Id}.name`,
          Description: `server.items.${global().ModId}.Dust_${c.Id}.description`
        },
        Categories: c.Categories || ["Items"],
        Recipe: {
          Input: [
            {
              ItemId: `Ore_${c.Id}`,
              Quantity: 1
            }
          ],
          BenchRequirement: [
            {
              Type: "Processing",
              Id: "Salvage_Bench",
              RequiredTierLevel: 1
            }
          ],
          OutputQuantity: c.OutputQuantity || 2,
          TimeSeconds: c.TimeSeconds || g.TimeSeconds
        },
        Model: `Resources/Dusts/${c.Model || "Dust"}.blockymodel`,
        Texture: `Resources/Dusts/${c.Texture || c.Id}.png`,
        IconProperties: {
          Scale: 1,
          Rotation: [22.5, 45, 22.5],
          Translation: [0, -3]
        },
        ResourceTypes: [
          {
            Id: "Dusts"
          }
        ],
        PlayerAnimationsId: "Item",
        Tags: {
          Type: ["Ingredient"],
          Family: ["Dust"]
        },
        ItemEntity: {
          ParticleSystemId: null
        },
        DropOnDeath: true,
        MaxStack: c.MaxStack || g.MaxStack
      };
    }
  },
  texture: c => ({
    color: c.Color,
    inputFile: "src/assets/dust-mask.png",
    outputFile: `dist/Common/Resources/Dusts/${c.Id}.png`
  })
});

/**
 * Generate all dust JSONs
 * @param configs - list of dust config objects
 */
export const dusts = (configs: DustConfig[]) => {
  configs.forEach(config => {
    dust(config);
  });
};
