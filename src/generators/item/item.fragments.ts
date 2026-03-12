// import type * as C from "@";

// export const withItem = {
//   withTranslationProperties: (cfg: C.HasId & C.HasLang) => {
//     const { modId } = meta();
//     const { id } = cfg;
//     return {
//       translationProperties: {
//         name: `server.items.${modId}.${id}.name`,
//         description: `server.items.${modId}.${id}.description`
//       }
//     };
//   },

//   /**
//    * Adds the `Id` field to the JSON output.
//    * @example { Id: "Iron_Ore" }
//    */
//   withId: (cfg: HasId) => ({ id: cfg.id }),
//   withIcon: (cfg: HasId & HasIcon & HasType) => {
//     const m = meta();
//     const paths = (m.paths as unknown as Record<string, { icon?: string }>)[cfg.type];
//     if (!paths?.icon) return {};
//     return { icon: `${paths.icon}/${cfg.icon ?? cfg.id}.png` };
//   },
//   withOrder: (cfg: HasOrder) => (cfg.order ? { order: cfg.order } : {}),
//   withName: (cfg: HasId & HasName & HasType) => {
//     const m = meta();
//     const paths = (m.paths as unknown as Record<string, { lang?: string; langRoot?: string }>)[cfg.type];
//     if (!paths?.lang) return {};
//     return { name: `${paths.lang}.${cfg.id}.png` };
//   },
//   withChildren: (cfg: HasChildren) => {
//     const {
//       paths: { categories },
//       modId
//     } = meta();
//     return {
//       children: cfg.children.map(child => {
//         const isString = typeof child === "string";
//         const childId = isString ? child : child.id;
//         return {
//           id: childId,
//           name: `${categories.lang}.${modId}.${childId}`,
//           icon: `${categories.icon}/${isString ? childId : child.icon}.png`
//         };
//       })
//     };
//   },
// };
