import { builder, json, withHitbox, type HasHitbox, type HasId } from "#hg";

export const hitbox = builder(({ id, min, max }: HasId & HasHitbox, g) =>
  json(`${g.paths.block.json}/Hitboxes/${id}`, [withHitbox({ min, max })])
);
