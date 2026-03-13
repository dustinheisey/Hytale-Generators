import { builder, json, lang, u, withCommon } from "@";
import type { QualityCfg } from "./quality.types";
import { withQuality } from "./quality.fragments";

export const quality = builder((cfg: QualityCfg, g) => {
  lang({ [`${g.paths.quality.langRoot}.${cfg.id}`]: u(cfg.id) });

  return json(`${g.paths.quality.json}/${cfg.id}`, [withCommon(cfg), withQuality(cfg)]);
});
