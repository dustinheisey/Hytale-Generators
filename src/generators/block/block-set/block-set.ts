import { builder, json, withBlockSet, withCommon, type BlockSetCfg } from "@";

export const blockSet = builder(({ id, ...cfg }: BlockSetCfg, g) =>
  json(`${g.paths.block.json}/Sets/${id}`, [withCommon(cfg), withBlockSet(cfg)])
);
