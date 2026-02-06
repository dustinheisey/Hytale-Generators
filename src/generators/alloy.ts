import type { IconProperties, ItemEntity, Put, RecipeData, ResourceType, ThingConfig, ThingData } from "../index.js";
import { createGenerator, global, join } from "../index.js";

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
    const materials = join(c.Inputs.map(input => input.Name));

    return [
      {
        key: `items.${global().ModId}.Alloy_${c.Id}.name`,
        value: `${c.Name || c.Id} Ingot`
      },
      {
        key: `items.${global().ModId}.Alloy_${c.Id}.description`,
        value: `Alloy of ${materials}`
      }
    ];
  },

  json: {
    path: c => `Server/Item/Items/Alloys/Alloy_${c.Id}`,
    data: c => {
      const g = global();
      return {
        TranslationProperties: {
          Name: `server.items.${global().ModId}.Alloy_${c.Id}.name`,
          Description: `server.items.${global().ModId}.Alloy_${c.Id}.description`
        },
        Categories: c.Categories || ["Items"],
        Recipe: {
          Input: c.Inputs,
          BenchRequirement: [{ Type: "Processing", Id: "Furnace", RequiredTierLevel: 2 }],
          OutputQuantity: c.OutputQuantity || 2,
          TimeSeconds: c.TimeSeconds || 20
        },
        Model: `Resources/Materials/${c.Model || "Ingot"}.blockymodel`,
        Texture: `Resources/Alloys/${c.Texture || c.Id}.png`,
        ResourceTypes: [{ Id: "Metal_Bars" }],
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
        ItemEntity: { ParticleSystemId: null },
        ItemSoundSetId: "ISS_Items_Ingots",
        DropOnDeath: true,
        MaxStack: c.MaxStack || g.MaxStack
      };
    }
  },

  texture: c => ({
    color: c.Color,
    inputFile: `src/assets/ingot/ingot-mask-${(c.Variant || "Medium").toLowerCase()}.png`,
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
