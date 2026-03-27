// import {
//   builder,
//   json,
//   lang,
//   texture,
//   withCategories,
//   withDropOnDeath,
//   withIcon,
//   withItemSoundSetId,
//   withModelAndTexture,
//   withPlayerAnimationsId,
//   withStack,
//   withTags,
//   withTranslationProperties,
//   type HasCategories,
//   type HasId,
//   type HasLang,
//   type HasStack,
//   type HasTags,
//   type HasTexture
// } from "@";

// type HasParticleColor = { color: string };

// export const gem = builder(
//   (
//     cfg: HasId & HasParticleColor  & HasTags & HasLang & HasStack & HasCategories & HasTexture,
//     { modId, paths: { item } }
//   ) => {
//     const { color, id, name, description, textureOut, mask, baseMask } = cfg;
//     // const { light, interact, sparks } = deriveEffectColors(color);
//     json(`${item.json}/Gems/Rock_Gem_${id}`, [
//       withTranslationProperties(cfg),
//       withTags(cfg),
//       withStack(cfg),
//       withCategories(cfg, ["Blocks.Ores", `${modId}.Gems`]),
//       withDropOnDeath,
//       withPlayerAnimationsId("Block"),
//       withModelAndTexture(cfg, "Gem"),
//       withItemSoundSetId("ISS_Blocks_Stone"),
//       withIcon(cfg, "Rock_Gem", {
//         scale: 0.58823,
//         rotation: [22.5, 45, 22.5],
//         translation: [0, -13.5]
//       }),
//       {
//         // blockType: {
//         //   material: "Solid" as const,
//         //   drawType: "Model" as const,
//         //   opacity: "Transparent" as const,
//         //   customModel: `Resources/Ores/${model ?? "Gem"}.blockymodel`,
//         //   customModelTexture: [
//         //     {
//         //       texture: `Resources/Gems/${texture ?? id}.png`,
//         //       weight: 1
//         //     }
//         //   ],
//         //   group: "Stone",
//         //   flags: {},
//         //   gathering: {
//         //     breaking: {
//         //       gatherType: "Rocks"
//         //     }
//         //   },
//         //   variantRotation: "DoublePipe",
//         //   randomRotation: "YawStep90" as const,
//         //   blockParticleSetId: "Crystal",
//         //   particleColor: interact,
//         //   blockSoundSetId: "Gem",
//         //   ambientSoundEventId: "SFX_Gem_Emit_Loop",
//         //   light: {
//         //     color: light,
//         //     radius: 0
//         //   },
//         //   particles: [
//         //     {
//         //       color: sparks,
//         //       systemId: "Block_Gem_Sparks"
//         //     }
//         //   ]
//         // },
//       }
//     ]);

//     lang(`items.${modId}.Rock_Gem_${id}`, name ?? id, description);

//     texture(color, mask ?? `Gems/Gem${baseMask ? `_${baseMask}` : ""}`, textureOut ?? `Resources/Gems/${id}`);
//   }
// );
