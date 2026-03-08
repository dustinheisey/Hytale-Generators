import type { BlockCfg, BlockTexture, HasDrops, HasStrata, Strata } from "#hg/index";
import { builder, global, json, lang, spreadItems } from "#hg/index";

export type OreBlockCfg = BlockCfg & HasDrops & HasStrata;

function computeBlockTexture(block: Strata): BlockTexture {
  let texture;
  switch (block) {
    case "Sandstone":
      texture = {
        weight: 1,
        sides: "BlockTextures/Rock_Sandstone_Side.png",
        upDown: "BlockTextures/Rock_Sandstone_Top.png"
      };
      break;
    case "Shale":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Shale.png"
      };
      break;
    case "Stone":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Stone.png"
      };
      break;
    case "Slate":
      texture = {
        sides: "BlockTextures/Rock_Slate_Cracked.png",
        upDown: "BlockTextures/Rock_Slate_Cracked.png",
        weight: 1
      };
      break;
    case "Volcanic":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Volcanic.png"
      };
      break;
    case "Basalt":
      texture = {
        weight: 1,
        all: "BlockTextures/Rock_Basalt.png"
      };
      break;
  }
  return texture;
}

export const oreBlock = builder({
  init: (id: string) => ({ id }),
  build: (cfg: OreBlockCfg) => {
    const { modId } = global();
    json(`Server/Item/Items/Ore/${cfg.id}/Ore_${cfg.id}_${cfg.strata}`, {
      translationProperties: {
        name: `server.items.${modId}.Ore_${cfg.id}_${cfg.strata}.name`,
        description: `server.items.${modId}.Ore_${cfg.id}_${cfg.strata}.description`
      },
      categories: cfg.categories ?? ["Blocks.Ores", `${modId}.Ores`],
      ...(cfg.icon ? { icon: `Icons/ItemsGenerated/Ore_${cfg.id}_${cfg.strata}.png` } : {}),
      blockType: {
        material: "Solid" as const,
        drawType: "CubeWithModel" as const,
        customModel: `Resources/Ores/${cfg.model ?? "Ore_Large"}.blockymodel`,
        customModelTexture: [
          {
            texture: `Resources/Ores/${cfg.texture ?? cfg.id}.png`,
            weight: 1
          }
        ],
        group: "Stone",
        flags: {},
        randomRotation: "YawStep90" as const,
        gathering: {
          breaking: {
            gatherType: "OreIron",
            dropList: {
              container: {
                type: "Multiple" as const,
                containers: [
                  ...(cfg.drops
                    ? spreadItems(cfg.drops, drop => ({
                        type: "Single" as const,
                        item: { drop }
                      }))
                    : [
                        {
                          type: "Single" as const,
                          item: { itemId: `Ore_${cfg.id}` }
                        }
                      ]),
                  {
                    type: "Single" as const,
                    item: {
                      itemId: `Rock_${cfg.strata}_Cobble`
                    }
                  }
                ] as const
              }
            }
          }
        },
        blockParticleSetId: "Ore",
        textures: [computeBlockTexture(cfg.strata)],
        blockSoundSetId: "Ore",
        particleColor: cfg.color
      },
      playerAnimationsId: "Block" as const,
      tags: {
        Type: ["Ore"],
        Family: ["Cobalt"]
      },
      maxStack: cfg.maxStack || 100,
      itemSoundSetId: "ISS_Blocks_Stone"
    });

    lang({
      [`items.${modId}.Ore_${cfg.id}_${cfg.strata}.name`]: cfg.name ?? `${cfg.baseName ?? cfg.id} Ore - ${cfg.strata}`,
      [`items.${modId}.Ore_${cfg.id}_${cfg.strata}.description`]: cfg.description
    });
  }
});
