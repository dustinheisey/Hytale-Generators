// import {
//   withCategories,
//   withIcon,
//   withItemSoundSetId,
//   withPlayerAnimationsId,
//   withStack,
//   withTranslationProperties,
//   builder,
//   json,
//   lang,
// withTags,
// type OreBlockCfg
// } from "@hg";

// export const oreBlock = builder((cfg: OreBlockCfg, { modId }) => {
//   const { id, strata, name, description } = cfg;
//   json(`Server/Item/Items/Ore/${id}/Ore_${id}_${strata}`, [
//     withTranslationProperties(cfg),
//     withCategories(cfg, ["Blocks.Ores", `${modId}.Ores`]),
//     withIcon(cfg, "Ore"),
//     {
//       blockType: {
//         material: "Solid" as const,
//         drawType: "CubeWithModel" as const,
//         customModel: `Resources/Ores/${model ?? "Ore_Large"}.blockymodel`,
//         customModelTexture: [
//           {
//             texture: `Resources/Ores/${texture ?? id}.png`,
//             weight: 1
//           }
//         ],
//         group: "Stone",
//         flags: {},
//         randomRotation: "YawStep90" as const,
//         gathering: {
//           breaking: {
//             gatherType: "OreIron",
//             dropList: {
//               container: {
//                 type: "Multiple" as const,
//                 containers: [
//                   ...(drops
//                     ? spreadItems(drops, drop => ({
//                         type: "Single" as const,
//                         item: { drop }
//                       }))
//                     : [
//                         {
//                           type: "Single" as const,
//                           item: { itemId: `Ore_${id}` }
//                         }
//                       ]),
//                   {
//                     type: "Single" as const,
//                     item: {
//                       itemId: `Rock_${strata}_Cobble`
//                     }
//                   }
//                 ] as const
//               }
//             }
//           }
//         },
//         blockParticleSetId: "Ore",
//         textures: [computeBlockTexture(strata)],
//         blockSoundSetId: "Ore",
//         particleColor: color
//       }
//     },
//     withPlayerAnimationsId("Block"),
//     withTags(cfg),
//     withStack(cfg),
//     withItemSoundSetId(cfg)
//   ]);

//   lang(`items.${modId}.Ore_${id}_${strata}.name`, name ?? `${baseName ?? id} Ore - ${strata}`, description);
// });
