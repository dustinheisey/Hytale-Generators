// import { builder, json, lang, resourceType, texture } from "@";
// import type { OreCfg } from "./ore.types";

// export const ore = builder({
//   build: (cfg: OreCfg, { modId, paths: { item } }) => {
//     const { id, name, baseName, description, baseMask, mask, out, color } = cfg;
//     const oreId = `Ore_${id}`;
//     const displayName = name ?? `${baseName ?? id} Ore`;
//       const mask = resolveMask(cfg.group, cfg.mask, cfg.baseMask);
//       const jsonOut = resolvePath(item.json, cfg.out?.json, id);
//       const textureOut = resolvePath("", cfg.out?.texture, id);

//       if (mask) texture(cfg.color, mask, textureOut);

//     lang(`${item.langRoot}.${modId}.${oreId}`, displayName, description);
//     texture(color, mask ?? `Ores/Ore${baseMask ? `_${baseMask}` : ""}`, out?.texture ?? `Resources/Ores/${id}`);

//     resourceType(`Salvage_${id}`).icon("Rock").build();

//     return json(`${item.json}/Ore/${id}/${oreId}`, [withItemBlock(cfg, "Ore", ["Blocks.Ores", `${modId}.Ores`])]);
//   },
//   defaults: { group: "Ore", categories: ["Blocks.Ores"] }
// });
