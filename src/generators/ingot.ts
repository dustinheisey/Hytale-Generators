import { createGenerator, globalConfig, recipe } from "../index.ts";
import type { IconProperties, ItemEntity, ResourceType, ThingConfig, ThingData } from "../index.types.ts";
import type { RecipeData } from "./recipe.ts";

export interface IngotConfig extends ThingConfig {
  OutputQuantity?: number;
  TimeSeconds?: number;
  Variant?: "Lightest" | "Light" | "Medium" | "Dark";
  Color: string;
}

interface IngotData extends ThingData {
  Recipe: Omit<RecipeData, "PrimaryOutput"> & { OutputQuantity: number };
  Model: string;
  Texture: string;
  ResourceTypes: ResourceType[];
  PlayerAnimationsId: string;
  IconProperties: IconProperties;
  ItemEntity: ItemEntity;
  ItemSoundSetId: string;
  DropOnDeath: boolean;
}

export const ingot = createGenerator<IngotConfig, IngotData>({
  lang: c => [
    {
      key: `items.Unified_Materials.Ingot_${c.Id}.name`,
      value: `${c.Name || c.Id} Ingot`
    }
  ],
  json: {
    path: c => `Server/Item/Items/Elements/${c.Id}/Ingot_${c.Id}`,
    data: c => ({
      TranslationProperties: {
        Name: `server.items.Unified_Materials.Ingot_${c.Id}.name`,
        Description: `server.items.Unified_Materials.Ingot_${c.Id}.description`
      },
      Categories: c.Categories || ["Items", "Unified_Materials.Ingots"],
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
            Id: "Furnace",
            RequiredTierLevel: 1
          }
        ],
        OutputQuantity: c.OutputQuantity || 1,
        TimeSeconds: c.TimeSeconds || globalConfig.TimeSeconds
      },
      Model: `Resources/Materials/${c.Model || "Ingot"}.blockymodel`,
      Texture: `Resources/Ingots/${c.Texture || c.Id}.png`,
      ResourceTypes: [
        {
          Id: "Metal_Bars"
        }
      ],
      PlayerAnimationsId: "Item",
      IconProperties: {
        Scale: 1,
        Rotation: [22.5, 45, 22.5],
        Translation: [0, -3]
      },
      Tags: {
        Type: ["Ingredient"],
        Family: ["Metal_Bar"]
      },
      ItemEntity: {
        ParticleSystemId: null
      },
      ItemSoundSetId: "ISS_Items_Ingots",
      DropOnDeath: true,
      MaxStack: c.MaxStack || globalConfig.MaxStack
    })
  },
  texture: c => ({
    color: c.Color,
    inputFile: `src/assets/ingot/ingot-mask-${c.Variant || "medium"}.png`,
    outputFile: `dist/Common/Resources/Ingots/${c.Id}.png`
  }),
  post: c => {
    recipe({
      Id: `Furnace/Furnace_${c.Id}_Dust`,
      Bench: { Id: "Furnace", Tier: 1 },
      Input: [
        {
          ItemId: `Dust_${c.Id}`,
          Quantity: 1
        }
      ],
      Output: [
        {
          ItemId: `Ingot_${c.Id}`,
          Quantity: 1
        }
      ],
      TimeSeconds: c.TimeSeconds || globalConfig.TimeSeconds
    });
  }
});

/**
 * Generate all ingot JSONs
 * @param configs - list of ingot config objects
 */
export const ingots = (configs: IngotConfig[]) => {
  configs.forEach(config => {
    ingot(config);
  });
};
