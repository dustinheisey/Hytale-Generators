import { createGenerator, globalConfig, resourceType } from "../index.ts";
import type { IconProperties, ItemEntity, ThingConfig, ThingData } from "../index.types.ts";
import type { RecipeData } from "./recipe.ts";

export interface OreConfig extends ThingConfig {
  TimeSeconds?: number;
  OutputQuantity?: number;
  ItemLevel?: number;
  Color: string;
}

interface OreData extends ThingData {
  Recipe: Partial<RecipeData>;
  Model: string;
  Texture: string;
  ItemLevel: number;
  PlayerAnimationsId: string;
  IconProperties: IconProperties;
  ItemEntity: ItemEntity;
  ItemSoundSetId: string;
  DropOnDeath: boolean;
}

export const ore = createGenerator<OreConfig, OreData>({
  lang: c => [
    {
      key: `items.Unified_Materials.Ore_${c.Id}.name`,
      value: `${c.Name || c.Id} Ore`
    },
    {
      key: `items.Unified_Materials.Ore_${c.Id}.description`,
      value: `Can be processed into an <b>${c.Id} Ingot</b> at a <b>Furnace</b>, or ground into <b>${c.Id} Dust</b> at a <b>Salvager's Workbench</b>`
    }
  ],
  json: {
    path: c => `Server/Item/Items/Elements/${c.Id}/Ore_${c.Id}`,
    data: c => ({
      TranslationProperties: {
        Name: `server.items.Unified_Materials.Ore_${c.Id}.name`,
        Description: `server.items.Unified_Materials.Ore_${c.Id}.description`
      },
      Categories: c.Categories || ["Blocks.Ores", "Unified_Materials.Ores"],
      Recipe: {
        Input: [
          {
            ResourceTypeId: `Salvage_${c.Id}`,
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
        TimeSeconds: c.TimeSeconds || globalConfig.TimeSeconds
      },
      Model: `Resources/Ores/${c.Model || "Ore_Large"}.blockymodel`,
      Texture: `Resources/Ores/${c.Texture || c.Id}.png`,
      ItemLevel: c.ItemLevel || 10,
      PlayerAnimationsId: "Block",
      IconProperties: {
        Scale: 0.58823,
        Rotation: [22.5, 45, 22.5],
        Translation: [0, -13.5]
      },
      Tags: {
        Type: ["Ore"]
      },
      ItemEntity: {
        ParticleSystemId: null
      },
      MaxStack: c.MaxStack || globalConfig.MaxStack,
      ItemSoundSetId: "ISS_Blocks_Stone",
      DropOnDeath: true
    })
  },
  texture: c => ({
    color: c.Color,
    inputFile: "src/assets/ore-mask.png",
    outputFile: `dist/Common/Resources/Ores/${c.Id}.png`
  }),
  post: c => {
    resourceType({ Id: `Salvage_${c.Id}`, Icon: "Rock" });
  }
});

/**
 * Generate all ore JSONs
 * @param configs - list of ore config objects
 */
export const ores = (configs: OreConfig[]) => {
  configs.forEach(config => {
    ore(config);
  });
};
