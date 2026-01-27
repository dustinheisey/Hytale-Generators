import * as fs from "node:fs";
import { uppercase } from "./util.ts";

type Config = {
  description?: boolean;
  model?: string;
  texture?: string;
  categories?: string[];
  particleColor?: string;
  lightColor?: string;
  sparksColor?: string;
  benchRequirement?: {
    Type: "Processing" | "Crafting";
    Id: string;
  };
  outputQuantity?: number;
  processingTime?: number;
  itemLevel?: number;
  include?: Filter[];
  exclude?: Filter[];
};

type Filter =
  | "ingot"
  | "gem"
  | "ore"
  | "ore_stone"
  | "ore_basalt"
  | "ore_sandstone"
  | "ore_slate"
  | "ore_shale"
  | "ore_volcanic";

type BlockType =
  | "stone"
  | "basalt"
  | "sandstone"
  | "slate"
  | "shale"
  | "volcanic";

function generate(file: string, config: object) {
  fs.writeFile(`dist/${file}.json`, JSON.stringify(config), (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log(`${file}.json written successfully`);
  });
}

function shouldInclude(
  filter: Filter,
  config?: Config,
): boolean {
  if (config) {
    if (config.include && config.include?.includes(filter)) return true;
    if (config.exclude && !config.exclude?.includes(filter)) return true;
    if (!config.include && !config.exclude) return true;
    return false;
  }
  return true;
}

function ingot(
  name: string,
  config?: Config,
) {
  const json: IngotSchema = {
    TranslationProperties: {
      Name: `server.items.Ingredient_Bar_${uppercase(name)}.name`,
    },
    Model: `Resources/Materials/${config?.model || "Ingot"}.blockymodel`,
    Texture: `Resources/Materials/Ingot_Textures/${
      config?.texture || uppercase(name)
    }.png`,
    Categories: config?.categories || [
      "Items",
    ],
    Recipe: {
      Input: [
        {
          ItemId: `Ore_${uppercase(name)}`,
          Quantity: 1,
        },
      ],
      BenchRequirement: config?.benchRequirement ? [config.benchRequirement] : [
        {
          Type: "Processing",
          Id: "Furnace",
        },
      ],
      OutputQuantity: config?.outputQuantity || 1,
      TimeSeconds: config?.processingTime || 10,
    },
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
    },
    ItemEntity: {
      ParticleSystemId: null,
    },
    ItemSoundSetId: "ISS_Items_Ingots",
    DropOnDeath: true,
  };

  if (config?.description) {
    json.TranslationProperties.Description = `server.items.Ingredient_Bar_${
      uppercase(name)
    }.description`;
  }

  if (shouldInclude("ingot", config)) {
    generate(`${uppercase(name)}/Ingredient_Bar_${uppercase(name)}`, json);
  }
}

function gem(
  name: string,
  config?: Config,
) {
  const json: GemSchema = {
    TranslationProperties: {
      Name: `server.items.Rock_Gem_${uppercase(name)}.name`,
    },
    Categories: config?.categories || [
      "Blocks.Ores",
    ],
    PlayerAnimationsId: "Block",
    BlockType: {
      Material: "Solid",
      DrawType: "Model",
      Opacity: "Transparent",
      CustomModel: `Resources/Ores/${config?.model || "Gem"}.blockymodel`,
      CustomModelTexture: [
        {
          Texture: `Resources/Ores/Gem_Textures/${
            config?.texture || uppercase(name)
          }.png`,
          Weight: 1,
        },
      ],
      Group: "Stone",
      Flags: {},
      Gathering: {
        Breaking: {
          GatherType: "Rocks",
        },
      },
      VariantRotation: "DoublePipe",
      RandomRotation: "YawStep90",
      BlockParticleSetId: "Crystal",
      ParticleColor: config?.particleColor || "#000000",
      BlockSoundSetId: "Gem",
      AmbientSoundEventId: "SFX_Gem_Emit_Loop",
      Light: {
        Color: config?.lightColor || "#000000",
        Radius: 0,
      },
      Particles: [
        {
          Color: config?.sparksColor || "#000000",
          SystemId: "Block_Gem_Sparks",
        },
      ],
    },
    Tags: {
      Type: [
        "Rock",
      ],
      Family: [
        "Gem",
      ],
    },
    ItemSoundSetId: "ISS_Blocks_Stone",
    DropOnDeath: true,
  };

  if (config?.description) {
    json.TranslationProperties.Description = `server.items.Gem_${
      uppercase(name)
    }.description`;
  }

  if (shouldInclude("gem", config)) {
    generate(`${uppercase(name)}/${uppercase(name)}_Gem`, json);
  }
}

