import { builder, json, type HasId, type HasBlockSet, withBlockSet } from "@";

export const blockSet = builder(({ id, ...blockSet }: HasId & HasBlockSet, g) =>
  json(`${g.paths.block.json}/Sets/${id}`, [withBlockSet(blockSet)])
);
