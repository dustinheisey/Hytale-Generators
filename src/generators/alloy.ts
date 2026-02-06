import { createGenerator, globalConfig, join } from "../index.ts";
import type { IconProperties, ItemEntity, ResourceType, ThingConfig, ThingData } from "../index.types.ts";
import type { Put, RecipeData } from "./recipe.ts";

type AlloyPut = Put & { Name: string };

export interface AlloyConfig extends ThingConfig {
  OutputQuantity?: number;
  TimeSeconds?: number;
  Variant?: "Lightest" | "Light" | "Medium" | "Dark";
  Inputs: AlloyPut[];
  Color: string;
}

interface AlloyData extends ThingData {
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

export const alloy = createGenerator<AlloyConfig, AlloyData>({
  lang: c => {
    const materials = join(c.Inputs.map(Input => Input.Name));
    return [
      {
        key: `items.Unified_Materials.Alloy_${c.Id}.name`,
        value: `${c.Name || c.Id} Ingot`
      },
      {
        key: `items.Unified_Materials.Alloy_${c.Id}.description`,
        value: `Alloy of ${materials}`
      }
    ];
  },
  json: {
    path: c => `Server/Item/Items/Alloys/Alloy_${c.Id}`,
    data: c => ({
      TranslationProperties: {
        Name: `server.items.Unified_Materials.Alloy_${c.Id}.name`,
        Description: `server.items.Unified_Materials.Alloy_${c.Id}.description`
      },
      Categories: c.Categories || ["Items", "Unified_Materials.Alloys"],
      Recipe: {
        Input: c.Inputs,
        BenchRequirement: [
          {
            Type: "Processing",
            Id: "Furnace",
            RequiredTierLevel: 2
          }
        ],
        OutputQuantity: c.OutputQuantity || 2,
        TimeSeconds: c.TimeSeconds || 20
      },
      Model: `Resources/Materials/${c.Model || "Ingot"}.blockymodel`,
      Texture: `Resources/Alloys/${c.Texture || c.Id}.png`,
      ResourceTypes: [
        {
          Id: "Metal_Bars"
        }
      ],
      PlayerAnimationsId: "Item",
      IconProperties: {
        Scale: 1,
        Translation: [0, -3],
        Rotation: [22.5, 45, 22.5]
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
    inputFile: `assets/ingot/ingot-mask-${c.Variant || "medium"}.png`,
    outputFile: `dist/Common/Resources/Alloys/${c.Id}.png`
  })
});

/**
 * Generate all alloy JSONs
 * @param configs - list of alloy config objects
 */
export const alloys = (configs: AlloyConfig[]) => {
  configs.forEach(config => {
    alloy(config);
  });
};
