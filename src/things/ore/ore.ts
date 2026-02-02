import { include, u } from "@util";
import { meta, syncJson, syncLang, syncTexture } from "@meta";
import { generateResourceType } from "@content";

export const data = (config: OreConfig): OreData => {
  const {
    id,
    categories,
    processingTime,
    model,
    texture,
    itemLevel,
    maxStack,
  } = config;
  return {
    TranslationProperties: {
      Name: `server.items.unified_materials.Ore_${u(id)}.name`,
      Description: `server.items.unified_materials.Ore_${u(id)}.description`,
    },
    Categories: categories || [
      "Blocks.Ores",
      "Unified_Materials.Ores",
    ],
    Recipe: {
      Input: [
        {
          ResourceTypeId: `Salvage_${u(id)}`,
          Quantity: 1,
        },
      ],
      BenchRequirement: [
        {
          Type: "Processing",
          Id: "Salvage_Bench",
          RequiredTierLevel: 1,
        },
      ],
      TimeSeconds: processingTime || 4,
    },
    Model: `Resources/Ores/${model || "Ore_Large"}.blockymodel`,
    Texture: `Resources/Ores/${texture || u(id)}.png`,
    ItemLevel: itemLevel || 10,
    PlayerAnimationsId: "Block",
    IconProperties: {
      Scale: 0.58823,
      Rotation: [
        22.5,
        45,
        22.5,
      ],
      Translation: [
        0,
        -13.5,
      ],
    },
    Tags: {
      Type: [
        "Ore",
      ],
    },
    ItemEntity: {
      ParticleSystemId: null,
    },
    MaxStack: maxStack || meta.maxStack,
    ItemSoundSetId: "ISS_Blocks_Stone",
    DropOnDeath: true,
  };
};

/** Generate a single ore JSON */
export function generateOre(ore: ThingsConfig) {
  if (include("ore", ore)) {
    syncLang({
      name: {
        key: `items.unified_materials.Ore_${u(ore.id)}.name`,
        value: `${
          ore?.ore?.name || ore?.ores?.name || ore.name ||
          u(ore.id)
        } Ore`,
      },
      description: {
        key: `items.unified_materials.Ore_${u(ore.id)}.description`,
        value: `Can be processed into an <b>${
          u(ore.id)
        } Ingot</b> at a <b>Furnace</b>, or ground into <b>${
          u(ore.id)
        } Dust</b> at a <b>Salvager's Workbench</b>`,
      },
    });

    generateResourceType({ id: `Salvage_${ore.id}`, icon: "rock" });

    syncTexture({
      color: ore?.ore?.color || ore?.ores?.color || ore.color,
      inputFile: "assets/ore-mask.png",
      outputFile: `dist/Common/Resources/Ores/${u(ore.id)}.png`,
    });

    syncJson(
      `Server/Item/Items/Elements/${u(ore.id)}/Ore_${u(ore.id)}`,
      data(ore),
    );
  }
}

/** Generate all ore JSONs */
export function generateOres(ores: ThingsConfig[]) {
  ores.forEach((ore) => generateOre(ore));
}
