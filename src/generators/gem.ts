import { generate, shouldInclude, uppercase } from "@util";

interface GemSchema extends BlockSchema {}

export default function gem(
  name: string,
  config?: Config,
) {
  const json: GemSchema = {
    TranslationProperties: {
      Name: `server.items.Rock_Gem_${uppercase(name)}.name`,
    },
    Categories: config?.categories || [
      "Blocks.Ores",
      "Unified_Materials.Gems",
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
    generate({
      file: `${uppercase(name)}/${uppercase(name)}_Gem`,
      lang: {
        name: `items.Rock_Gem_${uppercase(name)}.name`,
        description: `items.Rock_Gem_${uppercase(name)}.description`,
      },
      name: `${uppercase(name)}`,
      description: config?.description || null,
      options: json,
    });
  }
}
