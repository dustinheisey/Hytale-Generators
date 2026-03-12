// import type { BlockCfg, HasDrops } from "#hg/index";
// import { builder, fragments, json, lang, meta } from "#hg/index";

// export interface BuildingBlockCfg extends BlockCfg, HasDrops {}

// export const buildingBlock = builder({
//   build: (cfg: BuildingBlockCfg) => {
//     const { modId } = meta();
//     const { withTranslationProperties, withIcon } = fragments;
//     const {
//       id,
//       categories,
//       name,
//       baseName,
//       description,
//       maxStack,
//       color,
//       set,
//       group,
//       resourceType,
//       model,
//       texture,
//       textureOverride,
//       gatherType,
//       transitionTexture,
//       transitionToGroups,
//       particleSetId,
//       dropQuality,
//       dropQuantity,
//       drops
//     } = cfg;
//     json(`Server/Item/Items/Blocks/Building/${id}`, {
//       ...withTranslationProperties(cfg),
//       ...withIcon(cfg),
//       itemLevel: 10,
//       maxStack: maxStack ?? 100,
//       categories: [...(categories ?? ""), `Waste.Blocks`],
//       playerAnimationsId: "Block" as const,
//       ...(set ? { set } : {}),
//       blockType: {
//         material: "Solid" as const,
//         drawType: model ? ("Model" as const) : ("Cube" as const),
//         ...(group ? { group } : {}),
//         ...(model ? { CustomModel: `${model}.blockymodel` } : {}),
//         ...(texture ? { CustomModelTexture: [{ Texture: `${texture}.png`, Weight: 1 }] } : {}),
//         flags: {},
//         gathering: {
//           breaking: {
//             gatherType: gatherType ?? "Rocks",
//             ...(dropQuality ? { quality: dropQuality } : {}),
//             ...(dropQuantity ? { quantity: dropQuantity } : {}),
//             itemId: drops
//           }
//         },
//         blockParticleSetId: particleSetId ?? "Stone",
//         ...(!model
//           ? {
//               textures: textureOverride ?? [
//                 {
//                   all: `BlockTextures/Building/${id}.png`
//                 }
//               ]
//             }
//           : {}),
//         particleColor: color,
//         blockSoundSetId: "Stone",
//         ...(transitionTexture && transitionToGroups
//           ? {
//               transitionTexture,
//               transitionToGroups
//             }
//           : {})
//       },
//       tags: {
//         type: ["Rock"]
//       },
//       ...(resourceType
//         ? {
//             resourceTypes: [
//               {
//                 id: resourceType
//               }
//             ]
//           }
//         : {}),
//       itemSoundSetId: "ISS_Blocks_Stone"
//     });

//     lang({
//       [`items.${modId}.${id}.name`]: name ?? baseName ?? id.replace(/_/g, " "),
//       [`items.${modId}.${id}.description`]: description
//     });
//   }
// });
