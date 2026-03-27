// import type { HasId } from "@";

// export const withBlockType = cfg => {
//   return {
//     blockType: {
//       material: "Solid" as const,
//       drawType: "Model" as const,
//       opacity: "Transparent" as const,
//       customModel: `Resources/Ores/${model ?? "Gem"}.blockymodel`,
//       customModelTexture: [
//         {
//           texture: `Resources/Gems/${texture ?? id}.png`,
//           weight: 1
//         }
//       ],
//       group: "Stone",
//       flags: {},
//       gathering: {
//         breaking: {
//           gatherType: "Rocks"
//         }
//       },
//       variantRotation: "DoublePipe",
//       randomRotation: "YawStep90" as const,
//       blockParticleSetId: "Crystal",
//       particleColor: interact,
//       blockSoundSetId: "Gem",
//       ambientSoundEventId: "SFX_Gem_Emit_Loop",
//       light: {
//         color: light,
//         radius: 0
//       },
//       particles: [
//         {
//           color: sparks,
//           systemId: "Block_Gem_Sparks"
//         }
//       ]
//     }
//   };
// };
