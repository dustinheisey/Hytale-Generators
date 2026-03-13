// import {
//   withCategories,
//   withIcon,
//   withItemSoundSetId,
//   withPlayerAnimationsId,
//   withStack,
//   withTags,
//   withTranslationProperties,
//   type HasCategories,
//   type HasId,
//   type HasLang,
//   type HasStack,
//   type HasTags,
//   builder,
//   json,
//   lang
// } from "@";
// import { withBlockType } from "./bench.fragments";

// export interface HasBench {
//   outputSlotsCount: number;
//   filterValidIngredients: boolean;
// }

// export type BenchCfg = HasId & HasLang & HasBench & HasStack & HasTags & HasCategories;

// export const bench = builder((cfg: BenchCfg, { modId, paths: { item } }) => {
//   const { id, name, baseName, description } = cfg;
//   lang(`items.${modId}.${id}`, name ?? baseName ?? id.replace(/_/g, " "), description);
//   return json(`${item.json}/Bench/${id}`, [
//     withTranslationProperties(cfg),
//     withCategories(cfg, ["Furniture.Benches", "Waste.Tools"]),
//     withBlockType(cfg),
//     withPlayerAnimationsId("Block"),
//     withIcon(cfg, "Bench", {
//       scale: 0.5,
//       rotation: [22.5, 45, 22.5],
//       translation: [1, -17.4]
//     }),
//     withTags(cfg),
//     withStack(cfg),
//     withItemSoundSetId("ISS_Blocks_Stone")
//   ]);
// });
