import { builder, json, withCommon, withHitbox, type HitboxCfg } from "@";

export const hitbox = builder((cfg: HitboxCfg, g) =>
  json(`${g.paths.block.json}/Hitboxes/${cfg.id}`, [withCommon(cfg), withHitbox(cfg)])
);
