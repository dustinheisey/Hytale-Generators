import {
  builder,
  json,
  lang,
  resourceType,
  texture,
  u,
  withItemBlock,
  type HasItemBlock,
  type HasResourceType
} from "@hg";

export const ore = builder((cfg: HasItemBlock & HasResourceType, { modId, paths: { item } }) => {
  const { id, name, baseName, description, baseMask, mask, textureOut, color } = cfg;

  const oreId = `Ore_${id}`;
  const displayName = name ?? `${baseName ?? id} Ore`;

  resourceType(`Salvage_${id}`).icon("Rock").build();

  lang(`${item.langRoot}.${modId}.${oreId}`, displayName, description);
  texture(color, mask ?? `Ores/Ore${baseMask ? `_${u(baseMask)}` : ""}`, textureOut ?? `Resources/Ores/${id}`);

  return json(`${item.json}/Ore/${id}/${oreId}`, [withItemBlock(cfg, "Ore", ["Blocks.Ores", `${modId}.Ores`])]);
});
