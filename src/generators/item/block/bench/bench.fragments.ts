// import { type HasId, type HasGroup, type HasModel, type HasTexture, ifDefined } from "@";

// export const withBlockType = (cfg: HasId & HasGroup & HasModel & HasTexture) => {
//   const { model, group, id, texture } = cfg;
//   const ifGroup = group ? `${group}/` : "";
//   return {
//     blockType: {
//       material: "Solid" as const,
//       drawType: "Model" as const,
//       opacity: "Transparent" as const,
//       customModel: model || `Blocks/${ifGroup}${id}.blockymodel`,
//       customModelTexture: texture || [
//         {
//           texture: `Blocks/${ifGroup}${id}.png`,
//           weight: 1
//         }
//       ],
//       variantRotation: "NESW",
//       ...withBench(cfg),
//       state: {
//         id: "processingBench"
//       },
//       gathering: {
//         breaking: {
//           gatherType: "Benches",
//           dropList: {
//             container: {
//               type: "Multiple" as const,
//               containers: [
//                 {
//                   type: "Single" as const,
//                   item: { itemId: id }
//                 }
//               ] as const
//             }
//           }
//         }
//       },
//       hitboxType: id,
//       blockParticleSetId: "Wood",
//       particleColor: "#6e4a2f",
//       support: {
//         down: [
//           {
//             faceType: "Full"
//           }
//         ]
//       },
//       blockSoundSetId: "Stone",
//       interactions: {
//         use: "Open_Processing_Bench"
//       }
//     }
//   };
// };

// export const withBench = ({ filterValidIngredients, outputSlotsCount, id }: HasId & HasBench) => ({
//   bench: {
//     type: "Processing",
//     input: [
//       {
//         filterValidIngredients
//       }
//     ],
//     localOpenSoundEventId: "SFX_Workbench_Open",
//     localCloseSoundEventId: "SFX_Workbench_Close",
//     completedSoundEventId: "SFX_Workbench_Craft",
//     failedSoundEventId: "SFX_Generic_Crafting_Failed",
//     benchUpgradeSoundEventId: "SFX_Workbench_Upgrade_Start_Default",
//     benchUpgradeCompletedSoundEventId: "SFX_Workbench_Upgrade_Complete_Default",
//     outputSlotsCount: outputSlotsCount || 6,
//     id: id
//   }
// });
