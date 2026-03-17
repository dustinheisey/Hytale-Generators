import { builder, isString, json, lang, texture, u, withCommonThing } from "@";
import type { ThingCfg } from "./thing.types";

export const thing = builder((cfg: ThingCfg, { modId, paths: { item } }) => {
  const { baseName, group, description, baseMask, out, color } = cfg;
  const id = group ? `${group}_${cfg.id}` : cfg.id;
  const name = cfg.name ?? `${baseName ?? id}${group ? ` ${group}` : ""}`;
  const mask = cfg.mask ?? (group ? `${group}s/${group}${baseMask ? `_${u(baseMask)}` : ""}` : "");
  const textureOut = isString(out?.texture) ? out.texture : `${out?.texture.root ?? ""}/${id}`;
  const jsonOut = isString(out?.json) ? `${item.json}/${out.json}` : `${item.json}${out?.json.root ?? ""}/${id}`;

  lang(`${item.langRoot}.${modId}.${id}`, name, description);
  if (mask) texture(color, mask, textureOut);
  return json(jsonOut, [withCommonThing(cfg)]);
});