function ore(
  name: string,
  config?: Config,
) {
  const json: OreSchema = {
    TranslationProperties: {
      Name: `server.items.Ore_${uppercase(name)}.name`,
    },
    Categories: config?.categories || [
      "Items",
    ],
    Recipe: {
      Input: [
        {
          ResourceTypeId: `Salvage_${uppercase(name)}`,
          Quantity: 1,
        },
      ],
      BenchRequirement: [
        {
          Type: "Processing",
          Id: "Salvagebench",
        },
      ],
      TimeSeconds: config?.processingTime || 4,
    },
    Model: `Resources/Ores/${config?.model || "Ore_Large"}.blockymodel`,
    Texture: `Resources/Ores/Ore_Textures/${
      config?.texture || uppercase(name)
    }.png`,
    ItemLevel: config?.itemLevel || 5,
    PlayerAnimationsId: "Block",
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
        "Ore",
      ],
    },
    ItemEntity: {
      ParticleSystemId: null,
    },
    MaxStack: 25,
    ItemSoundSetId: "ISS_Blocks_Stone",
    DropOnDeath: true,
  };

  if (config?.description) {
    json.TranslationProperties.Description = `server.items.Ore_${
      uppercase(name)
    }.description`;
  }

  if (shouldInclude("ore", config)) {
    generate(`${uppercase(name)}/${uppercase(name)}_Ore`, json);
  }
}

function oreBlock(
  name: string,
  type: BlockType,
  config?: Config,
) {
  const json: OreBlockSchema = {
    TranslationProperties: {
      Name: `server.items.Ore_${uppercase(name)}_${uppercase(type)}.name`,
    },
    Categories: [
      "Blocks.Ores",
    ],
    BlockType: {
      Material: "Solid",
      DrawType: "CubeWithModel",
      CustomModel: "Resources/Ores/Ore_Large.blockymodel",
      CustomModelTexture: [
        {
          Texture: `Resources/Ores/Ore_Textures/${uppercase(name)}.png`,
          Weight: 1,
        },
      ],
      Group: uppercase(type),
      Flags: {},
      RandomRotation: "YawStep90",
      Gathering: {
        Breaking: {
          GatherType: `Ore${uppercase(name)}`,
          DropList: {
            Container: {
              Type: "Multiple",
              Containers: [
                {
                  Type: "Single",
                  Item: {
                    ItemId: `Ore_${uppercase(name)}`,
                  },
                },
                {
                  Type: "Single",
                  Item: {
                    ItemId: `Rock_${uppercase(type)}_Cobble`,
                  },
                },
              ],
            },
          },
        },
      },
      BlockParticleSetId: "Ore",
      Textures: [
        {
          Weight: 1,
          All: `BlockTextures/Rock_${uppercase(type)}.png`,
        },
      ],
      ParticleColor: config?.particleColor || "#000000",
      BlockSoundSetId: "Ore",
    },
    PlayerAnimationsId: "Block",
    Tags: {
      Type: [
        "Ore",
      ],
      Family: [
        "Gold",
      ],
    },
    MaxStack: 25,
    ItemSoundSetId: "ISS_Blocks_Stone",
  };

  if (config?.description) {
    json.TranslationProperties.Description = `server.items.Ore_${
      uppercase(name)
    }_${uppercase(type)}.description`;
  }

  if (shouldInclude(`ore_${type}`, config)) {
    generate(`${uppercase(name)}/Ore_${uppercase(name)}_${type}`, json);
  }
}

function kits(kits: { id: string; config?: Config }[]) {
  kits.forEach((kit) => {
    ingot(kit.id, kit.config);
    gem(kit.id, kit.config);
    ore(kit.id, kit.config);
    oreBlock(kit.id, "stone", kit.config);
    oreBlock(kit.id, "basalt", kit.config);
    oreBlock(kit.id, "sandstone", kit.config);
    oreBlock(kit.id, "shale", kit.config);
    oreBlock(kit.id, "slate", kit.config);
    oreBlock(kit.id, "volcanic", kit.config);
  });
}

kits([
  {
    id: "acanthite",
    config: {
      particleColor: "#324134",
      lightColor: "#453",
      sparksColor: "#435",
      processingTime: 30,
    },
  },
  { id: "malachite" },
]);
